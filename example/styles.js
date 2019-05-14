import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  map: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 72
      }
    })
  },
  controls: {
    height: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 8,
    paddingLeft: 20,
    paddingRight: 20,
    ...Platform.select({
      ios: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderTopColor: "#e0e0e0",
        borderTopWidth: StyleSheet.hairlineWidth,
        zIndex: 1
      }
    })
  },
  control: {
    alignItems: "center",
    justifyContent: "center"
  },
  switch: {
    marginBottom: 5
  }
});
