module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios/react-native-amap3d.podspec" },
      android: { sourceDir: "lib/android" }
    }
  },
  dependencies: {
    "react-native-amap3d": {
      platforms: { ios: { podspecPath: __dirname + "/lib/ios/react-native-amap3d.podspec" } }
    }
  }
};
