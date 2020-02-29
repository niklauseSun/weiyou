import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { px } from '../utils';

export default class RuleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageUrl = '', title = 'test', subTitle = 'dddd' } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <View style={styles.contentDetail}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(163),
        marginHorizontal: px(40),
        backgroundColor: '#fff',
        marginBottom: px(30),
        borderRadius: px(30),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        marginRight: px(30),
        width: px(90),
        height: px(90)
    },
    title: {
        fontSize: px(36),
        color: '#353839'
    },
    subTitle: {
        fontSize: px(24),
        color: '#8C9192',
        marginTop: px(20)
    }
})