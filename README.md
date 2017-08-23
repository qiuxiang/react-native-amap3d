# react-native-amap3d [![npm version](https://img.shields.io/npm/v/react-native-amap3d.svg)](https://www.npmjs.com/package/react-native-amap3d)

react-native 高德地图组件，使用最新 3D SDK，支持 Android + iOS。

该项目很大一定程度参考了 [react-native-maps](https://github.com/airbnb/react-native-maps)，
目前正在开发中，欢迎各种 [Issue](https://github.com/qiuxiang/react-native-amap3d/issues/new)。


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
- 导航（驾车、步行、骑行）（还不够完善）

![](https://user-images.githubusercontent.com/1709072/27509246-28ee8a0a-592b-11e7-9148-ed24c86ede82.jpg) ![](https://user-images.githubusercontent.com/1709072/27509248-29000d20-592b-11e7-90ef-3f56c4300625.jpg) ![](https://user-images.githubusercontent.com/1709072/27509247-28feba88-592b-11e7-90ec-3e3680cee241.jpg) ![](https://user-images.githubusercontent.com/1709072/27509249-2902531e-592b-11e7-801d-5fef6a87cead.jpg) ![](https://user-images.githubusercontent.com/1709072/27509250-2906e64a-592b-11e7-8cc5-1ce84090ce66.jpg) ![](https://user-images.githubusercontent.com/1709072/27509251-29084d5a-592b-11e7-84af-f49dbcea9873.jpg) ![](https://user-images.githubusercontent.com/1709072/27509252-291d5876-592b-11e7-8849-15360c2e16c2.jpg) ![](https://user-images.githubusercontent.com/1709072/27509253-2933ef5a-592b-11e7-88b4-10f67fa03706.jpg)


## 安装

### 安装依赖
```
$ npm i react-native-amap3d --save
```

### 项目配置
#### Android
```
$ react-native link react-native-amap3d
```

#### iOS
推荐使用 CocoaPods，在 `ios` 目录下新建文件 `Podfile`：

```ruby
platform :ios, '8.0'

target 'Your Target' do
  pod 'Yoga', path: '../node_modules/react-native/ReactCommon/yoga/'
  pod 'React', path: '../node_modules/react-native/'
  pod 'react-native-amap3d', path: '../node_modules/react-native-amap3d/'
end
```

然后运行：
```
$ pod install
```
需要注意的是，使用 CocoaPods 的 iOS 项目不需要也不能 `react-native link react-native-amap3d`。

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
<MapView/>
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

### 自定义地图标记及信息窗体
```jsx
<Marker
  icon={() =>
    <View style={styles.customMarker}>
      <Image style={styles.customIcon} source={require('marker.png')}/>
    </View>
  }
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
- [MapView](https://github.com/qiuxiang/react-native-amap3d/blob/master/components/maps/MapView.js#L14)
- [Marker](https://github.com/qiuxiang/react-native-amap3d/blob/master/components/maps/Marker.js#L6)
- [Polyline](https://github.com/qiuxiang/react-native-amap3d/blob/master/components/maps/Polyline.js#L5)
- [Polygon](https://github.com/qiuxiang/react-native-amap3d/blob/master/components/maps/Polygon.js#L5)
- [Circle](https://github.com/qiuxiang/react-native-amap3d/blob/master/components/maps/Circle.js#L5)


## 注意

- 由于 RN 经常改接口，该项目只能保证在最新 RN 下测试通过
- 由于 3D 地图渲染需要硬件加速，部分 Android 模拟器会因为缺少硬件加速而导致运行崩溃
