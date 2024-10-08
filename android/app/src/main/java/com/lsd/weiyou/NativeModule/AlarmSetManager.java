package com.lsd.weiyou.NativeModule;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.lsd.weiyou.dao.AlarmInfoDao;
import com.lsd.weiyou.domain.AlarmClock;
import com.lsd.weiyou.domain.AlarmInfo;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class AlarmSetManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    AlarmSetManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmManager";
    }

    @ReactMethod
    public void addSpecialAlarm(String ids, String name, String timeString) {
        Log.e("addSpecial", timeString);

//        2020-03-04T10:33:36.669Z'
        String pat = "yyyy-MM-dd HH:mm";
        SimpleDateFormat sdf1 = new SimpleDateFormat(pat);
        Date d = null;
        try {
            d = sdf1.parse(timeString);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.e("date", sdf1.format(d));

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(d);

        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minute = calendar.get(Calendar.MINUTE);

        int[] day = new int[]{};

        AlarmInfoDao dao = new AlarmInfoDao(reactContext.getCurrentActivity());


        AlarmInfo alarmInfo = new AlarmInfo();
        AlarmClock alarmClock = new AlarmClock(reactContext);
        alarmInfo.setHour(hour);
        alarmInfo.setMinute(minute);
        alarmInfo.setDayOfWeek(day);
        alarmInfo.setLazyLevel(0);
        alarmInfo.setTag("闹钟");
        alarmInfo.setRing("everybody");
        alarmInfo.setRingResId("everybody.mp3");
        alarmInfo.setContent(name);
        alarmInfo.setClockId(ids);

        dao.addAlarmInfo(alarmInfo);
        alarmClock.turnAlarm(alarmInfo, ids, true);
        Toast.makeText(reactContext, "添加成功", Toast.LENGTH_SHORT).show();

//        Intent intent = new Intent(reactContext, AlarmReceiver.class);
//        intent.setAction("NOTIFICATION");
//        intent.setFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
//
//
//        intent.putExtra("content",name);
//
//        PendingIntent pendingIntent = PendingIntent.getBroadcast(reactContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
//
//        AlarmManager alarmMgr = (AlarmManager) reactContext.getSystemService(reactContext.getCurrentActivity().ALARM_SERVICE);
////        alarmMgr.set(AlarmManager.RTC_WAKEUP, d.getTime(), pendingIntent);
//        Log.e("timeStart", System.currentTimeMillis() + "");
//        Log.e("dTime", d.getTime() + "");
//        alarmMgr.setRepeating(AlarmManager.RTC_WAKEUP, d.getTime(), 0, pendingIntent);
    }

    @ReactMethod
    public void addNormalAlarm(String ids, String name, String timeString, ReadableArray repeatArray, String type) {
        Log.e("addNormal", name);
        Log.e("addNormal", repeatArray.toString());

        String pat = "yyyy-MM-dd HH:mm";
        SimpleDateFormat sdf1 = new SimpleDateFormat(pat);
        Date d = null;
        try {
            d = sdf1.parse(timeString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(d);
        int[] day = getRepeatDay(repeatArray);

        Log.e("time", calendar.get(Calendar.HOUR_OF_DAY) + "");
        Log.e("ddd", calendar.get(Calendar.MINUTE) + "");

        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minute = calendar.get(Calendar.MINUTE);

        AlarmInfoDao dao = new AlarmInfoDao(reactContext.getCurrentActivity());

        AlarmInfo alarmInfo = new AlarmInfo();
        AlarmClock alarmClock = new AlarmClock(reactContext);
        alarmInfo.setHour(hour);
        alarmInfo.setMinute(minute);
        alarmInfo.setDayOfWeek(day);
        alarmInfo.setLazyLevel(0);
        alarmInfo.setTag("闹钟");
        alarmInfo.setRing("everybody");
        alarmInfo.setRingResId("everybody.mp3");
        alarmInfo.setContent(name);
        alarmInfo.setClockId(ids);


        if (type.equals("update")) {
            // 更新
        } else {
            // 添加
            dao.addAlarmInfo(alarmInfo);
            alarmClock.turnAlarm(alarmInfo, null, true);
        }

        Toast.makeText(reactContext, "添加成功", Toast.LENGTH_SHORT).show();
    }

//    private AlarmInfo getAddAlarmInfo() {
//        AlarmInfo alarmInfo = new AlarmInfo();
//    }

    private int[] getRepeatDay(ReadableArray readableArray) {
        String dayRepeat = "";
        for (int i = 0;i < readableArray.size();i++) {
            String str = readableArray.getString(i);
            Log.e("getRepeat", str);

            if (str.equals("周一")) {
                dayRepeat += "1" + ",";
            }

            if (str.equals("周二")) {
                dayRepeat += "2" + ",";
            }

            if (str.equals("周三")) {
                dayRepeat += "3" + ",";
            }

            if (str.equals("周四")) {
                dayRepeat += "4" + ",";
            }

            if (str.equals("周五")) {
                dayRepeat += "5" + ",";
            }

            if (str.equals("周六")) {
                dayRepeat += "6" + ",";
            }

            if (str.equals("周日")) {
                dayRepeat += "7" + ",";
            }
        }

        return AlarmInfoDao.getAlarmDayofWeek(dayRepeat);
    }

    @ReactMethod
    public void removeNormalAlarmWithId(String idStr, ReadableArray repeatArray) {
        AlarmInfoDao dao = new AlarmInfoDao(reactContext.getCurrentActivity());
        try {
            AlarmInfo info = dao.findByClockId(idStr);
            AlarmClock clock = new AlarmClock(reactContext);
            clock.turnAlarm(info, null, false);
            dao.deleteAlarm(info);
        }catch (Exception e) {

        }

    }

    @ReactMethod
    public void removeSpecialAlarmWithId(String idStr) {
        AlarmInfoDao dao = new AlarmInfoDao(reactContext.getCurrentActivity());
        try {
            AlarmInfo info = dao.findByClockId(idStr);
            AlarmClock clock = new AlarmClock(reactContext);
            clock.turnAlarm(info, null, false);
            dao.deleteAlarm(info);
        }catch (Exception e) {

        }

    }
}
