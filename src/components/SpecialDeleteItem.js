import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
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
                DeviceEventEmitter.emit('taskReload');
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