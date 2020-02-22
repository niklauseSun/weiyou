import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ASSET_IMAGES } from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { px, formatHourWithString } from '../utils'

export default class MessageItem extends Component {
    render() {
        const { data } = this.props;
        const { content, create_time, nickname } = data;
        return (
            <View style={styles.messageItem}>
                <View style={styles.timeLine}>
                    <View style={styles.timeView}>
                        <Text style={styles.timeLabel}>{formatHourWithString(create_time)}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentView}>
                        <Text style={styles.contentTitle}>好友{nickname}的消息</Text>
                        <Text style={styles.contentLabel}>{content}</Text>
                    </View>
                    <TouchableOpacity style={styles.detail}>
                        <Text style={styles.detailTitle}>详情</Text>
                        <Image style={styles.detailIcon} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    navigateMessageDetail() {
        // const { id } = this.props.data || {};

    }
}

const styles = StyleSheet.create({
    messageItem: {
        height: px(438),
    },
    timeLine: {
        alignItems: 'center'
    },
    timeView: {
        marginTop: px(36),
        width: px(194),
        height: px(50),
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(22)
    },
    content: {
        marginTop: px(34),
        marginLeft: px(30),
        marginRight: px(30),
        backgroundColor: '#fff',
        borderRadius: px(8)
    },
    contentView: {
        height: px(218),
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px(86),
        borderTopWidth: px(1),
        borderTopColor: '#E2E6E8'
    },
    contentTitle: {
        marginLeft: px(27),
        marginRight: px(27),
        marginTop: px(39),
        fontSize: px(34),
        color: '#383C3D'
    },
    contentLabel: {
        marginLeft: px(27),
        marginRight: px(27),
        marginTop: px(36),
        color: '#828A8C'
    },
    detailTitle: {
        flex: 1,
        marginLeft: px(27),
        fontSize: px(30),
        color: '#F87E41'
    },
    detailIcon: {
        marginRight: px(27)
    }
})