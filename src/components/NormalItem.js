import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';

export default class NormalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data } = this.props;
        const { name, clock_time, status, icon = null } = data;
        console.log('normalItem', data)
        const time = this.parseDate(clock_time);
        return (
            <View style={styles.content}>
                <View style={styles.head}>
                    <Image style={styles.headImage} source={{ uri: icon }} />
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleLabel}>{name}</Text>
                    <Text style={styles.subTitleLabel}>{time}提醒</Text>
                </View>
                <TouchableOpacity style={styles.btnView}>
                    {
                        status === 'noYet' ? <Image source={ASSET_IMAGES.ICON_SIGN_ITEM_SELECT} /> : <Image source={ASSET_IMAGES.ICON_SIGN_ITEM_UNSELECT} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    parseDate(dateString) {
        const t = Date.parse(dateString);
        const date = new Date(t);
        console.log('dd', date.getHours());
        return date.getHours() + ':' + date.getMinutes();
    }
}

const styles = StyleSheet.create({
    content: {
        marginRight: px(30),
        marginLeft: px(30),
        backgroundColor: '#f7f6fd',
        height: px(155),
        borderRadius: px(16),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px(20)
    },
    head: {
        width: px(106),
        height: px(106),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px(30),
        borderRadius: px(53),
        backgroundColor: '#9ba0b9'
    },
    headImage: {
        height: px(60),
        width: px(60),
        resizeMode: 'contain'
    },
    titleView: {
        marginLeft: px(20),
        flex: 1
    },
    titleLabel: {
        color: '#333',
        fontSize: px(36),
        lineHeight: px(36)
    },
    subTitleLabel: {
        marginTop: px(12),
        color: '#999999',
        fontSize: px(28),
        lineHeight: px(28)
    },
    btnView: {
        height: px(80),
        width: px(80),
        marginRight: px(30),
        alignItems: 'center',
        justifyContent: 'center'
    }
})