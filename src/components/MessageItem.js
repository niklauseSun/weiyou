import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, Image, DeviceEventEmitter } from 'react-native'
import { ASSET_IMAGES } from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { px, formatHourWithString } from '../utils'
import { setMessageRead } from '../requests'

export default class MessageItem extends Component {
    render() {
        console.log('MessageItem', this.props.data)
        const { data } = this.props;
        const { content, create_time, nickname, avatar = '', readed } = data;
        return (
            <View style={styles.messageItem}>
                <View style={styles.timeLine}>
                    <View style={styles.timeView}>
                        <Text style={styles.timeLabel}>{formatHourWithString(create_time)}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: px(120)}}>
                            { avatar == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} /> :<Image style={styles.headImage} source={{uri: avatar}} /> }
                            <Text style={styles.contentTitle}>好友{nickname}的消息</Text>
                            {readed == 0 ? <View style={styles.unReadView}>
                                <Text style={styles.unReadText}>未读</Text>
                            </View>: null }
                        </View>
                        <Text style={styles.contentLabel}>{content}</Text>
                    </View>
                    <TouchableOpacity onPress={this.navigateMessageDetail.bind(this)} style={styles.detail}>
                        <Text style={styles.detailTitle}>详情</Text>
                        <Image style={styles.detailIcon} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    navigateMessageDetail() {
        const { id } = this.props.data || {};
        this.props.navigation.navigate('MessageDetail', {
            id: id
        });
    }
}

const styles = StyleSheet.create({
    messageItem: {
        height: px(438),
    },
    timeLine: {
        alignItems: 'center'
    },
    headImage: {
        width: px(80),
        height: px(80),
        marginLeft: px(30),
        borderRadius: px(40)
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
    },
    unReadView: {
        backgroundColor: '#26BB7A',
        paddingHorizontal: px(6),
        paddingVertical: px(3),
        borderRadius: px(6)
    },
    unReadText: {
        fontSize: px(22),
        color: '#fff'
    }
})