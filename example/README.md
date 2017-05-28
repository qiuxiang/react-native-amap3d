## iOS

现有的 react-native 地图 SDK 封装都是把 framework 包含进来，
`npm install` 之后需要开发者进行一系列繁琐又容易出错的手动配置。
事实上，官方文档是鼓励用 cocoapods 进行自动安装和配置的，
然而 react-native 并没有使用 cocoapods，这就需要我们自己新建 Podfile，
该示例的 [Podfile](https://github.com/qiuxiang/react-native-amap3d/blob/develop/example/ios/Podfile)
可以作为参考。对于 iOS 项目，不需要 `react-native link`，而需要：
1. 在 `ios` 目录下运行 `pod install`
2. 打开 Example.xcworkspace，选择 `Example` target，`run`

## Android

如果是新项目，需要运行 `react-native link react-native-amap3d`，
这个示例的 gradle 已经设置好，直接运行 `npm run android` 就可以了。
