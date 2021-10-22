import { useNavigation, useTheme } from "@react-navigation/native";
import * as React from "react";
import {
  Constructor,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { NavigationProps, ScreenName } from "./types";

let Touchable: Constructor<any> = TouchableHighlight;
if (Platform.OS === "android") {
  Touchable = TouchableNativeFeedback;
}

export default () => (
  <ScrollView>
    <Item name="地图模式" />
    <Item name="基本图层" />
    <Item name="室内地图" />
    <Item name="地图控件" />
    <Item name="手势交互" />
    <Item name="动画移动" />
    <Item name="地图事件" />
    <Item name="添加标记" />
    <Item name="绘制折线" />
    <Item name="绘制多边形" />
    <Item name="绘制圆形" />
    <Item name="热力图" />
    <Item name="海量点" />
  </ScrollView>
);

function Item({ name }: { name: ScreenName }) {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProps>();
  return (
    <Touchable onPress={() => navigation.push(name)}>
      <View style={style.item}>
        <Text style={[style.itemText, { color: colors.text }]}>{name}</Text>
      </View>
    </Touchable>
  );
}

const style = StyleSheet.create({
  item: { padding: 16 },
  itemText: { fontSize: 16 },
});
