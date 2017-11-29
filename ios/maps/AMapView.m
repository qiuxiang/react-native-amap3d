#import <React/UIView+React.h>
#import "AMapView.h"
#import "AMapMarker.h"
#import "AMapPolyline.h"

#pragma ide diagnostic ignored "OCUnusedMethodInspection"

@implementation AMapView {
    BOOL _showsZoomControls;
    BOOL _showsLocationButton;
    UIView *_zoomPannelView;
    UIButton *_gpsButton;
}

- (UIButton *)makeGPSButtonView {
    UIButton *ret = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 40, 40)];
    ret.backgroundColor = [UIColor whiteColor];
    ret.layer.cornerRadius = 4;
    
    [ret setImage:[UIImage imageNamed:@"gpsStat1"] forState:UIControlStateNormal];
    [ret addTarget:self action:@selector(gpsAction) forControlEvents:UIControlEventTouchUpInside];
    
    return ret;
}

- (UIView *)makeZoomPannelView {
    UIView *ret = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 53, 98)];
    
    UIButton *incBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 53, 49)];
    [incBtn setImage:[UIImage imageNamed:@"increase"] forState:UIControlStateNormal];
    [incBtn sizeToFit];
    [incBtn addTarget:self action:@selector(zoomPlusAction) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *decBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 49, 53, 49)];
    [decBtn setImage:[UIImage imageNamed:@"decrease"] forState:UIControlStateNormal];
    [decBtn sizeToFit];
    [decBtn addTarget:self action:@selector(zoomMinusAction) forControlEvents:UIControlEventTouchUpInside];
    
    [ret addSubview:incBtn];
    [ret addSubview:decBtn];
    
    return ret;
}

- (void)setShowsZoomControls:(BOOL)showsZoomControls {
    _showsZoomControls = showsZoomControls;
    if (_showsZoomControls && !_zoomPannelView) {
        UIView *zoomPannelView = [self makeZoomPannelView];
        _zoomPannelView = zoomPannelView;
        zoomPannelView.center = CGPointMake(self.bounds.size.width -  CGRectGetMidX(zoomPannelView.bounds) - 10,
                                            self.bounds.size.height -  CGRectGetMidY(zoomPannelView.bounds) - 10);
        zoomPannelView.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleLeftMargin;
        [self addSubview:zoomPannelView];
        [self bringSubviewToFront:_zoomPannelView];
    }
}

- (void)setShowsLocationButton:(BOOL)showsLocationButton {
    _showsLocationButton = showsLocationButton;
    if (_showsLocationButton && !_gpsButton) {
        UIButton *gpsButton = [self makeGPSButtonView];
        _gpsButton = gpsButton;
        gpsButton.center = CGPointMake(CGRectGetMidX(gpsButton.bounds) + 10,
                                       self.bounds.size.height -  CGRectGetMidY(gpsButton.bounds) - 20);
        gpsButton.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleRightMargin;
        [self addSubview:gpsButton];
        [self bringSubviewToFront:gpsButton];
    }
}

- (void)setShowsTraffic:(BOOL)shows {
    self.showTraffic = shows;
}

- (void)setTiltEnabled:(BOOL)enabled {
    self.rotateCameraEnabled = enabled;
}

- (void)setLocationEnabled:(BOOL)enabled {
    self.showsUserLocation = enabled;
}

- (void)setCoordinate:(CLLocationCoordinate2D)json {
    self.centerCoordinate = json;
}

- (void)setTilt:(CGFloat)degree {
    self.cameraDegree = degree;
}

- (void)setRotation:(CGFloat)degree {
    self.rotationDegree = degree;
}

// 不能直接 setRegion，因为如果地图未加载 setRegion 是无效的
- (void)setRegion:(MACoordinateRegion)region {
    if (self.loaded) {
        super.region = region;
    } else {
        self.initialRegion = region;
    }
}

- (void)insertReactSubview:(id <RCTComponent>)subview atIndex:(NSInteger)atIndex {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            ((AMapMarker *) subview).mapView = self;
            [self addAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self addOverlay:(id <MAOverlay>) subview];
        }
        [super insertReactSubview:subview atIndex:atIndex];
    });
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([subview isKindOfClass:[AMapMarker class]]) {
            [self removeAnnotation:(id <MAAnnotation>) subview];
        }
        if ([subview isKindOfClass:[AMapModel class]]) {
            [self removeOverlay:(id <MAOverlay>) subview];
        }
        [super removeReactSubview:subview];
    });
}

#pragma mark - Action Handlers
- (void)zoomPlusAction
{
    CGFloat oldZoom = self.zoomLevel;
    [self setZoomLevel:(oldZoom + 1) animated:YES];
    self.showsScale = YES;
}

- (void)zoomMinusAction
{
    CGFloat oldZoom = self.zoomLevel;
    [self setZoomLevel:(oldZoom - 1) animated:YES];
    self.showsScale = NO;
}

//点击了GPS按钮后定位到当前位置
- (void)gpsAction {
    if(self.userLocation.updating && self.userLocation.location) {
        [self setCenterCoordinate:self.userLocation.location.coordinate animated:YES];
        [self setZoomLevel:16 animated:YES];
    }
}

@end
