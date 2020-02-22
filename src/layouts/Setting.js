import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, MyDetailItem, AccountView } from '../components'
import SetInfoItem from '../components/SetInfoItem'
import { ASSET_IMAGES } from '../config';
import { getLoginInfo, logoutAction } from '../requests';
import { px } from '../utils';
import { Toast } from '@ant-design/react-native';

class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            avatar: null,
            nickname: null,
            sex: null,
            status: null,
            isLogin: false,
            score: 0
        }
    }

    componentDidMount() {
        this.loadPersonalInfo();
        this.listener = DeviceEventEmitter.addListener('reloadLogin', (message) => {
            //收到监听后想做的事情
            this.loadPersonalInfo()
        })
    }

    componentWillUnmount() {
        this.listener = null
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <MyDetailItem
                    avatar={this.state.avatar}
                    nickname={this.state.nickname}
                    status={this.state.status}
                    isLogin={this.state.isLogin}
                    isVip={this.state.status !== 'normal'}
                    loginAction={this.loginAction.bind(this)} />
                <AccountView score={this.state.score} />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_ABOUT_US} title={"关于我们"} />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_OPINION} title={"意见反馈"} />
                {/* <SetInfoItem imageUrl={ASSET_IMAGES.ICON_EVALUATION} title={"评价鼓励"} /> */}
                {/* <SetInfoItem imageUrl={ASSET_IMAGES.ICON_RECOMMEND} title={"推荐给好友"} /> */}
                {this.state.isLogin ? <TouchableOpacity onPress={this.logout.bind(this)} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>退出登录</Text>
                </TouchableOpacity>: null }
            </SafeAreaView>
        );
    }

    // action
    loginAction() {
        this.props.navigation.navigate('LoginView')
    }

    logout() {
        // logoutAction
        logoutAction({ callback: this.logoutCallback.bind(this)});
    }

    logoutCallback(res) {
        console.log('res', res);
        const { success } = res;
        if (success) {
            Toast.info('已退出')
            this.setState({
                isLogin: false,
                score: 0
            })
        }
    }

    loadPersonalInfo() {
        // getLoginInfo
        const callback = this.loadPersonalInfoCallback.bind(this)
        getLoginInfo({ callback });
    }

    loadPersonalInfoCallback(res) {
        console.log('loadPersonalInfo', res);
        const { success, data } = res;
        if (success) {
            const { avatar, id, nickname, sex, status, score } = data;
            this.setState({
                avatar: avatar,
                id: id,
                nickname: nickname,
                sex: sex,
                status: status,
                isLogin: true,
                score: score
            })
        }
    }
}

export default SettingScreen;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoutButton: {
        height: px(120),
        marginHorizontal: px(50),
        backgroundColor: '#ED7539',
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px(60)
    },
    logoutButtonText: {
        fontSize: px(34),
        color: '#fff'
    }
})