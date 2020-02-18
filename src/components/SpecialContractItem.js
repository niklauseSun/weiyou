import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class SpecialContractItem extends Component {
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
                <View style={styles.contracts}>

                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <Image style={styles.more} source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(20),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(44),
        height: px(44)
    },
    title: {
        marginLeft: px(20),
        fontSize: px(26),
        color: '#363641'
    },
    contracts:{
        flex: 1
    },
    moreButton: {
        width: px(60),
        height: px(90),
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})