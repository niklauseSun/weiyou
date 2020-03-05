import px from './px';
import getCurrentDays from './GetCurrentDay';

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
  checkAll
};
