module.exports = {
  dependency: {
    platforms: {
      android: { sourceDir: "lib/android" },
    },
  },
  dependencies: {
    "react-native-amap3d": {
      root: __dirname,
      platforms: {
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import qiuxiang.amap3d.AMap3DPackage;",
          packageInstance: "new AMap3DPackage()",
        },
      },
    },
  },
};
