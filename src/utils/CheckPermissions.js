import { PermissionsAndroid } from 'react-native';

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '申请摄像头权限',
              message:
                '请求摄像头权限进行拍照并上传',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('现在你获得摄像头权限了');
        } else {
            console.log('用户并不屌你');
        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestReadContactsPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: '申请读取通讯录权限',
              message:
                '请求读取通讯录权限以进行用户推荐',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestFineLocation() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: '申请位置权限',
              message:
                '请求读取用户位置权限以记录用户当前位置',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestCoarseLocation() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: '申请精确位置权限',
              message:
                '请求读取用户精确位置权限以记录用户当前位置',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestPhoneState() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
              title: '申请读取手机状态权限',
              message:
                '请求读取用户手机状态',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestWapPush() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
            {
              title: '申请读取推送权限',
              message:
                '请求推送权限以进行消息推送',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestReadStorage() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: '申请读取存储权限',
              message:
                '请求读取存储进行数据读取',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function requestWriteStorage() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: '申请读取写入存储权限',
              message:
                '请求读取写入存储进行数据写入',
              buttonNeutral: '等会再问我',
              buttonNegative: '不行',
              buttonPositive: '好的',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        } else {

        }
    } catch (err) {
        console.warn(err);
    }
}

async function checkAll() {
    await requestCameraPermission();
    await requestReadContactsPermission();
    await requestFineLocation();
    await requestCoarseLocation();
    await requestPhoneState();
    await requestWapPush();
    await requestReadStorage();
    await requestWriteStorage();
}

export {
    requestCameraPermission,
    requestReadContactsPermission,
    requestFineLocation,
    requestCoarseLocation,
    requestPhoneState,
    requestWapPush,
    requestReadStorage,
    requestWriteStorage,
    checkAll
}