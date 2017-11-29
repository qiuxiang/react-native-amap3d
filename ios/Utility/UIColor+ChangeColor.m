//
//  UIColor+ChangeColor.m
//  Pods-RNAMap3D
//
//  Created by YBQ on 2017/11/28.
//

#import "UIColor+ChangeColor.h"

@implementation UIColor (ChangeColor)
+ (UIColor *) colorWithHexString: (NSString *)color {
    if ([color isEqualToString:@"white"]) return [UIColor whiteColor];
    if ([color isEqualToString:@"black"]) return [UIColor blackColor];
    if ([color isEqualToString:@"darkGray"]) return [UIColor darkGrayColor];
    if ([color isEqualToString:@"lightGray"]) return [UIColor lightGrayColor];
    if ([color isEqualToString:@"gray"]) return [UIColor grayColor];
    if ([color isEqualToString:@"red"]) return [UIColor redColor];
    if ([color isEqualToString:@"green"]) return [UIColor greenColor];
    if ([color isEqualToString:@"blue"]) return [UIColor blueColor];
    if ([color isEqualToString:@"cyan"]) return [UIColor cyanColor];
    if ([color isEqualToString:@"yellow"]) return [UIColor yellowColor];
    if ([color isEqualToString:@"magenta"]) return [UIColor magentaColor];
    if ([color isEqualToString:@"orange"]) return [UIColor orangeColor];
    if ([color isEqualToString:@"purple"]) return [UIColor purpleColor];
    if ([color isEqualToString:@"brown"]) return [UIColor brownColor];
    if ([color isEqualToString:@"clear"]) return [UIColor clearColor];
    
    NSString *cString = [[color stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];
    
    // String should be 6 or 8 characters
    if ([cString length] < 6) {
        return [UIColor clearColor];
    }
    // 判断前缀
    if ([cString hasPrefix:@"0X"])
        cString = [cString substringFromIndex:2];
    if ([cString hasPrefix:@"#"])
        cString = [cString substringFromIndex:1];
    if ([cString length] != 6)
        return [UIColor clearColor];
    // 从六位数值中找到RGB对应的位数并转换
    NSRange range;
    range.location = 0;
    range.length = 2;
    //R、G、B
    NSString *rString = [cString substringWithRange:range];
    range.location = 2;
    NSString *gString = [cString substringWithRange:range];
    range.location = 4;
    NSString *bString = [cString substringWithRange:range];
    // Scan values
    unsigned int r, g, b;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];
    
    return [UIColor colorWithRed:((float) r / 255.0f) green:((float) g / 255.0f) blue:((float) b / 255.0f) alpha:1.0f];
}
@end
