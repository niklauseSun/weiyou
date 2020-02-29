import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px } from '../utils';

export default class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = '拥有特权'} = this.props;
        return (
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(120),
        paddingHorizontal: px(30),
        justifyContent: 'center'
    },
    title: {
        fontSize: px(28)
    }
})