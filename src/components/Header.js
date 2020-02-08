import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class Header extends Component {
    render() {
        const { title = "Header", leftIsBack = true, leftComponent = null, rightComponent = null } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.left}>
                    { leftIsBack ? <TouchableOpacity activeOpacity={1} style={styles.back}>
                        <Text>返回</Text>
                    </TouchableOpacity>: leftComponent }
                </View>
                <View style={styles.title}><Text style={styles.titleText}>{title}</Text></View>
                <View style={styles.right}>
                    {rightComponent}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: px(90),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: px(1)
    },
    title: {
        flex: 1,
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        fontSize: px(34)
    },
    back: {
        width: px(80),
        backgroundColor: 'blue',
        marginLeft: px(30)
    },
    left: {
        width: px(160),
        backgroundColor: 'yellow',
    },
    right: {
        width: px(160),
        alignItems: 'flex-end'
    },
    save: {
        width: px(80),
        backgroundColor: 'yellow',
        marginRight: px(30)
    },
})