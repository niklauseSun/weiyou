package com.lsd.weiyou.wxapi;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}
