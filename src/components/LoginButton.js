import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title } = this.props;
        return (
            <View style={styles.LoginView}>
                <TouchableOpacity onPress={this.actionOfLoginButton.bind(this)} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    actionOfLoginButton() {
        console.log('action')
        const { buttonAction = null } = this.props;
        console.log('bbb', buttonAction);
        if (buttonAction) {
            console.log('fff');
            buttonAction();
        }
    }
}

const styles = StyleSheet.create({
    LoginView: {
        width: '100%',
        height: px(120),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: px(40),
        marginTop: px(80)
    },
    loginButton: {
        backgroundColor: '#ED7539',
        width: '100%',
        height: '100%',
        borderRadius: px(16),
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: px(32),
        color: '#fff'
    },
})