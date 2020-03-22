import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class PayViews extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { selectIndex = 0 } = this.props;
        return (
            <View style={styles.content}>
                <Text style={styles.title}>支付方式</Text>
                <TouchableOpacity style={styles.payItem}>
                    {/* <Image /> */}
                    {/* <View style={styles.headImage} /> */}
                    <Image source={ASSET_IMAGES.ICON_WX_ICON} style={styles.headImage} />
                    <View style={styles.nameView}>
                        <Text style={styles.nameLabel}>微信支付</Text>
                        <Text style={styles.subTitle}>推荐已安装微信钱包的用户使用</Text>
                    </View>
                    {selectIndex === 0 ? <Image style={styles.selectImage} source={ASSET_IMAGES.ICON_SIGN_ITEM_SELECT} />: <Image style={styles.selectImage} source={ASSET_IMAGES.ICON_SIGN_ITEM_UNSELECT} />}
                </TouchableOpacity>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: px(30),
        backgroundColor: '#fff',
        paddingVertical: px(30)
    },
    title: {
        fontSize: px(30),
        color: '#666',
        marginBottom: px(30)
    },
    payItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: px(20)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        marginRight: px(20)
    },
    nameView: {
        flex: 1
    },
    nameLabel: {
        fontSize: px(28),
        color: '#333'
    },
    subTitle: {
        fontSize: px(24),
        color: '#999',
        marginTop: px(15)
    },
    selectImage: {
        height: px(50),
        width: px(50)
    }
})