import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class SpecialRepeatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            repeatDetail = '重复4次无应答，通知联络人',
            signDetail = '间隔4分钟'
        } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.itemContent}>
                    <Image style={styles.itemHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_REPEAT} />
                    <Text style={styles.itemHeadLabel}>重复</Text>
                    
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.itemSubLabel}>{repeatDetail}</Text>
                        <Image style={styles.iconStyle} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContent}>
                    <Image style={styles.itemHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_SIGN} />
                    <Text style={styles.itemHeadLabel}>推送安全确认</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.itemSubLabel}>{signDetail}</Text>
                        <Image style={styles.iconStyle} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(264),
        backgroundColor: '#fff',
        marginTop: px(20),
        marginLeft: px(20),
        marginRight: px(20),
        borderRadius: px(10),
        paddingHorizontal: px(30)
    },
    itemContent: {
        height: px(132),
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemHeadImage: {
        width: px(44),
        height: px(44),
    },
    itemHeadLabel: {
        marginLeft: px(30),
        fontSize: px(26),
        color: '#474342'
    },
    itemSubLabel:{
        flex: 1,
        textAlign: 'right',
        color: '#474342',
        fontSize: px(26),
        marginRight: px(20)
    },
    moreButton:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})