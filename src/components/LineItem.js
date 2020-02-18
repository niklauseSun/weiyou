import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px } from '../utils';

export default class LineItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.lineContent}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContent: {
        height: px(1),
        width: '100%',
        backgroundColor: '#eaeaea'
    }
})