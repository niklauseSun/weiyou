import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class ContactListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { nickname, avatar } = this.props.data;
        return (
            <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.content}>
                {
                    avatar == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />:
                    <Image style={styles.headImage} source={{ uri: avatar }} />
                }
                <Text style={styles.name}>{nickname}</Text>
                <Text style={styles.status}>正常</Text>
            </TouchableOpacity>
        )
    }

    navigate() {
        this.props.navigation.navigate('ContactDetail', {
            id: this.props.data.id
        })
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        paddingVertical: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45)
    },
    name: {
        flex: 1,
        marginLeft: px(30),
        fontSize: px(30)
    },
    status: {
        color: 'green'
    }
})