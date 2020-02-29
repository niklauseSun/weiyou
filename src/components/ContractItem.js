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
        const { nickname = 'Alone', detail = '“阅读”在02.10 09:30 完成打卡', avatar } = this.props.data;
        return (
            <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.content}>
                {avatar == '' ? <View style={styles.headImage} />: <Image style={styles.headImage} source={{ uri: avatar }} />}
                <Text style={styles.nameLabel}>{nickname}</Text>
                <Text style={styles.detailLabel}>正常</Text>
            </TouchableOpacity>
        )
    }

    navigate() {
        console.log('contact item', this.props.data);
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
        marginLeft: px(20),
        fontSize: px(34),
        flex: 1
    },
    detailLabel: {
        // color: '#999',
        fontSize: px(24),
        color: 'green'
    }
})