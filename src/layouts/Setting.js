import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, MyDetailItem, AccountView } from '../components'
import SetInfoItem from '../components/SetInfoItem'
import { ASSET_IMAGES } from '../config';
import { getLoginInfo, logoutAction, addUserPushInfo } from '../requests';
import { px, initAliyunOSS } from '../utils';
import { Toast } from '@ant-design/react-native';
import JPush from 'jpush-react-native';

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
            score: 0,
            vip_id: 0,
            vip_expire: null,
            message_cnt: 0
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
                    navigation={this.props.navigation}
                    avatar={this.state.avatar}
                    nickname={this.state.nickname}
                    status={this.state.status}
                    isLogin={this.state.isLogin}
                    isVip={this.state.vip_id > 0}
                    score={this.state.score}
                    id={this.state.id}
                    message_cnt={this.state.message_cnt}
                    vip_expire={this.state.vip_expire}
                    loginAction={this.loginAction.bind(this)} />
                {/* <AccountView enterAccount={this._enterAccount.bind(this)} score={this.state.score} /> */}
                {/* <SetInfoItem setItemAction={this.navigateSettingDetail.bind(this)} imageUrl={ASSET_IMAGES.ICON_ABOUT_US} title={"关于我们"} /> */}
                {/* <SetInfoItem setItemAction={this.navigateQuestionReport.bind(this)} imageUrl={ASSET_IMAGES.ICON_OPINION} title={"意见反馈"} /> */}
                {/* <SetInfoItem setItemAction={this.navigateEmergencyList.bind(this)} imageUrl={ASSET_IMAGES.ICON_EMERGENCY} title={"幸福寄语"} /> */}
                {/* <SetInfoItem imageUrl={ASSET_IMAGES.ICON_EVALUATION} title={"评价鼓励"} /> */}
                {/* <SetInfoItem imageUrl={ASSET_IMAGES.ICON_RECOMMEND} title={"推荐给好友"} /> */}
                {/* {this.state.isLogin ? <TouchableOpacity onPress={this.logout.bind(this)} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>退出登录</Text>
                </TouchableOpacity>: null } */}

                {/* <TouchableOpacity onPress={this.testOss.bind(this)}>
                    <Text>测试OSS</Text>
                </TouchableOpacity> */}
            </SafeAreaView>
        );
    }

    // action
    navigateSettingDetail() {
        this.props.navigation.navigate('SettingDetail');
    }

    navigateQuestionReport() {
        this.props.navigation.navigate('QuestionReport');
    }

    navigateEmergencyList() {
        this.props.navigation.navigate('EmergencyList')
    }

    _enterAccount() {
        this.props.navigation.navigate('AccountView', {
            id: this.state.id,
            score: this.state.score
        })
    }

    loginAction() {
        this.props.navigation.navigate('LoginView')
    }

    logout() {
        // logoutAction
        logoutAction({ callback: this.logoutCallback.bind(this)});
    }

    logoutCallback(res) {
        const { success } = res;
        if (success) {
            Toast.info('已退出')
            this.deleteAlias(this.state.id);
            DeviceEventEmitter.emit('taskReload');
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
        const { success, data, vip_id } = res;
        if (success) {
            const { avatar, id, nickname, sex, status, score, vip_expire, vip_id, message_cnt, username } = data;
            this.setState({
                avatar: avatar,
                id: id,
                nickname: nickname,
                sex: sex,
                status: status,
                isLogin: true,
                score: score,
                vip_id: vip_id,
                vip_expire: vip_expire,
                message_cnt: message_cnt
            })

            if (!data.password) {
                this.props.navigation.navigate('EditPassword', {
                    phone: username
                });
            }
        } else {
            this.setState({
                isLogin: false
            })
        }
    }

    deleteAlias(id) {
        JPush.deleteAlias(alias);
        const params = 'user' + id;
        const alias = {"sequence":1,"alias":params}
    }

    addPushCallback(res) {

    }

    testOss() {
        initAliyunOSS();
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