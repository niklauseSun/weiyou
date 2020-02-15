import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { InputItem, InputButtonItem, Header, AgreeProtocolItem, LoginButton } from '../components';
import { px } from '../utils';

export default class ShortLoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAgreeSelect: false
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title="" rightComponent={this.rightComponent()} />
                <Text style={styles.loginAccountText}>手机快捷登录</Text>
                <Text style={styles.loginText}>新用户登录将自动注册</Text>
                <InputItem placeholder="请输入手机号" />
                <InputButtonItem placeholder="请输入验证码" />
                <AgreeProtocolItem isSelect={this.state.isAgreeSelect} statusChange={this.selectChange.bind(this)} />
                <LoginButton title="登录"/>
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