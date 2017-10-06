#define INIT(clazz)                                                            \
- (instancetype)init {                                                         \
    if (self = [super init]) {                                                 \
        _navigationView = [clazz navigationView];                              \
        _navigationManager = [clazz navigationManager];                        \
        _navigationManager.delegate = self;                                    \
    }                                                                          \
    return self;                                                               \
}                                                                              \
                                                                               \
- (UIView *)view {                                                             \
    return _navigationView;                                                    \
}                                                                              \
                                                                               \
RCT_EXPORT_MODULE()                                                            \
RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteSuccess, RCTBubblingEventBlock)       \
RCT_EXPORT_VIEW_PROPERTY(onCalculateRouteFailure, RCTBubblingEventBlock)       \
RCT_EXPORT_METHOD(start:(nonnull NSNumber *)reactTag) {                        \
    [_navigationManager startGPSNavi];                                         \
}                                                                              \

#define NAVIGATION_VIEW(type)                                                  \
+ (type *)navigationView {                                                     \
    static type *view;                                                         \
    if (view == nil) view = [type new];                                        \
    return view;                                                               \
}                                                                              \

#define NAVIGATION_MANAGER(clazz, type)                                        \
+ (type *)navigationManager {                                                  \
    static type *manager;                                                      \
    if (manager == nil) {                                                      \
        manager = [type new];                                                  \
        [manager addDataRepresentative:[clazz navigationView]];                \
    }                                                                          \
    return manager;                                                            \
}                                                                              \
