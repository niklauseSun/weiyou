import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';
import { Modal } from '@ant-design/react-native';
import { deleteSpecialClock } from '../requests';

const alert = Modal.alert;

export default class SpecialDeleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

//     icon: ""
// id: 4
// name: "房东"
// customer_id: 100
// question_id: 5
// start_time: "2020-02-16T07:39:00.000Z"
// start_day: "2020-02-15T16:00:00.000Z"
// interval_min: 5
// error_cnt: 3
// position: "上海市上海市嘉定区爱特路68弄"
// longitude: "121.32188226231072"
// latitude: "31.23488077527308"
// city: "310114"
// status: "created"
// deleted: false
// create_time: "2020-02-16T07:40:11.000Z"
// update_time: "2020-02-16T07:40:11.000Z"

    render() {
        const { icon, name, error_cnt, interval_min } = this.props.data;
        return (
            <TouchableOpacity onPress={this.navigateSpecialDetail.bind(this)} style={styles.content}>
                <View style={styles.headImageView}>
                    {icon == '' ? <Image source={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} />: <Image style={styles.headImage} source={{ uri: icon }} />}
                </View>
                <View style={styles.detail}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.cntTitle}>重复{error_cnt}无人应答或错误，通知监护人</Text>
                    <Text style={styles.minTitle}>每{interval_min}分钟提醒</Text>
                </View>
                <TouchableOpacity onPress={() => {
                        alert('确认', '确定要删除么', [
                            { text: '确认', onPress: () => {
                                this.removeTask()
                            } },
                            { text: '取消', onPress: () => {

                            } },
                        ])
                    }} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>删除</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    navigateSpecialDetail() {
        this.props.navigation.navigate('AddSpecial', {
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
        deleteSpecialClock(ret)
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
        height: px(210),
        marginHorizontal: px(30),
        backgroundColor: '#eaeaea',
        paddingHorizontal: px(30),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: px(20),
        marginTop: px(20)
    },
    headImageView: {
        width: px(120)
    },
    headImage: {
        width: px(90),
        height: px(90),
        backgroundColor: 'red'
    },
    detail: {
        flex: 1,
    },
    name: {
        fontSize: px(32),
        color: '#ED7539'
    },
    cntTitle: {
        fontSize: px(24),
        color: '#999',
        marginTop: px(20),
        marginBottom: px(10)
    },
    minTitle: {
        fontSize: px(22),
        color: '#999'
    },
    deleteButton: {
        height: px(120)
    },
    deleteButtonText: {
        color: '#ED7539'
    }
})