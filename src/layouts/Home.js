import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Button } from '@ant-design/react-native'
import { Header } from '../components'
import { commonStyles } from '../commonStyles'
import { px } from '../utils'

class HomeScreen extends Component {

    render() {
        return (
            <SafeAreaView style={commonStyles.body}>
                {/* <Text>Home!</Text> */}
                <Header leftIsBack={false} title="唯友首页" rightComponent={this.rightComponent()} />
                <Button onPress={this.addCalender} style={styles.buttonStyle}>添加日历</Button>
                <Button onPress={this.addTimeAlert} style={styles.buttonStyle}>闹钟</Button>
                <Button onPress={this.addPushNotification} style={styles.buttonStyle}>消息推送</Button>
                <Button onPress={this.addWeakUpApp} style={styles.buttonStyle}>微信唤醒app</Button>
                <Button onPress={this.addWxShare} style={styles.buttonStyle}>微信分享</Button>
                <Button onPress={this.addWxLogin} style={styles.buttonStyle}>微信登录</Button>
                <Button onPress={this.addWxPay} style={styles.buttonStyle}>微信支付</Button>
                <Button onPress={this.addMessageSend} style={styles.buttonStyle}>短信发送</Button>
            </SafeAreaView>
        );
    }

    // view

    rightComponent(){
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.messageButton}>
                <Text>通知</Text>
            </TouchableOpacity>
        )
    }

    // action
    addCalender() {
        console.log('addCalender');
        // 暂时不做
    }

    addTimeAlert() {
        console.log('time alert');
        // 暂时不做
    }

    addPushNotification() {
        console.log('push');
    }

    addWeakUpApp() {
        console.log('weak up');
        // 通过分享给微信的url
        // url直接打开本app
    }

    addWxShare() {
        console.log('wx share');
    }

    addWxLogin() {
        console.log('wx login');
    }

    addWxPay() {
        console.log('wx pay');
    }

    addMessageSend() {
        console.log('message send');
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        marginBottom: 12
    },
    messageButton: {
        marginRight: px(30)
    }
});
