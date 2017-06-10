# react-native-amap3d [![npm version](https://img.shields.io/npm/v/react-native-amap3d.svg)](https://www.npmjs.com/package/react-native-amap3d)

react-native 高德地图组件，使用最新 3D SDK（目前只支持 Android）。

该项目很大一定程度是参考 [react-native-maps](https://github.com/airbnb/react-native-maps)，
如果不是考虑到国内的 Android 手机无法使用 Google Maps，实在没理由再造这个轮子。
所以，该项目的首要重点是对 Android 的支持，如果需要 iOS 支持，目前建议使用 react-native-maps。


## 特性（目标）

- 使用 gradle 和 cocoapods 管理和安装地图 SDK，避免繁琐且容易出错的手动配置
- 涵盖 SDK 提供的大部分功能，并提供适合 react-native 调用的接口
- 提供不限于高德地图的其他地图 SDK 封装（可能是另一个项目了）


## 安装

### 安装依赖
```
$ npm i react-native-amap3d --save
```

### 项目配置
推荐使用 `react-native link`
```
$ react-native link react-native-amap3d
```

### 添加高德 Key
#### Android
[获取高德 Key](http://lbs.amap.com/api/android-sdk/guide/create-project/get-key)。

编辑 Android 项目的 `AndroidManifest.xml`（一般在 `android\app\src\main\AndroidManifest.xml`），
添加如下代码：
```xml
<application>
    <!-- 确保 meta-data 是直属 application 的子标签 -->
    <meta-data
      android:name="com.amap.api.v2.apikey"
      android:value="你的高德 Key"/>
</application>
```

同时，配置必要的权限：
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```


## 用法
更多示例请参考[示例项目](https://github.com/qiuxiang/react-native-amap3d/tree/develop/example)。

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
  onLocationChange={({nativeEvent}) =>
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
    <Overlay style={styles.customMarker}>
      <Image style={styles.customIcon} source={require('marker.png')}/>
    </Overlay>
  }
  coordinate={{
    latitude: 39.706901,
    longitude: 116.397972,
  }}
>
  <InfoWindow style={styles.customInfoWindow}>
    <Text>自定义信息窗体</Text>
  </InfoWindow>
</Marker>
```


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
- [x] 多边形绘制（Polygon）
- [x] 圆形绘制（Circle）
- [ ] POI 检索 🚀
- [ ] 地理编码转换
- [ ] 完善项目 README，添加接口文档

### iOS
- [x] 基本的地图显示（完成对 Android 的支持再考虑 iOS）
