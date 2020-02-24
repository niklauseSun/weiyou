import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px } from '../utils';

export default class EndComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>--我也是有底线的--</Text>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(120),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: px(28),
        color:'#999'
    }
})