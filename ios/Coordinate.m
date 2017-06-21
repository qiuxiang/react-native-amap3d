#import "Coordinate.h"

@implementation Coordinate {
}

- (instancetype)initWithCoordinate:(CLLocationCoordinate2D)coordinate {
    self = [super init];
    self.coordinate = coordinate;
    return self;
}

@end