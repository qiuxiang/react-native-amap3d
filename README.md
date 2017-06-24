# react-native-amap3d [![npm version](https://img.shields.io/npm/v/react-native-amap3d.svg)](https://www.npmjs.com/package/react-native-amap3d)

react-native 高德地图组件，使用最新 3D SDK，支持 Android + iOS。

该项目很大一定程度参考了 [react-native-maps](https://github.com/airbnb/react-native-maps)。


## 特性（目标）

- 使用 gradle 和 cocoapods 管理和安装地图 SDK，避免繁琐且容易出错的手动配置
- 涵盖 SDK 提供的大部分功能，并提供适合 react-native 调用的接口
- 提供不限于高德地图的其他地图 SDK 封装（可能是另一个项目了）

![](https://user-images.githubusercontent.com/1709072/27509246-28ee8a0a-592b-11e7-9148-ed24c86ede82.jpg) ![](https://user-images.githubusercontent.com/1709072/27509248-29000d20-592b-11e7-90ef-3f56c4300625.jpg) ![](https://user-images.githubusercontent.com/1709072/27509247-28feba88-592b-11e7-90ec-3e3680cee241.jpg) ![](https://user-images.githubusercontent.com/1709072/27509249-2902531e-592b-11e7-801d-5fef6a87cead.jpg) ![](https://user-images.githubusercontent.com/1709072/27509250-2906e64a-592b-11e7-8cc5-1ce84090ce66.jpg) ![](https://user-images.githubusercontent.com/1709072/27509251-29084d5a-592b-11e7-84af-f49dbcea9873.jpg) ![](https://user-images.githubusercontent.com/1709072/27509252-291d5876-592b-11e7-8849-15360c2e16c2.jpg) ![](https://user-images.githubusercontent.com/1709072/27509253-2933ef5a-592b-11e7-88b4-10f67fa03706.jpg)

## 安装

### 安装依赖
```
$ npm i react-native-amap3d --save
```

### 项目配置
#### Android
推荐使用 `react-native link`
```
$ react-native link react-native-amap3d
```

#### iOS
在 `ios` 目录下新建文件 `Podfile`：
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

3. 同时，配置必要的权限：
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
   <uses-permission android:name="android.permission.READ_PHONE_STATE" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   ```

#### iOS
1. [获取高德 Key](https://lbs.amap.com/api/ios-sdk/guide/create-project/get-key)。

2. 在 `AppDelegate.m` 里引入 SDK 头文件 `#import <AMapFoundationKit/AMapFoundationKit.h>`，
   并设置高德 Key `[AMapServices sharedServices].apiKey = @"你的高德 Key";`。


## 用法
更多示例请参考[示例项目](https://github.com/qiuxiang/react-native-amap3d/tree/master/example)。

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


## 进度

### Android
- [x] 各地图模式（常规、卫星、导航、夜间）
- [x] 3D 建筑、路况、内置标签
- [x] 室内地图
- [x] 内置地图控件（指南针、比例尺、定位按钮、缩放按钮）
- [x] 手势交互（平移、缩放、旋转、倾斜）
- [x] 中心坐标、缩放级别、倾斜度
- [x] 地图事件（onPress、onLongPress、onLocation）
- [x] 地图标记（Marker）
  - [x] 基本属性及事件
  - [x] 自定义信息窗体
  - [x] 自定义图标
- [x] 折线绘制（Polyline）
- [x] 多边形绘制（Polygon）
- [x] 圆形绘制（Circle）
- [ ] POI 检索 🚀
- [ ] 地理编码转换

### iOS
- [x] 各地图模式（常规、卫星、导航、夜间）
- [x] 3D 建筑、路况、内置标签
- [x] 室内地图
- [x] 内置地图控件（指南针和比例尺通过内置接口提供支持，定位按钮、缩放按钮需要自行实现）
- [x] 手势交互（平移、缩放、旋转、倾斜）
- [x] 中心坐标、缩放级别、倾斜度
- [x] 地图事件（onPress、onLongPress、onLocation）
- [x] 地图标记（Marker）
  - [x] 基本属性及事件
  - [x] 自定义信息窗体
  - [x] 自定义图标
- [x] 折线绘制（Polyline）
- [x] 多边形绘制（Polygon）
- [x] 圆形绘制（Circle）
- [ ] POI 检索 🚀
- [ ] 地理编码转换
