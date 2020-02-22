import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Header, InputItem, LoginButton } from '../components';
import { px } from '../utils';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header title="" navigation={this.props.navigation} />
                <Text style={styles.loginAccountText}>忘记密码</Text>
                <Text style={styles.loginText}>请输入您注册的手机号</Text>
                <InputItem keyboardType="number-pad" placeholder="请输入手机号码" />
                <LoginButton title="忘记密码" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
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