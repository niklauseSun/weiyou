import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class NormalContractItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={ASSET_IMAGES.ICON_SPECIAL_CONTRACT} />
                <Text style={styles.title}>通知联系人</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <Image source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        marginHorizontal: px(20),
        height: px(120),
        alignItems: 'center'
    },
    headImage: {
        width: px(44),
        height: px(44),
        marginRight: px(20)
    },
    moreButton: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})