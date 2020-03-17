package com.lds.weiyou;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WeiYou";
  }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // ATTENTION: This was auto-generated to handle app links.
        Intent appLinkIntent = getIntent();
        String clockid = appLinkIntent.getStringExtra("clockid");

        if (clockid != null) {
            WritableMap params = Arguments.createMap();
            params.putString("type", "notification");
            params.putString("idStr", clockid);
            sendNotificationToRN(getReactNativeHost().getReactInstanceManager().getCurrentReactContext(), "NativeResult",params);
        }
    }

    private void sendNotificationToRN(ReactContext reactContext,
                                      String eventName,
                                      @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
