//
//  EventEmitterManager.m
//  WeiYou
//
//  Created by 孙玉建 on 2020/3/15.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "EventEmitterManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@implementation EventEmitterManager

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static EventEmitterManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"NativeResult"];
}

- (void)sendNotifictionToRN:(NSDictionary *)dict {
  [self sendEventWithName:@"NativeResult" body:dict];
}

@end
