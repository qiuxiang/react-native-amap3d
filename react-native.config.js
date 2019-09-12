// https://github.com/react-native-community/cli/blob/master/docs/configuration.md#libraries
module.exports = {
  dependency: {
    platforms: {
      ios: {
        // FIXME: Have to mock a xcodeproj to enable autolinking for ios
        // https://github.com/react-native-community/cli/blob/master/packages/platform-ios/src/config/index.ts#L38-L45
        project: "lib/ios/placeholder.xcodeproj"
      },
      android: {
        sourceDir: "lib/android"
      }
    }
  }
};
