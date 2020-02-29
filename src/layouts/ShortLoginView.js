import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { InputItem, InputButtonItem, Header, AgreeProtocolItem, LoginButton } from '../components';
import { px } from '../utils';
import { unReadCount, loginWithCode } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class ShortLoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAgreeSelect: false,
            phone: null,
            smsCode: null,
            position: '上海市',
            longitude: 121.48,
            latitude: 31.23,
            city: 310114
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title="" rightComponent={this.rightComponent()} />
                <Text style={styles.loginAccountText}>手机快捷登录</Text>
                <Text style={styles.loginText}>新用户登录将自动注册</Text>
                <InputItem keyboardType="number-pad" changeText={this.changePhone.bind(this)} value={this.state.phone} placeholder="请输入手机号" />
                <InputButtonItem phone={this.state.phone} changeText={this.changeSmsCode.bind(this)} value={this.state.smsCode} placeholder="请输入验证码" />
                <AgreeProtocolItem isSelect={this.state.isAgreeSelect} statusChange={this.selectChange.bind(this)} />
                <LoginButton buttonAction={this.loginAction.bind(this)} title="登录"/>
            </SafeAreaView>
        )
    }

    rightComponent = () => {
        return <TouchableOpacity onPress={this.navigatePasswordView.bind(this)} style={styles.quickLoginButton}>
            <Text style={styles.quickLoginText}>密码登录</Text>
        </TouchableOpacity>
    }

    navigatePasswordView() {
        this.props.navigation.goBack();
    }

    selectChange(status) {
        this.setState({
            isAgreeSelect: status
        })
    }

    changePhone(phone) {
        this.setState({
            phone: phone
        })
    }

    changeSmsCode(code) {
        this.setState({
            smsCode: code
        })
    }

    loginAction() {
        if (this.state.phone == null) {
            Toast.info('请输入手机号');
            return;
        }
        if (this.state.smsCode == null) {
            Toast.info('请输入雅正吗');
            return;
        }
        if (!this.state.isAgreeSelect) {
            Toast.info('请点击确认登录协议');
            return;
        }

        const data = {
            phone: this.state.phone,
            smsCode: this.state.smsCode,
            position: this.state.position,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            city: this.state.city,
            callback: this.shortLoginCallback.bind(this)
        }
        // loginWithCode
        loginWithCode(data);
    }

    shortLoginCallback(res) {
        console.log('res', res);
        const { success, error } = res;
        if (success) {
            Toast.info('登录成功');
            this.props.navigation.popToTop();
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskReload');
        } else {
            Toast.info(error);
        }

    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        flex: 1
    },
    quickLoginButton: {
        height: '100%',
        marginRight: px(30),
        justifyContent: 'center'
    },
    quickLoginText: {
        color: '#ED7539',
        fontSize: px(26)
    },
    loginAccountText: {
        marginTop: px(90),
        marginLeft: px(40),
        fontSize: px(46),
        color: '#333'
    },
    loginText: {
        marginTop: px(32),
        marginLeft: px(40),
        fontSize: px(26),
        color: '#999999',
        marginBottom: px(80)
    }
})