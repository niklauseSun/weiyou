package com.lsd.weiyou.server;

import android.app.Service;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

public class AlarmSoundService extends Service {
    private String Song;
    private MediaPlayer mediaPlayer;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Song = intent.getStringExtra("resid");
        if (Song == null) {
            Song = "everybody.mp3";
        }
        ringTheAlarm(Song);
        return super.onStartCommand(intent, flags, startId);
    }

    private void ringTheAlarm(String song) {
        AssetFileDescriptor assetFileDescriptor= null;
        try {
            mediaPlayer=new MediaPlayer();

            mediaPlayer.reset();
            mediaPlayer.setAudioStreamType(AudioManager.STREAM_ALARM);
            if(song.contains("/")){
                //说明是自定义铃声
                mediaPlayer.setDataSource(song);
            }else{
                assetFileDescriptor = this.getAssets().openFd(song);
                mediaPlayer.setDataSource(assetFileDescriptor.getFileDescriptor(),
                        assetFileDescriptor.getStartOffset(), assetFileDescriptor.getLength());
            }
            mediaPlayer.setVolume(1f, 1f);
            mediaPlayer.setLooping(true);
            mediaPlayer.prepare();
            mediaPlayer.start();

            Timer timer=new Timer();

            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    stopTheAlarm();
                }
            }, 10*1000);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void stopTheAlarm(){
        if(mediaPlayer!=null){
            mediaPlayer.stop();
            mediaPlayer.release();
        }

    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        stopTheAlarm();
        Log.d("alarm", "铃声关闭");
    }
}
