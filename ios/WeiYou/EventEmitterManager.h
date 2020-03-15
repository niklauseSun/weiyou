//
//  EventEmitterManager.h
//  WeiYou
//
//  Created by 孙玉建 on 2020/3/15.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface EventEmitterManager : RCTEventEmitter <RCTBridgeModule>

- (void)sendNotifictionToRN:(NSDictionary *)dict;

@end

NS_ASSUME_NONNULL_END
