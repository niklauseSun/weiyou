import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { px } from '../utils';

export default class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = '我是名字呢', subTitle = '无', editable = false } = this.props;
        return (
            <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                <TextInput onChangeText={this.changeValue.bind(this)} editable={editable} style={styles.input} value={subTitle} />
            </View>
        )
    }

    changeValue(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(90),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1)
    },
    title: {
        color: '#999',
        width: px(150)
    },
    input: {
        flex: 1,
        textAlign: 'right'
    }
})