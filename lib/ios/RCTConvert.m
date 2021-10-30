#import <React/RCTConvert.h>
#import <MAMapKit/MAMapKit.h>

@implementation RCTConvert(AMap)

+ (MAMapType)MAMapType:(id)json {
  return [json intValue];
}

@end
