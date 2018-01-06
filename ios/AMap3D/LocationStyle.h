#import <MAMapKit/MAMapKit.h>

@interface LocationStyle : NSObject
@property(nonatomic, strong) UIImage *image;
@property(nonatomic, strong) UIColor *fillColor;
@property(nonatomic, strong) UIColor *stokeColor;
@property(nonatomic, assign) CGFloat stokeWidth;
@end