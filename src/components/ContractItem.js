import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class ContractItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { nickname = 'Alone', detail = '“阅读”在02.10 09:30 完成打卡', avatar, message = {} } = this.props.data;
        const { task, content = '' } = message || {};
        let status = 'success';
        if (task != null) {
            status = task.status;
        }
        return (
            <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.content}>
                {avatar == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />: <Image style={styles.headImage} source={{ uri: avatar }} />}
                <View style={styles.messageContent}>
                    <View style={styles.detail}>
                        <Text style={styles.nameLabel}>{nickname}</Text>
                        <Text style={styles.contentLabel}>{content}</Text>
                    </View>
                    <Text style={status === 'success' ? styles.detailLabel: styles.detailYellow}>{status === 'success' ? '正常': '异常'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    navigate() {
        const { nickname, avatar, message } = this.props.data;
        this.props.navigation.navigate('GuardianMessageList', {
            nickname: nickname,
            avatar,
            messageList: message == null ? []: [message]
        })
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(140),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        backgroundColor: '#999'
    },
    nameLabel: {
        fontSize: px(34),
    },
    detailLabel: {
        // color: '#999',
        fontSize: px(24),
        width: px(120),
        color: 'green',
        marginRight: px(30)
    },
    detailYellow: {
        fontSize: px(24),
        width: px(120),
        color: '#ED7539',
        marginRight: px(30)
    },
    messageContent: {
        flexDirection: 'row'
    },
    detail: {
        flex: 1,
        marginLeft: px(30)
    },
    contentLabel: {
        marginTop: px(10),
        fontSize: px(24),
        color: '#999'
    }
})