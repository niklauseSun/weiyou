import React, { Component } from 'react'
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native'
import { px, formateDateWithString, formatHourWithString } from '../utils';
import { Modal } from '@ant-design/react-native';
import { deleteCustomerClock } from '../requests';
const alert = Modal.alert;

export default class NormalDeleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
//     icon: "https://devimage.99rongle.com/document%2Fjiyou_1573625179864.png"
// id: 52
// tmpl_id: 1
// customer_id: 100
// name: "早饭"
// clock_time: "2020-02-21T02:30:00.000Z"
// start_time: "2020-02-20T16:00:00.000Z"
// end_time: null
// repeats: 64
// ring: ""
// tips_start: "吃早饭啦"
// tips_delay: "会饿的哦"
// tips_end: "早饭要吃好"
// interval_min: 5
// interval_cnt: 2
// deleted: false
// create_time: "2020-02-21T07:56:37.000Z"
// update_time: "2020-02-21T07:56:37.000Z"

    render() {
        const { icon, name, clock_time, start_time, end_time } = this.props.data;
        const endText = end_time === null ? '无限期': formateDateWithString(end_time);
        return (
            <TouchableOpacity onPress={this.goToNormal.bind(this)} style={styles.content}>
                <Image style={styles.headImage} source={{ uri: icon }} />
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
                            <Text style={styles.deleteTitle}>删除</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.deleteView}>
                        <Text style={styles.clockTitle}>{formatHourWithString(clock_time)}</Text>
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
        const { id } = this.props.data;
        const ret = {
            id: id,
            callback: this.removeTaskCallback.bind(this)
        }
        deleteCustomerClock(ret)
    }

    removeTaskCallback(res) {
        const { success } = res;
        if (success) {
            const { reloadTask } = this.props;
            if (reloadTask) {
                reloadTask();
            }
        }
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
        marginTop: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(5),
        resizeMode: 'contain',
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