import px from './px';
import getCurrentDays from './GetCurrentDay';
import getPosition from './GetPosition';

import {
  formatDate,
  formatHour,
  formatHourWithString,
  formateDateType,
  formateDateWithString,
  formatDateToString,
  formateDateHourWithString
} from './FormatDate';
import {
  requestCameraPermission,
  requestReadContactsPermission,
  requestFineLocation,
  requestCoarseLocation,
  requestPhoneState,
  requestWapPush,
  requestReadStorage,
  requestWriteStorage,
  checkAll
} from './CheckPermissions'

import { checkPhone } from './IdentifyPhone'
import { initAliyunOSS, uploadOssFile } from './UploadImage'

export {
  px,
  getCurrentDays,
  formatHour,
  formatDate,
  formatHourWithString,
  formateDateType,
  formateDateWithString,
  formatDateToString,
  checkPhone,
  formateDateHourWithString,
  checkAll,
  getPosition,
  initAliyunOSS,
  uploadOssFile
  // uploadOssFile
};
