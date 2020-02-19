import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class NoneData extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = "暂无任务" } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.noneImage} source={ASSET_IMAGES.ICON_NONE} />
                <Text style={styles.noneTitle}>暂无任务</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noneImage: {
        // width: px(200),
        // height: px(200)
    },
    noneTitle: {
        color: '#999'
    }
})