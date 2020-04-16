import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, LayoutAnimation, TouchableOpacity, ToastAndroid } from 'react-native'
import { px, checkPhone } from '../utils';
import { Toast } from '@ant-design/react-native'
import { getIdentifyCode, getEditCode } from '../requests';

export default class InputButtonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,
            codeNum: 60,
            sendCode: false
        }
    }

    render() {
        const {
            onFocus
        } = this.state;
        const {
            placeholder,
            value
        } = this.props;
        return (
            <View style={styles.content}>
                <TextInput
                    style={[styles.textInput, onFocus ? styles.focusStyle : styles.unFocusStyle]}
                    placeholder={placeholder}
                    value={value}
                    keyboardType="number-pad"
                    placeholderTextColor={"#B9B9B9"}
                    onChangeText={this.onChangeText.bind(this)}
                    onFocus={(e) => {
                        this.setState({
                            onFocus: true
                        })
                        LayoutAnimation.easeInEaseOut();
                    }}
                    onBlur={(e) => {
                        this.setState({
                            onFocus: false
                        })
                        LayoutAnimation.easeInEaseOut();
                    }}
                />
                <TouchableOpacity disabled={this.state.sendCode} onPress={this.sendCode.bind(this)} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>{this.state.sendCode ? `${this.state.codeNum}秒`: "发送验证码"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onChangeText(text) {
        const {
            changeText = null
        } = this.props;
        if (changeText == null) return;
        changeText(text);
    }

    // getIdentifyCode
    // getEditCode
    sendCode() {
        if (this.props.phone == null || checkPhone(this.props.phone)) {
            Toast.info('请输入正确的手机号');
            return;
        }

        const { type = 'login' } = this.props;
        if (type == 'login') {
            getIdentifyCode({
                phone: this.props.phone,
                callback: this.getCodeCallback.bind(this)
            })
        } else {
            getEditCode({
                phone: this.props.phone,
                callback: this.getCodeCallback.bind(this)
            })
        }


        this.setState({
            sendCode: true
        })
        this.timer = setInterval(() => {
            if (this.state.codeNum < 0) {
                this.setState({
                    sendCode:false,
                    codeNum: 60
                })
            } else {
                this.setState({
                    codeNum: this.state.codeNum - 1
                })
            }
        }, 1000);
    }

    getCodeCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('验证码发送成功');
        } else {
            Toast.info(error);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}


const styles = StyleSheet.create({
    content: {
        paddingHorizontal: px(40),
        marginTop: px(20)
    },
    unFocusStyle: {
        borderBottomWidth: px(1),
        borderBottomColor: '#eaeaea'
    },
    focusStyle: {
        borderBottomWidth: px(1),
        borderBottomColor: '#ED7539'
    },
    textInput: {
        height: px(90),
        color: '#000'
    },
    sendButton: {
        position: "absolute",
        right: px(36),
        width: px(220),
        height: px(76),
        borderRadius: px(38),
        borderWidth: px(1),
        borderColor: '#ED7539',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonText: {
        fontSize: px(30),
        color: '#ED7539'
    }
})