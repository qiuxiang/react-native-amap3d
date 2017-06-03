# react-native-amap3d

react-native 高德地图组件，使用最新 3D SDK（目前只支持 Android）。

该项目很大一定程度是参考 [react-native-maps](https://github.com/airbnb/react-native-maps)，
如果不是考虑到国内 Android 手机无法使用 Google Map，实在没理由再造这个轮子。


## 特性（目标）

- 使用 gradle 和 cocoapods 管理和安装地图 SDK，避免繁琐且容易出错的手动配置
- 涵盖 SDK 提供的大部分功能
- 提供不限于高德地图的其他地图 SDK 封装和兼容


## 进度

### Android
- [x] 不同的地图模式（常规、卫星、导航、夜间）的切换
- [x] 3D 建筑、路况、地图标签的显示控制
- [x] 室内地图的显示
- [x] 内置地图控件（指南针、比例尺、定位按钮、缩放按钮）的显示控制
- [x] 手势交互的控制
- [x] 中心坐标、缩放界别、倾斜度的控制
- [x] 地图事件（onPress、onLongPress、onLocation）
- [x] Marker 的基本显示及事件传递
- [x] 自定义 Marker 的信息窗口
- [ ] Polyline 画线
- [ ] Polygon 多边形绘制
- [ ] 热力图
- [ ] 完善项目 README，添加接口文档

### iOS
- [x] 基本的地图显示（完成对 Android 的支持再考虑 iOS）
