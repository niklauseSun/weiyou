package com.lds.weiyou.utils;

public class ConsUtils {
    //Fragment的tag
    public static final String FRAG_WETHER="fragwether";

    //请求码与返回码
    public static final int SET_ALARM_DONE=0;//闹钟设置成功
    public static final int SET_ALARM_CANCEL=1;//闹钟设置取消
    public static final int UPDATE_ALARM_DONE=2;//闹钟设置成功
    public static final int UPDATE_ALARM_CANCEL=3;//闹钟修改取消
    public static final int ADD_ALARM=0;//跳转到闹钟添加
    public static final int UPDATAE_ALARM=8;//跳转到闹钟添加
    public static final int ASK_FOR_RING=5;//跳转到闹钟添加
    public static final int RING_SET_DONG=6;//跳转到闹钟添加
    public static final int RING_SET_CANCEL=7;//跳转到闹钟添加
    //数据库
    public static final String SQLDB_NAME="alarm.db";//闹钟信息数据库
    public static final String ALARM_TABLE="AlarmInfo";//闹钟的信息表名
    public static final String ALARM_HOUR="Hour";//闹钟小时
    public static final String ALARM_MINUTE="Minute";//闹钟分钟
    public static final String ALARM_RING="Ring";//闹钟的铃声
    public static final String ALARM_LAZY_LEVEL="LazyLevel";//闹钟赖床级别
    public static final String ALARM_TAG="Tag";//闹钟标签
    public static final String ALARM_REPEAT_DAY="DayOfWeek";//一周重复的天
    public static final String ALARM_ID="AlarmID";//一周重复的天
    public static final String ALARM_RING_ID="RingId";//一周重复的天
    public static final String CLOCK_ID="clockid";

    //Pref
    public static final String SHOULD_WETHER_CLOSE="shouldwetherclose";//是否不显示天气
    public static final String Last_REQUEST_TIME="lastrequesttime";//上一次请求网络的时间
    public static final String IS_VIBRATE="isvibrate";//是否打开震动
    public static final String IS_FIRST_TIME="isfirsttime";//是否打开震动
    public static final String CURRENT_CITY="currentcity";//当前选择的城市
    public static final String ALARM_VOLUME="alarmvolume";//当前选择的城市

}
