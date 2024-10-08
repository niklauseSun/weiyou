package com.lsd.weiyou;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.gyf.cactus.Cactus;
import com.lsd.weiyou.BuildConfig;
import com.tencent.bugly.crashreport.CrashReport;
import com.lsd.weiyou.NativeModule.AlarmModule;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import cn.jiguang.plugins.push.JPushModule;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            packages.add(new AlarmModule());
//            packages.add(new WeChatPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
      super.onCreate();
//      CrashReport.initCrashReport(getApplicationContext(), "注册时申请的APPID", false);
      CrashReport.initCrashReport(getApplicationContext(), "dd53594e5a",false);
      SoLoader.init(this, /* native exopackage */ false);
//      JPushInterface.init(this);
      JPushModule.registerActivityLifecycle(this);
      registerCactus();
      initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  private void registerCactus() {
      Cactus.getInstance()
              .setContent("唯友")
              .setMusicEnabled(true)
              .setBackgroundMusicEnabled(true)
              .setOnePixEnabled(true)
              .register(this);
  }
}
