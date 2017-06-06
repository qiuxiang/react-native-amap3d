# react-native-amap3d

react-native 高德地图组件，使用最新 3D SDK（目前只支持 Android）。

该项目很大一定程度是参考 [react-native-maps](https://github.com/airbnb/react-native-maps)，
如果不是考虑到国内的 Android 手机无法使用 Google Maps，实在没理由再造这个轮子。
所以，该项目的首要重点是对 Android 的支持，如果需要 iOS 支持，目前建议使用 react-native-maps。


## 特性（目标）

- 使用 gradle 和 cocoapods 管理和安装地图 SDK，避免繁琐且容易出错的手动配置
- 涵盖 SDK 提供的大部分功能，并提供适合 react-native 调用的接口
- 提供不限于高德地图的其他地图 SDK 封装（可能是另一个项目了）


## 进度

### Android
- [x] 各地图模式（常规、卫星、导航、夜间）
- [x] 3D 建筑、路况、内置标签
- [x] 室内地图
- [x] 内置地图控件（指南针、比例尺、定位按钮、缩放按钮）
- [x] 手势交互（平移、缩放、旋转、倾斜）
- [x] 中心坐标、缩放界别、倾斜度的设置
- [x] 地图事件（onPress、onLongPress、onLocation）
- [x] 地图标记（Marker）
  - [x] 基本属性及事件
  - [x] 自定义信息窗体
  - [x] 自定义图标
- [x] 折线绘制（Polyline）
- [ ] 多边形绘制（Polygon）🚀
- [ ] 热力图
- [ ] 完善项目 README，添加接口文档

### iOS
- [x] 基本的地图显示（完成对 Android 的支持再考虑 iOS）
