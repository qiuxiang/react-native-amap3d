module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios/react-native-amap3d.podspec" },
      android: { sourceDir: "lib/android" },
    },
  },
  dependencies: {
    "react-native-amap3d": {
      root: __dirname,
      platforms: {
        ios: { podspecPath: __dirname + "/lib/ios/react-native-amap3d.podspec" },
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import qiuxiang.amap3d.AMap3DPackage;",
          packageInstance: "new AMap3DPackage()",
        },
      },
    },
  },
};
