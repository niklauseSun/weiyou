import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class ContractItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
//         id: 24
// friend_id: 121
// remark_name: null
// username: "18301709959"
// nickname: "孙玉建🍁"
// avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erKay7VOFxBXRpRxyZfrBI
        const { nickname = 'Alone', detail = '“阅读”在02.10 09:30 完成打卡', avatar } = this.props.data;
        return (
            <View style={styles.content}>
                {avatar == '' ? <View style={styles.headImage} />: <Image style={styles.headImage} source={{ uri: avatar }} />}
                <Text style={styles.nameLabel}>{nickname}</Text>
                {/* <Text style={styles.detailLabel}>{detail}</Text> */}
            </View>
        )
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
        fontSize: px(34)
    },
    detailLabel: {
        color: '#999',
        fontSize: px(24)
    }
})