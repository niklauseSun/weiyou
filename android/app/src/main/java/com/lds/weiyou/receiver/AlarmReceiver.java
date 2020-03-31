package com.lds.weiyou.receiver;

import android.app.KeyguardManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.PowerManager;
import android.util.Log;
import android.widget.Toast;

import com.lds.weiyou.MainActivity;
import com.lds.weiyou.R;
import com.lds.weiyou.server.AlarmSoundService;

public class AlarmReceiver extends BroadcastReceiver {
    Context context;
    private String resid;

    @Override
    public void onReceive(Context context, Intent intent) {
        this.context = context;
        Log.e("receive", "receive");
        if (intent.getAction().equals("NOTIFICATION")) {
            Toast.makeText(context, "闹钟提醒", Toast.LENGTH_LONG).show();
            Log.e("notification", "showNotification");
            String content = intent.getStringExtra("content");
            Log.e("notification message", content);
            sendNotification(intent);
            wakePhoneAndUnlock();
            if (intent.getBooleanExtra("cancel", false)) {
                return;
            }
            showAlarmDialog();
        }
    }

    private void sendNotification(Intent mIntent) {
        Intent intent = new Intent(context, MainActivity.class);
        String idStr = mIntent.getStringExtra("clockid");

        int idValue = Integer.parseInt(idStr.split("-")[1]);

        intent.putExtra("clockid", idStr);
        NotificationManager manager = (NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);

        if(mIntent.getBooleanExtra("cancel", false)) {
            manager.cancel(idValue);
            Log.e("cancel","取消");
            return;
        }
        Notification notification = null;
        PendingIntent pi = PendingIntent.getActivity(context, 1, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        String id = "my_channel_01";
        CharSequence name = "notice";

        NotificationChannel mChannel = new NotificationChannel(id, name, NotificationManager.IMPORTANCE_HIGH);

        String content = mIntent.getStringExtra("content");

        mChannel.enableLights(true);
        mChannel.setDescription("just show notice");
        mChannel.setLightColor(Color.GREEN);
        mChannel.enableVibration(true);
        mChannel.setVibrationPattern(new long[]{100,200,300,400,500,400,300,200,400});

        manager.createNotificationChannel(mChannel);

        Notification.Builder builder = new Notification.Builder(context, id);
        builder.setAutoCancel(true)
                .setContentIntent(pi)
                .setContentTitle("唯友")
                .setContentText(content)
                .setChannelId(id)
                .setOngoing(false)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setWhen((System.currentTimeMillis()));
        notification = builder.build();
        manager.notify(idValue, notification);
    }

    private void wakePhoneAndUnlock() {
        PowerManager pm = (PowerManager)context.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock mWakeLock = pm.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.FULL_WAKE_LOCK, "WakeLock");
        mWakeLock.acquire();

        KeyguardManager manager = (KeyguardManager)context.getSystemService(Context.KEYGUARD_SERVICE);
        KeyguardManager.KeyguardLock keyguardLock = manager.newKeyguardLock("Lock");

        keyguardLock.disableKeyguard();
        mWakeLock.release(); // 释放
    }

    private void showAlarmDialog() {
        final Intent service = new Intent(context, AlarmSoundService.class);
        service.putExtra("resid", resid);
        context.startService(service);
    }
}