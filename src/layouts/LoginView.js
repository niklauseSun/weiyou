import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, DeviceEventEmitter } from 'react-native'
import { Header, InputItem, LoginButton } from '../components'
import { px } from '../utils';
import { loginWithPasswordAction, getWxLogin, postWxLoginAuth } from '../requests';
import * as WeChat from 'react-native-wechat';
import { E } from '../config';
import { Toast } from '@ant-design/react-native';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            password: null,
            showBind: false
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title={""} rightComponent={this.rightComponent()}/>
                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss()
                }} activeOpacity={1} style={styles.content}>
                    <Text style={styles.loginAccountText}>账号密码登录</Text>
                    <Text style={styles.loginText}>{this.state.showBind ?'请输入注册手机和密码同微信绑定': '请您输入您的注册手机号码和登录密码'}</Text>
                    <InputItem value={this.state.phone} changeText={this.changePhone.bind(this)} placeholder={"请输入手机号码"} />
                    <InputItem value={this.state.password} changeText={this.changePassword.bind(this)} placeholder={"请输入密码"} />
                    <LoginButton buttonAction={this.loginAction.bind(this)} title="登录" />
                    <View style={styles.forgetView}>
                        <TouchableOpacity style={styles.forgetButton} onPress={this.forgetPasswordAction.bind(this)}>
                            <Text style={styles.forgetText}>忘记密码？</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.wxLogin.bind(this)}>
                        <Text>微信登录</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    rightComponent() {
        console.log('test', this)
        return <TouchableOpacity onPress={this.navigateToShortLoginView.bind(this)} style={styles.quickLoginButton}>
            <Text style={styles.quickLoginText}>快捷登录</Text>
        </TouchableOpacity>
    }

    navigateToShortLoginView() {
        this.props.navigation.navigate('ShortLoginView');
    }

    forgetPasswordAction() {
        this.props.navigation.navigate('EditPassword');
    }

    changePhone(text) {
        this.setState({
            phone: text
        })
    }

    changePassword(text) {
        this.setState({
            password: text
        })
    }

    loginAction() {
        const params = {
            username: this.state.phone || 'admin',
            passwd: this.state.password || '123456',
            callback: this.loginActionCallback.bind(this)
        }
        loginWithPasswordAction(params);
    }

    loginActionCallback(res) {
        console.log('res', res);
        if (res.success) {
            global.isLogin = true
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskReload');
        }
    }

    wxLogin() {
        WeChat.isWXAppInstalled().then((res) => {
            if (res) {
                WeChat.sendAuthRequest("snsapi_userinfo").then((response) => {
                    console.log('login', response);
                    const { code } = response;
                    getWxLogin({
                        id: code,
                        callback: this.getWxLoginCallback.bind(this)
                    })
                    // const path = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${E.WECHAT_APP_ID}&secret=${E.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
                    // fetch(path).then(response => {
                    //     return response.json();
                    // }).then(res => {
                    //     console.log('res', res);

                    // })
                }).catch((err) => {
                    console.log('error', err);
                });
            }
        })
    }

    getWxLoginCallback(res) {
        console.log('res wx', res);
        const { success, data, error } = res;
        if (success) {
            const {
                is_guest
            } = data;
            if (is_guest) {
                // 需要绑定账号
                Toast.info('请先登录账号与微信绑定');
                this.setState({
                    showBind: true
                })
            } else {
                postWxLoginAuth({
                    callback: this.postWxAuthCallback.bind(this),
                    params: {
                        position: '上海',
                        city: '310114',
                        longitude: '121.48',
                        latitude: '31.22',
                    }
                });
            }
        } else {
            Toast.info(error);
        }
    }

    postWxAuthCallback(res) {
        console.log('auth', res);
        const { success } = res;
        if (success) {
            Toast.info('登录成功！');
            global.isLogin = true
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskReload');
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
    },
    forgetView: {
        width: '100%',
        paddingHorizontal: px(40),
        alignItems: 'flex-end',
        marginTop: px(30)
    },
    forgetButton: {
        height: px(80),
        justifyContent: 'center'
    },
    forgetText: {
        color: '#999',
        fontSize: px(30)
    }
})