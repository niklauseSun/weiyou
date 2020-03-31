//
//  AlarmManager.m
//  WeiYou
//
//  Created by 孙玉建 on 2020/2/22.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "AlarmManager.h"
#import <React/RCTLog.h>
#import "UNNotificationsManager.h"
#import "Toast.h"

@implementation AlarmManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_METHOD(addNormalAlarm:(NSString *)idStr name:(NSString *)name time:(NSString *)timeString repeats:(NSArray *)repeats addType:(NSString *)type) {
  
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
  [formatter setDateFormat:@"yyyy-MM-dd HH:mm"];
  //NSString转NSDate
  NSDate *date= [formatter dateFromString:timeString];
  RCTLogInfo(@"testid:%@  name: %@  timeString:%@  repeats: %@",idStr, name, timeString, repeats);
  
  [repeats enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    RCTLogInfo(@"test111%@", obj);
    NSInteger week = 0;
    if ([obj containsString:@"周日"]) {
        week = 1;
    }else if([obj containsString:@"周一"]){
        week = 2;
    }else if([obj containsString:@"周二"]){
        week = 3;
    }else if([obj containsString:@"周三"]){
        week = 4;
    }else if([obj containsString:@"周四"]){
        week = 5;
    }else if([obj containsString:@"周五"]){
        week = 6;
    } else if([obj containsString:@"周六"]){
        week = 7;
    }
    
    NSString *identifer = [NSString stringWithFormat:@"%@-%d",idStr, (int)week];
    
    NSLog(@"idStr %@", identifer);
    
    [UNNotificationsManager addNotificationWithContent:[UNNotificationsManager contentWithTitle:@"唯友" subTitle:name body:@"请进入应用签到" sound:[UNNotificationSound soundNamed:@"lightM_01.caf"]] weekDay:week date:date identifer:identifer isRepeat:YES completionHanler:^(NSError *error) {
        NSLog(@"add error %@", error);
    }];
  }];
}

RCT_EXPORT_METHOD(addSpecialAlarm:(NSString *)idStr name:(NSString *)name time:(NSString *)timeString) {
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
  [formatter setDateFormat:@"yyyy-MM-dd HH:mm"];
  //NSString转NSDate
  NSDate *date= [formatter dateFromString:timeString];
  
  RCTLogInfo(@"testid:%@  name: %@  timeString:%@",idStr, name, timeString);
  
  [UNNotificationsManager addNotificationWithContent:[UNNotificationsManager contentWithTitle:@"唯友" subTitle:name body:@"请进入应用签到" sound:[UNNotificationSound soundNamed:@"lightM_01.caf"]] dateComponents:[UNNotificationsManager componentsWithDate:date] identifer:idStr isRepeat:NO completionHanler:^(NSError *error) {
      NSLog(@"add error %@", error);
  }];
}

RCT_EXPORT_METHOD(removeNormalAlarmWithId:(NSString *)idStr andRepeats:(NSArray *)repeats) {
  
//  [UNNotificationsManager removeNotificationWithIdentifers:(nonnull NSArray<NSString *> *)]
  [repeats enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSInteger week = 0;
    if ([obj containsString:@"周日"]) {
        week = 1;
    }else if([obj containsString:@"周一"]){
        week = 2;
    }else if([obj containsString:@"周二"]){
        week = 3;
    }else if([obj containsString:@"周三"]){
        week = 4;
    }else if([obj containsString:@"周四"]){
        week = 5;
    }else if([obj containsString:@"周五"]){
        week = 6;
    } else if([obj containsString:@"周六"]){
        week = 7;
    }
    
    NSString *identifer = [NSString stringWithFormat:@"%@-%d",idStr, (int)week];
    
    NSLog(@"idStr %@", identifer);
    [UNNotificationsManager removeNotificationWithIdentifer:identifer];
  }];
}

RCT_EXPORT_METHOD(removeSpecialAlarmWithId:(NSString *)idStr) {
  
    [UNNotificationsManager removeNotificationWithIdentifer:idStr];
}

@end
