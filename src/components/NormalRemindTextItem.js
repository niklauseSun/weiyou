import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Keyboard } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';
import { TextInput } from 'react-native-gesture-handler';

export default class NormalRemindTextItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            title="开始提示音",
            placeholder = '请输入开始提示音',
            value = null
        } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={ASSET_IMAGES.ICON_SPECIAL_QUESTION} />
                <Text style={styles.title}>{title}</Text>
                <TextInput value={value} onChangeText={this.changeText.bind(this)} style={styles.textInput} placeholder={placeholder} />
            </View>
        )
    }

    changeText(text) {
        const { onChangeText, type } = this.props;
        if (onChangeText) {
            onChangeText(type, text);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        marginHorizontal: px(20),
        height: px(120),
        alignItems: 'center',
      },
      headImage: {
        width: px(44),
        height: px(44),
        marginRight: px(20)
      },
      title: {
        fontSize: px(32),
        color: '#666'
      },
      textInput: {
        textAlign: 'right',
        flex: 1
      }
})