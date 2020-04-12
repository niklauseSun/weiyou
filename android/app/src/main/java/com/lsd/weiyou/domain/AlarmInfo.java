package com.lsd.weiyou.domain;

import com.lsd.weiyou.dao.AlarmInfoDao;

import java.io.Serializable;

public class AlarmInfo implements Serializable {
    private int Hour;
    private int Minute;
    private int LazyLevel;
    private String Ring;
    private String Tag;
    private int[] dayOfWeek;
    private String ringResId;
    private String content;
    private String clockId;

    public String getClockId() {
        return clockId;
    }

    public void setClockId(String clockId) {
        this.clockId = clockId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getId(){
        String id=""+Hour+Minute+ AlarmInfoDao.getDataDayofWeek(dayOfWeek);
        return id;
    }

    @Override
    public String toString() {
        return "AlarmInfo{" +
                getId()+
                ", Tag='" + Tag + '\'' +
                ", Ring='" + Ring + '\'' +
                ", LazyLevel=" + LazyLevel +
                '}';
    }

    public int getHour() {
        return Hour;
    }

    public void setHour(int hour) {
        Hour = hour;
    }

    public int getMinute() {
        return Minute;
    }

    public void setMinute(int minute) {
        Minute = minute;
    }

    public int getLazyLevel() {
        return LazyLevel;
    }

    public void setLazyLevel(int lazyLevel) {
        LazyLevel = lazyLevel;
    }

    public String getRing() {
        return Ring;
    }

    public void setRing(String ring) {
        Ring = ring;
    }

    public String getTag() {
        return Tag;
    }

    public void setTag(String tag) {
        Tag = tag;
    }

    public int[] getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int[] dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getRingResId() {
        return ringResId;
    }

    public void setRingResId(String ringResId) {
        this.ringResId = ringResId;
    }
}
