import React from "react";
import { Platform, View } from "react-native";
import StaticWebApp from "./StaticWebApp";
export default function UscalyWebSurface() {
  if (Platform.OS === "web") {
    return <StaticWebApp />;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050505",
      }}
    >
      <StaticWebApp />
    </View>
  );
}
