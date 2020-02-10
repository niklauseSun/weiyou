import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native'
import { Button } from '@ant-design/react-native'
import { Header, SignItem, AddItem, WarnHeader, SignSuccessModal, MessageItem, WeekItem } from '../components'
import { commonStyles } from '../commonStyles'
import { px, getCurrentDays } from '../utils'
import { ASSET_IMAGES } from '../config'

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWeek: null,
            today: null
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.body}>
                {/* <Text>Home!</Text> */}
                <Header leftIsBack={false} title="唯友首页" rightComponent={this.rightComponent()} />
                {/* <Button onPress={this.addCalender} style={styles.buttonStyle}>添加日历</Button>
                <Button onPress={this.addTimeAlert} style={styles.buttonStyle}>闹钟</Button>
                <Button onPress={this.addPushNotification} style={styles.buttonStyle}>消息推送</Button>
                <Button onPress={this.addWeakUpApp} style={styles.buttonStyle}>微信唤醒app</Button>
                <Button onPress={this.addWxShare} style={styles.buttonStyle}>微信分享</Button>
                <Button onPress={this.addWxLogin} style={styles.buttonStyle}>微信登录</Button>
                <Button onPress={this.addWxPay} style={styles.buttonStyle}>微信支付</Button> */}
                {/* <Button onPress={this.addMessageSend} style={styles.buttonStyle}>短信发送</Button> */}
                {/* <SignItem /> */}
                <AddItem />
                {/* <WarnHeader /> */}
                {/* <SignSuccessModal /> */}

                {/* <MessageItem /> */}
                <WeekItem />
            </SafeAreaView>
        );
    }

    // view

    rightComponent(){
        return (
            <TouchableOpacity onPress={this.navigateToMessageList.bind(this)} activeOpacity={0.7} style={styles.messageButton}>
                <Image style={styles.messageIcon} source={ASSET_IMAGES.ICON_MESSAGE} />
                <View style={styles.messageCount}>
                    <Text style={styles.messageCountText}>99+</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // action
    navigateToMessageList() {
        this.props.navigation.navigate('MessageList')
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        marginBottom: 12
    },
    messageButton: {
        marginRight: px(30),
        width: px(60),
        height: px(60)
    },
    messageCount: {
        position: 'absolute',
        backgroundColor: 'red',
        height: px(36),
        width: px(36),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px(40),
        borderRadius: px(18)
    },
    messageCountText: {
        fontSize: px(16),
        color: '#fff',
    },
    messageIcon: {
        marginLeft: px(10),
        marginTop: px(10)
    }
});
