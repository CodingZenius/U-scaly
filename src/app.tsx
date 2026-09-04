import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Gyroscope } from "expo-sensors";

const WEB_APP_URL = "https://YOUR-USERNAME.github.io/u-scaly/";

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    let subscription: { remove: () => void } | null = null;

    const startSensors = async () => {
      const available = await Gyroscope.isAvailableAsync();

      if (!available) {
        return;
      }

      Gyroscope.setUpdateInterval(50);

      subscription = Gyroscope.addListener(({ x, y, z }) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "gyro",
            x,
            y,
            z,
          })
        );
      });
    };

    startSensors();

    return () => {
      subscription?.remove();
    };
  }, []);

  if (Platform.OS === "web") {
    return (
      <iframe
        src="/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        setSupportMultipleWindows={false}
        onMessage={(event: WebViewMessageEvent) => {
          console.log("WebView:", event.nativeEvent.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  webview: {
    flex: 1,
    backgroundColor: "#050505",
  },
});
