import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class NormalNameItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageUrl = null, value = "" } = this.props;
        return (
            <View style={styles.content}>
                {imageUrl == null ? <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_UN_LOGIN} />: <Image source={{ uri: imageUrl }} />}
                {/* <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_UN_LOGIN} /> */}
                <TextInput placeholder="请输入任务名称" onChangeText={this.changeText.bind(this)} value={value} />
            </View>
        );
    }

    changeText(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(140),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        alignItems: 'center',
        marginHorizontal: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        backgroundColor: '#999',
        marginRight: px(20),
        borderRadius: px(45)
    }
})