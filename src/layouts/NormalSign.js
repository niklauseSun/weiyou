import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native'
import { Header } from '../components';
import { commonStyles } from '../commonStyles';
import { getClockDetailById, reportCustomerClock } from '../requests';
import { Toast } from '@ant-design/react-native';
import { ASSET_IMAGES } from '../config';
import { px, formatHourWithString } from '../utils';
import { Modal } from '@ant-design/react-native'

const alert = Modal.alert

export default class NormalSign extends Component {
    constructor(props) {
        const { id } = props.navigation.state.params || {};
        super(props);
        this.state = {
            id: id,
            icon: '',
            clock_time: '',
            name: '',
            data: {}
        }
    }

    componentDidMount() {
        this.requestClockDetailById();
    }

    // getClockDetailById
    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title="普通打卡" />
                <View style={commonStyles.body}>
                    <View style={styles.headView}>
                        {
                            this.state.icon == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />:
                            <Image style={styles.headImage} source={{ uri: this.state.icon }} />
                        }
                        <Text>{this.state.name}</Text>
                    </View>

                    <Text style={styles.clockTime}>闹钟时间：{formatHourWithString(this.state.clock_time)}</Text>

                    <View style={styles.signView}>
                        <TouchableOpacity onPress={this.signAction.bind(this)} activeOpacity={0.8} style={styles.signButton}>
                            <Text style={styles.signButtonText}>打卡</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.delayAction.bind(this)} activeOpacity={0.8} style={styles.delayButton}>
                            <Text style={styles.delayButtonText}>延迟</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    signAction() {
        alert('确认', '确定打卡么？', [
            { text: '确认', onPress: () => {
                this.signRequest()
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }

    delayAction() {
        alert('确认', '确定延迟么？', [
            { text: '确认', onPress: () => {
                this.delayRequest()
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }

    signRequest() {
        let status = "success";
        let reportData = {
            id: '',
            clock_id: this.state.id,
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
    }

    delayRequest() {
        let status = "delay";
        let reportData = {
            id: '',
            clock_id: this.state.id,
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
    }

    reportDataCallback(res) {
        console.log('report', res);
        const { success, error } = res;
        if (success) {
            Toast.info('打卡成功')
            DeviceEventEmitter.emit('taskReload');
        } else {
            Toast.fail(error);
            DeviceEventEmitter.emit('taskReload');
        }
    }

    requestClockDetailById() {
        // getClockDetailById
        getClockDetailById({
            id: this.state.id,
            callback: this.requestCallback.bind(this)
        })
    }

    requestCallback(res) {
        console.log('detail', res);
        const { success, error, data } = res;
        if (success) {
            const {
                icon,
                name,
                clock_time
            } = data;
            this.setState({
                icon: icon,
                name: name,
                clock_time: clock_time,
                data: data
            })
        } else {
            Toast.info(error);
            this.props.navigation.goBack();
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    signView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: px(30)
        // alignItems: 'center'
    },
    headView: {
        height: px(160),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(120),
        height: px(120),
        marginRight: px(30)
    },
    clockTime: {
        marginHorizontal: px(30),
        marginVertical: px(30),
        fontSize: px(28),
        color: '#ED7539'
    },
    signButton: {
        width: px(200),
        height: px(200),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED7539',
        borderRadius: px(100)
    },
    signButtonText: {
        color: '#fff',
        fontSize: px(34)
    },
    delayButton: {
        width: px(200),
        height: px(200),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#999',
        borderRadius: px(100),
        marginLeft: px(30)
    }
})