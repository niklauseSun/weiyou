import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';

export default class Sign extends Component {
    render() {
        const {
            imageUrl = null,
            isSelect = true,
            title = "早起",
            subTitle = "已打开1天"
        } = this.props.data || {};
        return (
            <View style={styles.content}>
                <View style={styles.head}>
                    {imageUrl == null ? null : <Image source={styles.headImage} source={{ uri: imageUrl }} /> }
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleLabel}>title</Text>
                    <Text style={styles.subTitleLabel}>subTitle</Text>
                </View>
                <TouchableOpacity style={styles.btnView}>
                    {
                        isSelect ? <Image source={ASSET_IMAGES.ICON_SIGN_ITEM_SELECT} /> : <Image source={ASSET_IMAGES.ICON_SIGN_ITEM_UNSELECT} />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        marginRight: px(30),
        marginLeft: px(30),
        backgroundColor: 'red',
        height: px(155),
        borderRadius: px(16),
        flexDirection: 'row',
        alignItems: 'center'
    },
    head: {
        width: px(106),
        height: px(106),
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px(30)
    },
    headImage: {
        height: px(100),
        width: px(100),
        borderRadius: px(50)
    },
    titleView: {
        marginLeft: px(20),
        backgroundColor: '#fff',
        flex: 1
    },
    titleLabel: {
        color: '#F37A3E',
        fontSize: px(36),
        lineHeight: px(36)
    },
    subTitleLabel: {
        marginTop: px(12),
        color: '#999999',
        fontSize: px(28),
        lineHeight: px(28)
    },
    btnView: {
        height: px(80),
        width: px(80),
        marginRight: px(30),
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    }
})