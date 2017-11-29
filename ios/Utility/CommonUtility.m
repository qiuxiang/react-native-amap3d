//
//  CommonUtility.m
//  SearchV3Demo
//
//  Created by songjian on 13-8-22.
//  Copyright (c) 2013年 songjian. All rights reserved.
//

#import "CommonUtility.h"
//#import "LineDashPolyline.h"

@implementation CommonUtility

+ (CLLocationCoordinate2D *)coordinatesForString:(NSString *)string
                                 coordinateCount:(NSUInteger *)coordinateCount
                                      parseToken:(NSString *)token
{
    if (string == nil) {
        return NULL;
    }
    if (token == nil) {
        token = @",";
    }
    NSString *str = @"";
    if (![token isEqualToString:@","]) {
        str = [string stringByReplacingOccurrencesOfString:token withString:@","];
    }
    else {
        str = [NSString stringWithString:string];
    }
    NSArray *components = [str componentsSeparatedByString:@","];
    NSUInteger count = [components count] / 2;
    if (coordinateCount != NULL) {
        *coordinateCount = count;
    }
    CLLocationCoordinate2D *coordinates = (CLLocationCoordinate2D*)malloc(count * sizeof(CLLocationCoordinate2D));
    
    for (int i = 0; i < count; i++) {
        coordinates[i].longitude = [[components objectAtIndex:2 * i]     doubleValue];
        coordinates[i].latitude  = [[components objectAtIndex:2 * i + 1] doubleValue];
    }
    
    return coordinates;
}

+ (MAPolyline *)polylineForCoordinateString:(NSString *)coordinateString
{
    if (coordinateString.length == 0)
    {
        return nil;
    }
    
    NSUInteger count = 0;
    
    CLLocationCoordinate2D *coordinates = [self coordinatesForString:coordinateString
                                                     coordinateCount:&count
                                                          parseToken:@";"];
    
    MAPolyline *polyline = [MAPolyline polylineWithCoordinates:coordinates count:count];
    
    free(coordinates), coordinates = NULL;
    
    return polyline;
}

+ (MAPolyline *)polylineForBusLine:(AMapBusLine *)busLine
{
    if (busLine == nil)
    {
        return nil;
    }
    
    return [self polylineForCoordinateString:busLine.polyline];
}

+ (MAMapRect)unionMapRect1:(MAMapRect)mapRect1 mapRect2:(MAMapRect)mapRect2
{
    CGRect rect1 = CGRectMake(mapRect1.origin.x, mapRect1.origin.y, mapRect1.size.width, mapRect1.size.height);
    CGRect rect2 = CGRectMake(mapRect2.origin.x, mapRect2.origin.y, mapRect2.size.width, mapRect2.size.height);
    
    CGRect unionRect = CGRectUnion(rect1, rect2);
    
    return MAMapRectMake(unionRect.origin.x, unionRect.origin.y, unionRect.size.width, unionRect.size.height);
}

+ (MAMapRect)mapRectUnion:(MAMapRect *)mapRects count:(NSUInteger)count
{
    if (mapRects == NULL || count == 0)
    {
        NSLog(@"%s: 无效的参数.", __func__);
        return MAMapRectZero;
    }
    
    MAMapRect unionMapRect = mapRects[0];
    
    for (int i = 1; i < count; i++)
    {
        unionMapRect = [self unionMapRect1:unionMapRect mapRect2:mapRects[i]];
    }
    
    return unionMapRect;
}

+ (MAMapRect)mapRectForOverlays:(NSArray *)overlays
{
    if (overlays.count == 0)
    {
        NSLog(@"%s: 无效的参数.", __func__);
        return MAMapRectZero;
    }
    
    MAMapRect mapRect;
    
    MAMapRect *buffer = (MAMapRect*)malloc(overlays.count * sizeof(MAMapRect));
    
    [overlays enumerateObjectsUsingBlock:^(id<MAOverlay> obj, NSUInteger idx, BOOL *stop) {
        buffer[idx] = [obj boundingMapRect];
    }];
    
    mapRect = [self mapRectUnion:buffer count:overlays.count];
    
    free(buffer), buffer = NULL;
    
    return mapRect;
}

