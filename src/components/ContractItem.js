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
        const { name = 'Alone', detail = '“阅读”在02.10 09:30 完成打卡' } = this.props.data;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_LOGIN} />
                <Text style={styles.nameLabel}>{name}</Text>
                <Text style={styles.detailLabel}>{detail}</Text>
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
        borderRadius: px(45)
    },
    nameLabel: {
        width: px(160),
        marginLeft: px(20),
        fontSize: px(34)
    },
    detailLabel: {
        color: '#999',
        fontSize: px(24)
    }
})