import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Header, InputItem, InputButtonItem } from '../components';
import { Toast } from '@ant-design/react-native';
import { checkPhone, px } from '../utils';
import { getResetPasswordCode } from '../requests';
import { commonStyles } from '../commonStyles';

export default class EditPassword extends Component {
    constructor(props) {
        super(props);
        const { phone = '' } = props.navigation.state.params || {}
        console.log('editPassword', phone)
        this.state = {
            phone: phone,
            isEdit: phone == null ? true: phone.length < 0,
            code: null,
            password: null,
            repeatPWD: null
        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title="" />
                <Text style={styles.loginAccountText}>更改或添加密码</Text>
                <Text style={styles.loginText}></Text>
                <InputItem editable={this.state.isEdit}  keyboardType="number-pad" changeText={this.changePhone.bind(this)} value={this.state.phone} placeholder="请输入手机号" />
                <InputButtonItem type={"reset"} phone={this.state.phone} changeText={this.changeSmsCode.bind(this)} value={this.state.smsCode} placeholder="请输入验证码" />
                <InputItem secureTextEntry={true} changeText={this.changePWD.bind(this)} value={this.state.password} placeholder="请输入密码" />
                <InputItem secureTextEntry={true} changeText={this.changeRepeatPWD.bind(this)} value={this.state.repeatPWD} placeholder="请再次输入密码" />
                <TouchableOpacity style={styles.confirmButton} onPress={this.savePassword.bind(this)}>
                    <Text style={styles.confirmButtonText}>确认</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    changePhone(text) {
        this.setState({
            phone: text
        })
    }
    changeSmsCode(text) {
        this.setState({
            code: text
        })
    }

    changePWD(text) {
        this.setState({
            password: text
        })
    }

    changeRepeatPWD(text) {
        this.setState({
            repeatPWD: text
        })
    }

    savePassword() {
        if (this.state.phone == null || checkPhone(this.state.phone)) {
            Toast.info('请输入正确手机号');
            return;
        }

        if (this.state.code == null) {
            Toast.info('请输入验证码');
            return;
        }

        if (this.state.password == null || this.state.repeatPWD == null || this.state.password != this.state.repeatPWD ) {
            Toast.info('请输入正确的密码');
            return;
        }

        const params = {
            phone: this.state.phone,
            smsCode: this.state.code,
            passwd: this.state.password
        }

        // getResetPasswordCode
        getResetPasswordCode({
            params: params,
            callback: this.changePwdCallback.bind(this)
        })
    }

    changePwdCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('修改密码成功！');
            this.props.navigation.goBack();
        } else {
            Toast.info(error);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    confirmButton: {
        height: px(120),
        marginTop: px(60),
        marginHorizontal: px(40),
        borderRadius: px(20),
        backgroundColor: '#ED7539',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmButtonText: {
        fontSize: px(34),
        color: '#fff'
    },
    loginAccountText: {
        marginTop: px(90),
        marginLeft: px(40),
        fontSize: px(46),
        color: '#333'
    },
    loginText: {

    }
})