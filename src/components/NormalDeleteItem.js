import React, { Component } from 'react'
import { StyleSheet, View, Text, Image,TouchableOpacity, DeviceEventEmitter, NativeModules } from 'react-native'
import { px, formateDateWithString, formatHourWithString } from '../utils';
import { Modal } from '@ant-design/react-native';
import { deleteCustomerClock } from '../requests';
import { ASSET_IMAGES } from '../config';
const alert = Modal.alert;

export default class NormalDeleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { icon, name, clock_time, start_time, end_time } = this.props.data;
        const endText = end_time === null ? '无限期': formateDateWithString(end_time);
        return (
            <TouchableOpacity onPress={this.goToNormal.bind(this)} style={styles.content}>
                <Image defaultSource={ASSET_IMAGES.ICON_TASK_DEFAULT} style={styles.headImage} source={{ uri: icon }} />
                <View style={{flex: 1}}>
                    <View style={styles.nameView}>
                        <Text style={styles.nameTitle}>{name}</Text>
                        <TouchableOpacity onPress={() => {
                            alert('确认', '确定要删除么', [
                                { text: '确认', onPress: () => {
                                    this.removeTask()
                                } },
                                { text: '取消', onPress: () => {

                                } },
                            ])
                        }} style={styles.deleteButton}>
                            {/* <Text style={styles.deleteTitle}>删除</Text> */}
                            <Image source={ASSET_IMAGES.ICON_DELETE} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.deleteView}>
                        <Text style={styles.clockTitle}>{clock_time}</Text>
                        <Text style={styles.timeLabel}>{formateDateWithString(start_time)}-{endText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goToNormal() {
        this.props.navigation.navigate('AddHabitDetail', {
            addType: 'edit',
            id: this.props.data.id
        })
    }

    removeTask() {
        // deleteCustomerClock
        const { id, repeats } = this.props.data;

        const ret = {
            id: id,
            callback: this.removeTaskCallback.bind(this)
        }
        deleteCustomerClock(ret)
        this.removeNativeClock(id, repeats);
    }

    removeTaskCallback(res) {
        const { success } = res;
        if (success) {
            const { reloadTask } = this.props;
            if (reloadTask) {
                reloadTask();
                DeviceEventEmitter.emit('taskListReload');
                DeviceEventEmitter.emit('listReload');
            }
        }
    }

    removeNativeClock(id, repeats) {
        let aString = this.switchToArray(repeats);
        let weeks = this.showItem(aString);
        var alarmManager = NativeModules.AlarmManager;
        alarmManager.removeNormalAlarmWithId('normal-' + id, weeks);
    }

    switchToArray(repeats) {
        let value = parseInt(repeats + '').toString(2);
        let l = value.length;    //获取要格式化数字的长度，如二进制1的话长度为1
        if(l < 7){     //补全位数 0000，这里我要显示4位
            for(var i = 0; i < 7-l; i++) {
                value = "0" + value;     //不够的就在前面补0
            }
        }
        return value;
    }
    showItem(aString) {
        let data = []
        for (let i = 0;i < aString.length; i++) {
            if (aString[i] == '1') {
                switch(i) {
                    case 0:
                    data.push('周一');
                    break;
                    case 1:
                    data.push('周二')
                    break;
                    case 2:
                    data.push('周三');
                    break;
                    case 3:
                    data.push('周四')
                    break;
                    case 4:
                    data.push('周五');
                    break;
                    case 5:
                    data.push('周六')
                    break;
                    case 6:
                    data.push('周日')
                    break;
                    default:
                        break;
                }
            }
        }
        return data;
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(160),
        marginHorizontal: px(30),
        borderRadius: px(20),
        backgroundColor: '#eaeaea',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        marginBottom: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(5),
        resizeMode: 'contain',
        borderRadius: px(45),
        marginRight: px(20)
    },
    nameView: {
        flexDirection: 'row',
    },
    nameTitle: {
        fontSize: px(30),
        flex: 1
    },
    clockTitle: {
        fontSize: px(26),
        color: '#999',
        flex: 1,
    },
    deleteView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        width: px(120),
        height: px(60),
        alignItems: 'flex-end',
        justifyContent:'center'
    },
    deleteTitle: {
        color: '#ED7539'
    },
    timeLabel: {
        fontSize: px(26),
        color: '#999'
    }
})