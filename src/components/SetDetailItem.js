import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px } from '../utils';

export default class SetDetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = 'APP版本', subTitle = 'v1.0.0' } = this.props;
        return (
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(100),
        paddingHorizontal: px(30),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: px(30),
        color: '#333',
        flex: 1
    },
    subTitle: {
        fontSize: px(28),
        color: '#666'
    }
})