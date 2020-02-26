import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class AddImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            style,
            imageUrl = null
        } = this.props;
        return (
            <View style={[styles.content, style]}>
                <TouchableOpacity activeOpacity={0.9} style={styles.deleteButton}>
                    <Image style={styles.deleteIcon} source={ASSET_IMAGES.ICON_IMAGE_DELETE} />
                </TouchableOpacity>
                {imageUrl == null ? null :<Image source={{ uri: imageUrl}} style={styles.headImage} />}
            </View>
        )
    }

    deleteAction() {
        const { removeAction } = this.props;
        if (removeAction) {
            removeAction();
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(160),
        width: px(160),
        backgroundColor: 'blue',
        justifyContent: 'flex-end',
        marginRight: px(30),
        borderRadius: px(10)
    },
    deleteButton: {
        height: px(30),
        width: px(30),
        position: 'absolute',
        right:px(12),
        top: px(2),
        zIndex: 100
    },
    deleteIcon: {
        height: px(40),
        width: px(40),
    },
    headImage: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        justifyContent: 'flex-end'
    }
})