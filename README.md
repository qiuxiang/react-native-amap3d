# react-native-amap3d [![npm version][version-badge]][npm] [![build status][build-badge]][build]

react-native 高德地图组件，使用最新 3D SDK，支持 Android + iOS，受 [react-native-maps](https://github.com/airbnb/react-native-maps) 启发，提供功能丰富且易用的接口。


## 功能

- 地图模式切换（常规、卫星、导航、夜间）
- 3D 建筑、路况、室内地图
- 内置地图控件的显示隐藏（指南针、比例尺、定位按钮、缩放按钮）
- 手势交互控制（平移、缩放、旋转、倾斜）
- 中心坐标、缩放级别、倾斜度的设置，支持动画过渡
- 地图事件（onPress、onLongPress、onLocation、onStatusChange）
- 地图标记（Marker）
  - 自定义信息窗体
  - 自定义图标
- 折线绘制（Polyline）
- 多边形绘制（Polygon）
- 圆形绘制（Circle）
- 热力图（HeatMap）
- 海量点（MultiPoint）
- 导航（驾车、步行、骑行）（待完善 🚧）
- 离线地图模块

<img src="http://upload-images.jianshu.io/upload_images/51256-f585098064a8d9de.png?imageView2/2/w/600" width="215"> <img src="http://upload-images.jianshu.io/upload_images/51256-a2b8b7fb93738f2e.png?imageView2/2/w/600" width="215"> <img src="http://upload-images.jianshu.io/upload_images/51256-85b17548888e2bd6.png?imageView2/2/w/600" width="215"> <img src="http://upload-images.jianshu.io/upload_images/51256-8c8b685f3cfbc350.png?imageView2/2/w/600" width="215">


## 安装

### 安装依赖
```
$ npm i react-native-amap3d
```

### 项目配置
#### Android
```
$ react-native link react-native-amap3d
```

#### iOS
推荐使用 CocoaPods，需要注意 iOS 项目不要 `react-native link react-native-amap3d`, 在 `ios` 目录下新建文件 `Podfile`：

```ruby
platform :ios, '8.0'

target 'Your Target' do
  pod 'yoga', path: '../node_modules/react-native/ReactCommon/yoga/'
  pod 'React', path: '../node_modules/react-native/'
  pod 'react-native-amap3d', path: '../node_modules/react-native-amap3d/ios/'
end
```

然后运行：
```
$ pod install
```

如果你不想使用 CocoaPods，手动配置请参考：[手动部署](http://lbs.amap.com/api/ios-sdk/guide/create-project/manual-configuration)。

### 添加高德 Key
#### Android
1. [获取高德 Key](http://lbs.amap.com/api/android-sdk/guide/create-project/get-key)。

2. 编辑 Android 项目的 `AndroidManifest.xml`（一般在 `android\app\src\main\AndroidManifest.xml`），添加如下代码：
   ```xml
   <application>
       <!-- 确保 meta-data 是直属 application 的子标签 -->
       <meta-data
         android:name="com.amap.api.v2.apikey"
         android:value="你的高德 Key"/>
   </application>
   ```

#### iOS
1. [获取高德 Key](https://lbs.amap.com/api/ios-sdk/guide/create-project/get-key)。

2. 在 `AppDelegate.m` 里引入 SDK 头文件 `#import <AMapFoundationKit/AMapFoundationKit.h>`，
   并设置高德 Key `[AMapServices sharedServices].apiKey = @"你的高德 Key";`。


## 用法

### 导入地图模块
```jsx
import {MapView, Marker, Polyline} from 'react-native-amap3d'
<MapView>
  <Marker .../>
</MapView>
```
或者
```jsx
import MapView from 'react-native-amap3d'
<MapView>
  <MapView.Marker .../>
</MapView>
```

### 基本用法
```jsx
<MapView coordinate={{
  latitude: 39.91095,
  longitude: 116.37296,
}}/>
```

### 启用定位并监听定位事件
```jsx
<MapView
  locationEnabled
  onLocation={({nativeEvent}) =>
    console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
/>
```

### 添加可拖拽的地图标记
```jsx
<MapView>
  <Marker
    draggable
    title='这是一个可拖拽的标记'
    onDragEnd={({nativeEvent}) =>
      console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
    coordinate={{
      latitude: 39.91095,
      longitude: 116.37296,
    }}/>
</MapView>
```

### 自定义标记图片及信息窗体
```jsx
<Marker
  image='flag'
  coordinate={{
    latitude: 39.706901,
    longitude: 116.397972,
  }}
>
  <View style={styles.customInfoWindow}>
    <Text>自定义信息窗体</Text>
  </View>
</Marker>
```

更多示例请参考[示例项目](https://github.com/qiuxiang/react-native-amap3d/tree/master/example)。


## 接口

请参考注释文档：
- [MapView](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/MapView.js#L15)
- [Marker](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/Marker.js#L8)
- [Polyline](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/Polyline.js#L6)
- [Polygon](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/Polygon.js#L6)
- [Circle](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/Circle.js#L6)
- [HeatMap](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/HeatMap.js#L6)
- [MultiPoint](https://github.com/qiuxiang/react-native-amap3d/tree/v0.7.3/components/maps/MultiPoint.js#L5)


## 如何进行问题反馈
进行问题反馈之前：
  - 提供你正在使用的版本，以及 RN 版本
  - 提供详细的错误信息，也许你需要 android studio 或 xcode
  - 编译相关的问题（尤其是 iOS）需要你对编译过程有足够的了解

以下情况 issue 会被 close：
  - 确定是环境配置的问题，且没有提供足够的信息
  - 问题不具备普遍性，且缺乏讨论

问题被关闭，仍然可以继续反馈，我会尽量回复。

[npm]: https://www.npmjs.com/package/react-native-amap3d
[version-badge]: https://badge.fury.io/js/react-native-amap3d.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-amap3d.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-amap3d
