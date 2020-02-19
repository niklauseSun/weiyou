import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class NormalRepeatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headImage}></View>
                <Text style={styles.title}>test</Text>
                <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.subTitle}>subTitle</Text>
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
        height: px(170),
        alignItems: 'center'
    },
    headImage: {
        width: px(44),
        height: px(44),
        marginRight: px(20)
    },
    title: {
        flex: 1
    },
    selectButton: {
        width: px(200),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    subTitle: {
        flex: 1,
        textAlign: 'right',
        marginRight: px(20)
    }
})