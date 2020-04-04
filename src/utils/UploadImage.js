import AliyunOSS from 'aliyun-oss-react-native';
import { getOssToken } from '../requests';

function uploadOssFile(fileName, filepath){
  return AliyunOSS.asyncUpload(global.bucketname, fileName, filepath)
  .then((e) => {
    console.log('e', e);
    return e;
  }).catch(error => {
    console.log('=== error', error);
  });
}

function initAliyunOSS() {
  getOssToken({
    callback: ossCallback
  })
}

function ossCallback(res) {
  console.log('res aliyunoss', res);
  const { success, data } = res;
  if (success) {
    const {
      accessid,
      host,
      signature,
      dir,
      apphost,
      accessKeySecret
    } = data;
    global.dir = dir;
    global.imageHost = host
    global.bucketname = host.split('.')[0]
    console.log('buckete', global.bucketname);
    const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60
    };
    // aliyunOssReactNative.initWithImplementedSigner()

      // AliyunOSS.initWithImplementedSigner(signature, accessid, apphost, configuration);
    AliyunOSS.initWithPlainTextAccessKey(accessid, accessKeySecret, apphost, configuration);
  }
}

export {
  initAliyunOSS,
  uploadOssFile
}