import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class SlectContactItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: false
        }
    }

    render() {
//         id: 24
// friend_id: 121
// remark_name: null
// username: "18301709959"
// nickname: "孙玉建🍁"
// avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erKay7VOFxBXRpRxyZf
        const { data, selectIndexArray =[] } = this.props;
        const { id, nickname, avatar = '' } = data;
        let isSelect = selectIndexArray.indexOf(id) >= 0;
        return (
            <View style={styles.content}>
                { avatar == ''? <View style={styles.headImage} /> :<Image style={styles.headImage} source={{ uri: avatar }} />}
                <Text style={styles.title}>{nickname}</Text>
                <TouchableOpacity onPress={this.changeSelect.bind(this)} style={styles.selectButton}>
                   {isSelect ? <Image style={styles.selectIcon} source={ASSET_IMAGES.ICON_CONTACT_SELECT} />: <Image style={styles.selectIcon} source={ASSET_IMAGES.ICON_CONTACT_UN_SELECT} />}
                </TouchableOpacity>
            </View>
        )
    }

    changeSelect() {
        const { selectIndexArray = [] }= this.props;
        let isSelect = selectIndexArray.indexOf(this.props.data.id)
        let retArray = []
        if (isSelect >= 0) {
            
            retArray = selectIndexArray.filter((item) => item != this.props.data.id)
            
        } else {
            retArray = selectIndexArray;
            retArray.push(this.props.data.id);

        }
        const { onChangeSelect } = this.props;
        if (onChangeSelect) {
            onChangeSelect(retArray);
        }
    }

}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(120),
        backgroundColor: '#eaeaea',
        marginHorizontal: px(30),
        borderRadius: px(10),
        alignItems: 'center',
        paddingHorizontal: px(30),
        flexDirection: 'row',
        marginTop: px(20)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45)
    },
    title: {
        marginLeft: px(30),
        fontSize: px(28),
        flex: 1,
    },
    selectButton: {
        width: px(120),
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    selectIcon: {
        width: px(40),
        height: px(40)
    }
})