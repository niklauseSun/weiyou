import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class Header extends Component {
    render() {
        const { title = "Header", leftIsBack = true, leftComponent = null, rightComponent = null, titleStyle } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.left}>
                    {leftIsBack ? <TouchableOpacity onPress={this.goBack.bind(this)} activeOpacity={1} style={styles.back}>
                        <Image source={ASSET_IMAGES.ICON_BACK} />
                    </TouchableOpacity>: leftComponent }
                </View>
                <View style={styles.title}><Text numberOfLines={1} style={[styles.titleText, titleStyle]}>{title}</Text></View>
                <View style={styles.right}>
                    {rightComponent}
                </View>
            </View>
        )
    }

    goBack() {
        if (this.props.navigation) {
            this.props.navigation.goBack()
        }
    }
}


const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: px(90),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: px(1)
    },
    title: {
        flex: 1,
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        fontSize: px(34)
    },
    back: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        marginLeft: px(30)
    },
    left: {
        width: px(160),
        height: px(80),
        justifyContent: 'center'
    },
    right: {
        width: px(160),
        alignItems: 'flex-end'
    },
    save: {
        width: px(80),
        backgroundColor: 'yellow',
        marginRight: px(30)
    },
})