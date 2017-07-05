#import <MAMapKit/MAOverlayRenderer.h>

@interface AMapModel : UIView <MAOverlay>
- (MAOverlayRenderer *)renderer;
@end
