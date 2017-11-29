//
//  ErrorInfoUtility.m
//  MAMapKit_2D_Demo
//
//  Created by hanxiaoming on 16/11/30.
//  Copyright © 2016年 Autonavi. All rights reserved.
//

#import "ErrorInfoUtility.h"
#import <AMapSearchKit/AMapSearchError.h>

#define kErrorInfoUrl @"http://lbs.amap.com/api/ios-sdk/guide/map-tool/errorcode/"

@implementation ErrorInfoUtility

+ (NSDictionary *)errorInfoMapping
{
    static NSDictionary *errorInfoMapping = nil;
    if (errorInfoMapping == nil)
    {
        errorInfoMapping = @{@(AMapSearchErrorOK):@"没有错误",
                             @(AMapSearchErrorInvalidSignature):@"无效签名",
                             @(AMapSearchErrorInvalidUserKey):@"key非法或过期",
                             @(AMapSearchErrorServiceNotAvailable):@"没有权限使用相应的接口",
                             @(AMapSearchErrorDailyQueryOverLimit):@"访问已超出日访问量",
                             @(AMapSearchErrorTooFrequently):@"用户访问过于频繁",
                             @(AMapSearchErrorInvalidUserIP):@"用户IP无效",
                             @(AMapSearchErrorInvalidUserDomain):@"用户域名无效",
                             @(AMapSearchErrorInvalidUserSCode):@"安全码验证错误，bundleID与key不对应",
                             @(AMapSearchErrorUserKeyNotMatch):@"请求key与绑定平台不符",
                             @(AMapSearchErrorIPQueryOverLimit):@"IP请求超限",
                             @(AMapSearchErrorNotSupportHttps):@"不支持HTTPS请求",
                             @(AMapSearchErrorInsufficientPrivileges):@"权限不足，服务请求被拒绝",
                             @(AMapSearchErrorUserKeyRecycled):@"开发者key被删除，无法正常使用",
                             
                             @(AMapSearchErrorInvalidResponse):@"请求服务响应错误",
                             @(AMapSearchErrorInvalidEngineData):@"引擎返回数据异常",
                             @(AMapSearchErrorConnectTimeout):@"服务端请求链接超时",
                             @(AMapSearchErrorReturnTimeout):@"读取服务结果超时",
                             @(AMapSearchErrorInvalidParams):@"请求参数非法",
                             @(AMapSearchErrorMissingRequiredParams):@"缺少必填参数",
                             @(AMapSearchErrorIllegalRequest):@"请求协议非法",
                             @(AMapSearchErrorServiceUnknown):@"其他服务端未知错误",
                             
                             @(AMapSearchErrorClientUnknown):@"客户端未知错误，服务返回结果为空或其他错误",
                             @(AMapSearchErrorInvalidProtocol):@"协议解析错误，通常是返回结果无法解析",
                             @(AMapSearchErrorTimeOut):@"连接超时",
                             @(AMapSearchErrorBadURL):@"URL异常",
                             @(AMapSearchErrorCannotFindHost):@"找不到主机",
                             @(AMapSearchErrorCannotConnectToHost):@"服务器连接失败",
                             @(AMapSearchErrorNotConnectedToInternet):@"连接异常，通常为没有网络的情况",
                             @(AMapSearchErrorCancelled):@"连接取消",
                             
                             @(AMapSearchErrorTableIDNotExist):@"table id 格式不正确",
                             @(AMapSearchErrorIDNotExist):@"id 不存在",
                             @(AMapSearchErrorServiceMaintenance):@"服务器维护中",
                             @(AMapSearchErrorEngineTableIDNotExist):@"key对应的table id 不存在",
                             @(AMapSearchErrorInvalidNearbyUserID):@"找不到对应userID的信息",
                             @(AMapSearchErrorNearbyKeyNotBind):@"key未开通“附近”功能",
                             @(AMapSearchErrorOutOfService):@"规划点（包括起点、终点、途经点）不在中国范围内",
                             @(AMapSearchErrorNoRoadsNearby):@"规划点（包括起点、终点、途经点）附近搜不到道路",
                             @(AMapSearchErrorRouteFailed):@"路线计算失败，通常是由于道路连通关系导致",
                             @(AMapSearchErrorOverDirectionRange):@"起点终点距离过长",
                             @(AMapSearchErrorShareLicenseExpired):@"短串分享认证失败",
                             @(AMapSearchErrorShareFailed):@"短串请求失败",};
    }
    
    return errorInfoMapping;
}

+ (NSString *)errorDescriptionWithCode:(NSInteger)errorCode
{
//    AMapSearchError.h
    NSString *description = [NSString stringWithFormat:@"错误信息：%@。请在<AMapSearchKit/AMapSearchError.h>头文件中查看错误信息或者访问【%@】了解详细信息。", [[self errorInfoMapping] objectForKey:@(errorCode)], kErrorInfoUrl];
    return description;
}

@end
