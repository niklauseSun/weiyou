import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { placeholder = "搜索手机号/昵称", value } = this.props;
        return (
            <View style={styles.content}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={value}
                    style={styles.textInput}
                    returnKeyType="search"
                    onChangeText={this.onChangeText.bind(this)}
                    onSubmitEditing={this.keyPress.bind(this)}
                />
            </View>
        )
    }

    keyPress() {
        const { searchAction } = this.props;
        if (searchAction) {
            searchAction();
        }
    }

    onChangeText(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(60),
        paddingHorizontal: px(30),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: px(30)
    },
    textInput: {
        backgroundColor: '#eaeaea',
        width: '100%',
        borderRadius: px(6),
        paddingHorizontal: px(20),
        paddingVertical: px(10)
    }
})