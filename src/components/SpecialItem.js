import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';

export default class SpecialItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data } = this.props;
        console.log('special', data);
        const { icon, interval_min, start_time, error_cnt, name, status } = data
        const startTime = this.parseDate(start_time)
        return (
            <View style={styles.content}>
                <View style={styles.head}>
                    <Image style={styles.headImage} defaultSource={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} source={{ uri: icon }} />
                </View>
                <View style={styles.titleView}>
                    <View style={styles.firstLine}>
                        <Text style={styles.titleLabel}>{name}</Text>
                        <Text style={styles.statusLabel}>{status === 'fail'? '已过期': '进行中'}</Text>
                    </View>
                    <View style={styles.secondLine}>
                        <Text style={styles.subTitleLabel}>重复{error_cnt}次无应答或错误，通知监护人</Text>
                    </View>
                    <View style={styles.thirdLine}>
                        <Text style={styles.tipTimeLabel}>每{interval_min}分钟提醒</Text>
                        <Text style={styles.startTimeLabel}>开始时间{startTime}</Text>
                    </View>

                </View>
            </View>
        )
    }

    parseDate(dateString) {
        const t = Date.parse(dateString);
        const date = new Date(t);
        return date.getFullYear() + '-' + date.getHours() + '-' + date.getMinutes();
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
        paddingRight: px(30)
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
        lineHeight: px(36),
        flex: 1
    },
    subTitleLabel: {
        marginTop: px(12),
        color: '#999999',
        fontSize: px(24),
        lineHeight: px(28)
    },
    statusLabel: {
        fontSize: px(20),
        color: '#999'
    },
    btnView: {
        height: px(80),
        width: px(80),
        marginRight: px(30),
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstLine: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    thirdLine: {
        flexDirection: 'row',
        marginTop: px(6)
    },
    tipTimeLabel: {
        flex: 1,
        fontSize: px(20),
        color: '#999'
    },
    startTimeLabel: {
        fontSize: px(20),
        color: '#999'
    }
})