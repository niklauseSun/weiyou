import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, SetDetailItem } from '../components';
import { px } from '../utils';
import { getLoginInfo, logoutAction } from '../requests';
import JPush from 'jpush-react-native';
import { Toast } from '@ant-design/react-native';

export default class SettingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    componentDidMount() {
        this.loadPersonalInfo();
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <Header navigation={this.props.navigation} title="设置" />
                <View style={styles.content}>
                    <SetDetailItem />
                    {this.state.isLogin ? <TouchableOpacity onPress={this.logout.bind(this)} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>退出登录</Text>
                </TouchableOpacity>: null }
                </View>
            </SafeAreaView>
        )
    }


    loadPersonalInfo() {
        // getLoginInfo
        const callback = this.loadPersonalInfoCallback.bind(this)
        getLoginInfo({ callback });
    }

    loadPersonalInfoCallback(res) {
        const { success, data, vip_id } = res;
        if (success) {
            const { id } = data;
            this.setState({
                isLogin: true,
                id
            })
        }
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
            DeviceEventEmitter.emit('reloadLogin');
            DeviceEventEmitter.emit('taskListReload');
            this.setState({
                isLogin: false
            })
            this.props.navigation.goBack();
        }
    }

    deleteAlias(id) {
        JPush.deleteAlias(alias);
        const params = 'user' + id;
        const alias = {"sequence":1,"alias":params}
    }
}

// #ED7539

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#eaeaea',
        paddingTop: px(30)
    },
    logoutButton: {
        marginHorizontal: px(60),
        height: px(80),
        backgroundColor: '#bfbfbf',
        marginTop: px(60),
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: px(26)
    }
})