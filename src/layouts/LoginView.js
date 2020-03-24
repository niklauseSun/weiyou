import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, DeviceEventEmitter, Image } from 'react-native'
import { Header, InputItem, LoginButton } from '../components'
import { px, initAliyunOSS } from '../utils';
import { loginWithPasswordAction, getWxLogin, postWxLoginAuth, getOssToken, addUserPushInfo } from '../requests';
import * as WeChat from 'react-native-wechat';
import { E, ASSET_IMAGES } from '../config';
import { Toast } from '@ant-design/react-native';
import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";
import JPush from 'jpush-react-native';
// import AliyunOSS from 'aliyun-oss-react-native'

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            password: null,
            showBind: false,
            position: '',
            longitude: '',
            latitude: '',
            city: ''
        }
    }

    componentDidMount() {
        setLocatingWithReGeocode(false);
        Geolocation.getCurrentPosition(({ coords, location }) => {
            const { latitude, longitude } = coords;
            console.log('lat', coords, location)

            const url = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${E.WEB_KEY}&radius=1000&extensions=all&poitype=`
            let opts = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": 'application/json;charset=utf-8',
                    "Connection": "keep-alive"
                },
                timeout: 60 * 1000,
            }

            fetch(url, opts).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((res) => {
                console.log('res', res);
                const { regeocode } = res;
                const { pois, formatted_address, addressComponent } = regeocode;
                const { adcode } = addressComponent;
                const { location } = pois[0];
                // const retAddress = `${province}${district}${township}${address}${name}`;
                const retCityCode = `${adcode}`;
                const retLatitude = location.split(',')[1];
                const retLongitude = location.split(',')[0]
                this.setState({
                    position: formatted_address,
                    longitude: retLongitude,
                    latitude: retLatitude,
                    city: retCityCode
                })
            }).catch(err => {
                console.log('err', err);
            })
        });
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
                    <InputItem secureTextEntry={true} value={this.state.password} changeText={this.changePassword.bind(this)} placeholder={"请输入密码"} />
                    <LoginButton buttonAction={this.loginAction.bind(this)} title="登录" />
                    <View style={styles.forgetView}>
                        <TouchableOpacity style={styles.forgetButton} onPress={this.forgetPasswordAction.bind(this)}>
                            <Text style={styles.forgetText}>忘记密码？</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wxView}>
                        <TouchableOpacity onPress={this.wxLogin.bind(this)}>
                        <Image style={styles.wxIcon} source={ASSET_IMAGES.ICON_WX_ICON} />
                        </TouchableOpacity>
                    </View>
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
        this.props.navigation.navigate('EditPassword', {
            phone: this.state.phone
        });
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
        console.log('res login', res);
        if (res.success) {
            global.isLogin = true
            const { data } = res;
            const { id } = data;
            this.updateAlias(id);
            this.props.navigation.goBack();
            initAliyunOSS();
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskReload');
        } else {
            Toast.info(res.error);
        }
    }

    updateAlias(id) {
        console.log('update', id);
        const params = 'user' + id;
        const alias = {"sequence":1,"alias":params}
        addUserPushInfo({
            id: params,
            callback: this.addPushCallback.bind(this)
        })
        JPush.setAlias(alias)
    }

    addPushCallback(res) {

    }

    wxLogin() {
        WeChat.isWXAppInstalled().then((res) => {
            console.log('isLogin');
            if (res) {
                WeChat.sendAuthRequest("snsapi_userinfo").then((response) => {
                    console.log('login', response);
                    const { code } = response;
                    getWxLogin({
                        id: code,
                        callback: this.getWxLoginCallback.bind(this)
                    })
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
                        position: this.state.position || '上海市',
                        city: this.state.city || '上海',
                        longitude: this.state.longitude || '',
                        latitude: this.state.latitude || '',
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
            const { data } = res;
            const { id } = data;
            this.updateAlias(id);
            initAliyunOSS();
            global.isLogin = true
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskReload');
            this.props.navigation.goBack();
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
    },
    wxView: {
        height: px(160),
        width: '100%',
        alignItems: 'center'
    },
    wxIcon: {
        height: px(120),
        width: px(120)
    }
})