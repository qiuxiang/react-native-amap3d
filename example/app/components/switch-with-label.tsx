import * as React from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Switch, Text, View } from "react-native";

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
  label: string;
  vertical?: boolean;
}

export default ({ onChange, value, label }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={[style.control]}>
      <Switch onValueChange={onChange} value={value} />
      <View style={style.separator} />
      <Text style={{ color: colors.text }}>{label}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  control: {
    alignItems: "center",
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  separator: { width: 8, height: 8 },
});
