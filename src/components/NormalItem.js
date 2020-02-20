import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';
import { Toast } from '@ant-design/react-native'

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
            <TouchableOpacity onPress={this.action.bind(this)} style={styles.content}>
                <View style={styles.head}>
                    {this.renderHeadImage()}
                    {/* <Image style={styles.headImage} source={{ uri: icon }} /> */}
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleLabel}>{name}</Text>
                    <View style={styles.statusView}>
                        <Text style={styles.subTitleLabel}>{time}</Text>
                        <Text style={styles.statusLabel}>{this.statusText(status)}</Text>
                    </View>
                </View>
                {this.renderStatus(status)}
            </TouchableOpacity>
        )
    }

    renderStatus(status) {
        switch(status) {
            case 'success':
                return <Image style={styles.signIcon} source={ASSET_IMAGES.ICON_SIGN_ITEM_SELECT} />
            case 'fail':
                return null
            default:
                return <Image style={styles.signIcon} source={ASSET_IMAGES.ICON_SIGN_ITEM_UNSELECT} />
        }
    }

    renderHeadImage() {
        const { status, icon = null } = this.props.data || {};
        if (icon != null && icon.length != 0) {
            return <Image style={styles.headWebImage} source={{ uri: icon }} />
        }

        if (status == 'success') {
            return <Image style={styles.headImage} source={ASSET_IMAGES.ICON_TASK_SIGN_SUCCESS} />
        }

        return <Image style={styles.headImage} source={ASSET_IMAGES.ICON_TASK_DEFAULT} />
    }

    parseDate(dateString) {
        const t = Date.parse(dateString);
        const date = new Date(t);
        console.log('dd', date.getHours());
        return date.getHours() + ':' + date.getMinutes();
    }

    statusText(status) {
        switch(status) {
            case 'success':
                return ''
            case 'fail':
                return '已过期'
            case 'start':
                return '进行中'
        }
    }

    action() {
        const { status } = this.props.data || {};
        if (status == 'fail') {
            Toast.info('已过期');
        }

        if (status == 'success') {
            // buzuorenhechuli
        }

        if (status == 'start') {
            
        }
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
        marginBottom: px(20),
        paddingRight: px(20)
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
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        overflow: 'hidden'
    },
    headWebImage: {
        width: px(60),
        height: px(60),
        resizeMode: 'contain',
        overflow: 'hidden'
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
    statusLabel: {
        marginTop: px(12),
        color: '#999999',
        fontSize: px(24),
        lineHeight: px(28),
        marginLeft: px(20)
    },
    btnView: {
        height: px(80),
        width: px(80),
        marginRight: px(30),
        alignItems: 'center',
        justifyContent: 'center'
    },
    signIcon: {
        marginRight: px(20)
    },
    statusView: {
        flexDirection: 'row',
    }
})