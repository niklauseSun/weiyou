/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <AMapFoundationKit/AMapFoundationKit.h>
#import "EventEmitterManager.h"
// 引入 JPush 功能所需头文件
//#import "JPUSHService.h"
#import <RCTJPushModule.h>
// iOS10 注册 APNs 所需头文件
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import "UNNotificationsManager.h"

@interface AppDelegate()<JPUSHRegisterDelegate, UNUserNotificationCenterDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"WeiYou"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [JPUSHService setupWithOption:launchOptions appKey:@"b89ecfe4b6dac36ebbf8bd65" channel:@"default" apsForProduction:YES];
  
  // APNS
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  if (@available(iOS 12.0, *)) {
    entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound|JPAuthorizationOptionProvidesAppNotificationSettings;
  }
  
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  [launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];

  [UNNotificationsManager registerLocalNotification];

  [AMapServices sharedServices].apiKey = @"72c3690b9f09600a36079998938feb09";
  
  return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
      NSURL *url = userActivity.webpageURL;
      NSLog(@"url %@", url.query);
    if ([url.host isEqualToString:@"wy.99rongle.com"]) {
      EventEmitterManager *manager = [EventEmitterManager allocWithZone:nil];
      [manager sendNotifictionToRN:@{
        @"type": @"awake",
        @"string": url.query
      }];
    }
//      if ()
//      {
//          //进行我们的处理
//      }
//      else
//      {
//          [[UIApplication sharedApplication] openURL:url];
//      }
  }
   
  return YES;
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {

}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}

// iOS 12 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(UNNotification *)notification{
  NSLog(@"iOS 12 Support");
  if (notification && [notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    //从通知界面直接进入应用
  }else{
    //从通知设置界面进入应用
  }
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  //Optional
  NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)jpushNotificationAuthorization:(JPAuthorizationStatus)status withInfo:(NSDictionary *)info {
  
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    // Apns
    NSLog(@"iOS 10 APNS 消息事件回调");
    [JPUSHService handleRemoteNotification:userInfo];
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._notificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  else {
    // 本地通知
    NSLog(@"iOS 10 本地通知 消息事件回调");
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._localNotificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  // 系统要求执行这个方法
  completionHandler();
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
   if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
     // Apns
     NSLog(@"iOS 10 APNS 前台收到消息");
     [JPUSHService handleRemoteNotification:userInfo];
     [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_ARRIVED_EVENT object:userInfo];
   }
   else {
     // 本地通知 todo
     NSLog(@"iOS 10 本地通知 前台收到消息");
     [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_ARRIVED_EVENT object:userInfo];
     NSLog(@"userInof %@", userInfo);
   }
   //需要执行这个方法，选择是否提醒用户，有 Badge、Sound、Alert 三种类型可以选择设置
   completionHandler(UNNotificationPresentationOptionAlert);
}

// ios 8.x or older
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                            sourceApplication:sourceApplication annotation:annotation];
}

// ios 9.0+
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end
