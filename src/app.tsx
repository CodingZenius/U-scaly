import React from "react";
import { View } from "react-native";
import UscalyWebSurface from "./UscalyWebSurface";
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050505",
      }}
    >
      <UscalyWebSurface />
    </View>
  );
}
