import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { px } from '../utils'

export default class AddEmergencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { placeholder = '测试', maxCount = 20, value="" } = this.props;
        return (
            <View style={styles.content}>
                <TextInput
                    placeholder={placeholder}
                    style={{
                        height: '100%'
                    }}
                    maxLength={maxCount}
                    multiline={true}
                    onChangeText={this.changeText.bind(this)}
                    value={value}
                />
                <Text style={styles.maxLabel}>{`剩余${maxCount - value.length}字`}</Text>
            </View>
        )
    }

    changeText(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        marginHorizontal: px(20),
        height: px(200),
        backgroundColor: '#fff',
        paddingHorizontal: px(20),
        paddingVertical: px(20),
        marginBottom: px(20)
    },
    maxLabel: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: px(18),
        color: '#a0a0a0'
    }
})