import React, { useEffect, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Gyroscope } from "expo-sensors";
import {
  WebView,
  WebViewMessageEvent,
} from "react-native-webview";

const WEB_APP_URL =
  "https://codingzenius.github.io/u-scaly/";

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    let subscription: ReturnType<
      typeof Gyroscope.addListener
    > | null = null;

    const startGyroscope = async () => {
      try {
        const available = await Gyroscope.isAvailableAsync();

        if (!available) {
          console.log("Gyroscope unavailable");
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
      } catch (error) {
        console.error("Gyroscope error:", error);
      }
    };

    startGyroscope();

    return () => {
      subscription?.remove();
    };
  }, []);

  if (Platform.OS === "web") {
    return null;
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(
        event.nativeEvent.data
      );

      console.log("U-scaly:", message);
    } catch {
      console.log(
        "U-scaly:",
        event.nativeEvent.data
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: WEB_APP_URL,
        }}
        style={styles.webview}
        originWhitelist={["https://*"]}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        bounces={false}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        setSupportMultipleWindows={false}
        onMessage={handleMessage}
        onError={(event) => {
          console.error(
            "U-scaly WebView:",
            event.nativeEvent.description
          );
        }}
      />
    </SafeAreaView>
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