+ (MAMapRect)minMapRectForMapPoints:(MAMapPoint *)mapPoints count:(NSUInteger)count
{
    if (mapPoints == NULL || count <= 1)
    {
        NSLog(@"%s: 无效的参数.", __func__);
        return MAMapRectZero;
    }
    
    CGFloat minX = mapPoints[0].x, minY = mapPoints[0].y;
    CGFloat maxX = minX, maxY = minY;
    
    /* Traverse and find the min, max. */
    for (int i = 1; i < count; i++)
    {
        MAMapPoint point = mapPoints[i];
        
        if (point.x < minX)
        {
            minX = point.x;
        }
        
        if (point.x > maxX)
        {
            maxX = point.x;
        }
        
        if (point.y < minY)
        {
            minY = point.y;
        }
        
        if (point.y > maxY)
        {
            maxY = point.y;
        }
    }
    
    /* Construct outside min rectangle. */
    return MAMapRectMake(minX, minY, fabs(maxX - minX), fabs(maxY - minY));
}

+ (MAMapRect)minMapRectForAnnotations:(NSArray *)annotations
{
    if (annotations.count <= 1)
    {
        NSLog(@"%s: 无效的参数.", __func__);
        return MAMapRectZero;
    }
    
    MAMapPoint *mapPoints = (MAMapPoint*)malloc(annotations.count * sizeof(MAMapPoint));
    
    [annotations enumerateObjectsUsingBlock:^(id<MAAnnotation> obj, NSUInteger idx, BOOL *stop) {
        mapPoints[idx] = MAMapPointForCoordinate([obj coordinate]);
    }];
    
    MAMapRect minMapRect = [self minMapRectForMapPoints:mapPoints count:annotations.count];
    
    free(mapPoints), mapPoints = NULL;
    
    return minMapRect;
}

+ (NSString *)getApplicationName
{
    NSDictionary *bundleInfo = [[NSBundle mainBundle] infoDictionary];
    return [bundleInfo valueForKey:@"CFBundleDisplayName"] ?: [bundleInfo valueForKey:@"CFBundleName"];
}

+ (NSString *)getApplicationScheme
{
    NSDictionary *bundleInfo    = [[NSBundle mainBundle] infoDictionary];
    NSString *bundleIdentifier  = [[NSBundle mainBundle] bundleIdentifier];
    NSArray *URLTypes           = [bundleInfo valueForKey:@"CFBundleURLTypes"];
    
    NSString *scheme;
    for (NSDictionary *dic in URLTypes)
    {
        NSString *URLName = [dic valueForKey:@"CFBundleURLName"];
        if ([URLName isEqualToString:bundleIdentifier])
        {
            scheme = [[dic valueForKey:@"CFBundleURLSchemes"] objectAtIndex:0];
            break;
        }
    }
    
    return scheme;
}

+ (double)distanceToPoint:(MAMapPoint)p fromLineSegmentBetween:(MAMapPoint)l1 and:(MAMapPoint)l2
{
    double A = p.x - l1.x;
    double B = p.y - l1.y;
    double C = l2.x - l1.x;
    double D = l2.y - l1.y;
    
    double dot = A * C + B * D;
    double len_sq = C * C + D * D;
    double param = dot / len_sq;
    
    double xx, yy;
    
    if (param < 0 || (l1.x == l2.x && l1.y == l2.y)) {
        xx = l1.x;
        yy = l1.y;
    }
    else if (param > 1) {
        xx = l2.x;
        yy = l2.y;
    }
    else {
        xx = l1.x + param * C;
        yy = l1.y + param * D;
    }
    
    return MAMetersBetweenMapPoints(p, MAMapPointMake(xx, yy));
}
@end
