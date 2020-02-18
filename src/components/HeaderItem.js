import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class HeaderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = "联系人" } = this.props;
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this.onLeftAction.bind(this)} style={styles.leftButton}>
                    <Image source={ASSET_IMAGES.ICON_ADD_FRIEND} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.leftButton}>
                    <Image source={ASSET_IMAGES.ICON_CODE_IMAGE} />
                </TouchableOpacity>
            </View>
        )
    }

    onLeftAction() {
        const { leftAction = null } = this.props;
        if (leftAction) {
            leftAction()
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
        borderBottomWidth: px(1),
        paddingHorizontal: px(10)
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: px(34)
    },
    leftButton: {
        width: px(90),
        height: px(90),
        alignItems: 'center',
        justifyContent: 'center'
    }
})