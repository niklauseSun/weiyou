import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, LayoutAnimation } from 'react-native'
import { px } from '../utils';

export default class InputItem extends Component {
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
            value,
            keyboardType = null,
            secureTextEntry
        } = this.props;
        return (
            <View style={styles.content}>
                <TextInput
                    style={[styles.textInput,onFocus ? styles.focusStyle : styles.unFocusStyle]}
                    placeholder={placeholder}
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    // placeholderTextColor={"#B9B9B9"}
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
        height: px(90)
    }
})