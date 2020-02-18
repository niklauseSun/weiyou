import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class AccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { score = "0.00" } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.accountView}>
                    <Text style={styles.accountNum}>{score.toFixed(2)}</Text>
                    <Text style={styles.accountText}>我的积分</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.accountButton}>
                    <Text style={styles.accountButtonText}>进入账户</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        height: px(160),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(40)
    },
    accountView: {
        flex: 1
    },
    accountNum: {
        fontSize: px(40),
        fontWeight: 'bold'
    },
    accountText: {
        fontSize: px(26),
        color: '#AAAAAA',
        marginTop: px(20)
    },
    accountButton: {
        width: px(184),
        height: px(60),
        borderRadius: px(30),
        borderWidth: px(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#AAAAAA'
    }
})