import React, { useEffect, useRef } from "react";
import { Platform, View } from "react-native";
export default function StaticWebApp() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }
    /*
     * The vanilla U-scaly application can be initialized here.
     *
     * React owns the runtime.
     * The actual UI remains HTML/CSS/JS.
     */
    return () => {
      /*
       * Cleanup hooks for event listeners,
       * object URLs and animation loops
       * will live here when necessary.
       */
    };
  }, []);
  return (
    <View
      ref={containerRef as never}
      style={{
        flex: 1,
      }}
    />
  );
}
