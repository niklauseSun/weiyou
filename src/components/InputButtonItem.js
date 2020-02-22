import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, LayoutAnimation, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class InputButtonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false
        }
    }

    render() {
        const {
            onFocus
        } = this.state;
        const {
            placeholder,
            value
        } = this.props;
        return (
            <View style={styles.content}>
                <TextInput
                    style={[styles.textInput, onFocus ? styles.focusStyle : styles.unFocusStyle]}
                    placeholder={placeholder}
                    value={value}
                    keyboardType="number-pad"
                    placeholderTextColor={"#B9B9B9"}
                    onChangeText={this.onChangeText.bind(this)}
                    onFocus={(e) => {
                        this.setState({
                            onFocus: true
                        })
                        LayoutAnimation.easeInEaseOut();
                    }}
                    onBlur={(e) => {
                        this.setState({
                            onFocus: false
                        })
                        LayoutAnimation.easeInEaseOut();
                    }}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>发送验证码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onChangeText(text) {
        const {
            changeText = null
        } = this.props;
        if (changeText == null) return;
        changeText(text);
    }

    sendAction() {
        
    }
}


const styles = StyleSheet.create({
    content: {
        paddingHorizontal: px(40),
        marginTop: px(20)
    },
    unFocusStyle: {
        borderBottomWidth: px(1),
        borderBottomColor: '#eaeaea'
    },
    focusStyle: {
        borderBottomWidth: px(1),
        borderBottomColor: '#ED7539'
    },
    textInput: {
        height: px(90),
        color: '#000'
    },
    sendButton: {
        position: "absolute",
        right: px(36),
        width: px(220),
        height: px(76),
        borderRadius: px(38),
        borderWidth: px(1),
        borderColor: '#ED7539',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonText: {
        fontSize: px(30),
        color: '#ED7539'
    }
})