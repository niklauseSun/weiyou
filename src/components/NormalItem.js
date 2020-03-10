import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';
import { Toast, ActionSheet } from '@ant-design/react-native'
import { reportCustomerClock } from '../requests';

export default class NormalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data } = this.props;
        const { name, clock_time, status, icon = null } = data;
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
            case 'notYet':
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
        return date.getHours() + ':' + date.getMinutes();
    }

    statusText(status) {
        // "start","success", "fail", "delay", "notYet") 已开始 成功 失败 延迟  未到时间(获取某天的任务时才有此字段)

        switch(status) {
            case 'success':
                return '成功'
            case 'fail':
                return '已过期'
            case 'start':
                return '已开始'
            case 'delay':
                return '延迟'
            case 'notYet':
                return '未开始'
        }
    }

    action() {
        console.log('action', this.props.data);
        const { data = {} } = this.props;
        const { status, id } = data
        if (status == 'fail') {
            Toast.info('已过期');
            // return;
        }

        if (status == 'notYet') {
            Toast.info('暂未开始');
            // return;
        }

        if (status == 'success') {
            // buzuorenhechuli
            Toast.info('已完成');
            return;
        }

        // this.props.navigation.navigate('NormalSign', {
        //     id:id
        // });
        // return;

        // return;
        if (status == 'start' || status == 'delay') {

            const BUTTONS = ['完成', '延迟', 'Cancel'];
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                message: '是否完成当前任务',
                maskClosable: true,
            },(buttonIndex) => {
                console.log('buttonIndex', buttonIndex);
                let status = "";
                if (buttonIndex == 0) {
                    status = "success";
                } else if (buttonIndex == 1) {
                    status = "delay"
                } else {
                    return;
                }
                let reportData = {
                    id: '',
                    clock_id: data.id,
                    status: status,
                    position: '上海市',
                    city: '310114',
                    longitude: '121.48',
                    latitude: '31.22',
                };
                const requestData = {
                    params:reportData,
                    callback: this.reportDataCallback.bind(this)
                }
                reportCustomerClock(requestData);
            });
        }
    }

    reportDataCallback(res) {
        const { success, error } = res;
        if (success) {
            DeviceEventEmitter.emit('taskReload');
        } else {
            Toast.fail(error);
            DeviceEventEmitter.emit('taskReload');
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
        fontSize: px(34)
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