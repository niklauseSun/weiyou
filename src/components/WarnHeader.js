import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config'

export default class WarnHeader extends Component {
    render() {
        const name = "<小白>"
        return (
            <View style={styles.content}>
                <Text style={styles.title}>异常</Text>
                <View style={styles.warnView}>
                    <Text style={styles.warnTitle}>提醒</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentFirst}>您的好友</Text>
                    <Text style={styles.contentSecond}>{name}</Text>
                    <Text style={styles.contentThree}>状态异常</Text>
                </View>
                <TouchableOpacity style={styles.moreView}>
                    <Image style={styles.moreIcon} source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F7F7FA',
        marginRight: px(30),
        marginLeft: px(30),
        height: px(113),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: px(12)
    },
    title: {
        marginLeft: px(30),
        fontSize: px(32)
    },
    warnView: {
        backgroundColor: '#e06831',
        padding: px(2),
        borderRadius: px(6)
    },
    warnTitle: {
        fontSize: px(30),
        color: '#fff'
    },
    contentView: {
        marginLeft: px(20),
        flexDirection: 'row',
        flex: 1
    },
    contentFirst: {
        fontSize: px(26)
    },
    contentSecond: {
        fontSize: px(26),
        fontWeight: 'bold'
    },
    contentThree: {
        fontSize: px(26)
    },
    moreView: {
        width: px(80)
    },
    moreIcon: {
        marginLeft: px(30)
    }
})