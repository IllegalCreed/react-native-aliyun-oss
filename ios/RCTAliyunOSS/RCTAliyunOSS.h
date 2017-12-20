//
//  RCTAliyunOSS.h
//  RCTAliyunOSS
//
//  Created by 张旭 on 2017/12/20.
//  Copyright © 2017年 张旭. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "OSSService.h"


@interface RCTAliyunOSS : RCTEventEmitter <RCTBridgeModule>

@property OSSClient *client;
@property OSSClientConfiguration *clientConfiguration;

@property bool hasListeners;

-(NSString *)getDocumentDirectory;
-(NSString *)getTemporaryDirectory;
-(void) initConfiguration:(NSDictionary *)configuration;
-(void) beginUploadingWithFilepath:(NSString *)filepath resultBlock:(void (^) (NSData *))callback;

+ (NSString*)generateTemporaryDirectoryFrom:(NSString*)sourcePath withData:(NSData*)data;

@end
