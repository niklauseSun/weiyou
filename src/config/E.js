import { Dimensions, PixelRatio, Platform } from "react-native";

export default {
    DEBUG: true,

    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,

    // 系统是iOS
    IS_IOS: (Platform.OS === 'ios'),

    VERSION: '1.1.2',

    // 微信
    WECHAT_APP_ID: 'wxd766440bddf6a75d',
    WECHAT_INSTALLED: false,
    WECHAT_APP_SECRET: '4cd46a29fcf12dec70d0fdf25d81a416',
    BUSINESS_ID: '1512059331',
    SHKEY: 'bm62FFwBXWo9LA8xlYW3GTMVOBYTTxhy',
    WEB_KEY: '6921bd02defe25287838cbc66a714582'
  }