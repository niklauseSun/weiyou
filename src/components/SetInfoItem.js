import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class SetInfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = "", imageUrl = null } = this.props
        return (
            <View style={styles.content}>
                {
                    imageUrl == null ? null: <Image style={styles.icon} source={imageUrl} />
                }
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <Image style={styles.moreButtonIcon} source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        paddingHorizontal: px(40),
        flexDirection: 'row',
        height: px(90),
        alignItems: 'center',
        marginTop: px(20)
    },
    icon: {
        width: px(70),
        height: px(70),
        marginRight: px(20)
    },
    title: {
        fontSize: px(32),
        color: '#333',
        flex: 1
    },
    moreButton: {
        height: '100%',
        width: px(100),
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})