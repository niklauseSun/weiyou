import AliyunOSS from 'aliyun-oss-react-native';
import { getOssToken } from '../requests';

const bucketname = 'rongledev';
function uploadOssFile(fileName, filepath){
    return AliyunOSS.asyncUpload(bucketname, fileName, filepath)
    .then((e) => {
        console.log('e', e);
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
  console.log('res', res);
  const { success, data } = res;
  if (success) {
    const {
      accessid,
      host,
      signature,
      dir,
      apphost
    } = data;
    global.dir = dir;
    global.imageHost = host
    const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60
    };
    AliyunOSS.initWithPlainTextAccessKey(accessid, 'xkbwUB1guhREPwWDFKcTDjdlINeXp4', apphost, configuration);
  }
}

export {
  initAliyunOSS,
  uploadOssFile
}