import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, DeviceEventEmitter, ImageBackground } from 'react-native'
import { Header } from '../components';
import { commonStyles } from '../commonStyles';
import { getClockDetailById, reportCustomerClock } from '../requests';
import { Toast } from '@ant-design/react-native';
import { ASSET_IMAGES, E } from '../config';
import { px, formatHourWithString } from '../utils';
import { Modal } from '@ant-design/react-native'
import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";

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
                <View style={commonStyles.content}>
                    <Text style={styles.normalTitle}>普通打卡</Text>
                    <View style={styles.headView}>
                        {
                            this.state.icon == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_TASK_DEFAULT} />:
                            <Image style={styles.headImage} source={{ uri: this.state.icon }} />
                        }
                        <View>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.clockTime}>{this.state.clock_time}</Text>
                        </View>
                    </View>
                    <View style={styles.signView}>
                        <TouchableOpacity onPress={this.signAction.bind(this)} activeOpacity={0.8} style={styles.signButton}>
                            <ImageBackground source={ASSET_IMAGES.ICON_NORMAL_SIGN} style={styles.signBg}>
                                <Text style={styles.signButtonText}>打卡</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.delayAction.bind(this)} activeOpacity={0.8} style={styles.delayButton}>
                            <ImageBackground style={styles.delayBg} source={ASSET_IMAGES.ICON_SIGN_END}>
                                <Text style={styles.delayButtonText}>延迟</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    signAction() {
        alert('确认', '确定打卡么？', [
            { text: '确认', onPress: () => {
                this.signRequest('success')
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }

    delayAction() {
        alert('确认', '确定延迟么？', [
            { text: '确认', onPress: () => {
                this.delayRequest('delay')
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }

    signRequest(status) {
        // let status = "success";
        setLocatingWithReGeocode(false);
        Geolocation.getCurrentPosition(({ coords, location }) => {
            const { latitude, longitude } = coords;
            console.log('lat', coords, location)

            const url = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${E.WEB_KEY}&radius=1000&extensions=all&poitype=`
            let opts = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": 'application/json;charset=utf-8',
                    "Connection": "keep-alive"
                },
                timeout: 60 * 1000,
            }

            fetch(url, opts).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((res) => {
                console.log('res', res);
                const { regeocode } = res;
                const { pois, formatted_address, addressComponent } = regeocode;
                const { adcode } = addressComponent;
                const { location } = pois[0];
                // const retAddress = `${province}${district}${township}${address}${name}`;
                const retCityCode = `${adcode}`;
                const retLatitude = location.split(',')[1];
                const retLongitude = location.split(',')[0]
                let reportData = {
                    id: '',
                    clock_id: this.state.id,
                    status: status,
                    position: formatted_address,
                    city: retCityCode,
                    longitude: retLongitude,
                    latitude: retLatitude,
                };
                const requestData = {
                    params:reportData,
                    callback: this.reportDataCallback.bind(this)
                }
                reportCustomerClock(requestData);
            }).catch(err => {
                console.log('err', err);
            })
        });
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
        const { success, error, data } = res;
        if (success) {
            DeviceEventEmitter.emit('taskReload');
            const { status } = data;
            if (status == 'delay') {
                Toast.info('延迟成功')
            } else {
                Toast.info('打卡成功')
            }
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
        // flexDirection: 'row',
        justifyContent:'center',
        marginTop: px(30),
        alignItems: 'center'
    },
    normalTitle: {
        marginLeft: px(30),
        marginTop: px(30),
        fontSize: px(28),
        color: '#777777'
    },
    headView: {
        backgroundColor: '#eaeaea',
        height: px(160),
        marginHorizontal: px(30),
        marginTop: px(30),
        borderRadius: px(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(120),
        height: px(120),
        borderRadius: px(60),
        marginRight: px(30)
    },
    name: {
        fontSize: px(26),
        color: '#000'
    },
    clockTime: {
        fontSize: px(22),
        marginTop: px(10),
        color: '#999'
    },
    signButton: {
        width: px(300),
        height: px(300),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(100)
    },
    signButtonText: {
        color: '#fff',
        fontSize: px(34),
        marginTop: px(-20)
    },
    delayButton: {
        width: px(200),
        height: px(200),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(100)
    },
    signBg: {
        width: px(250),
        height: px(250),
        alignItems: 'center',
        justifyContent: 'center'
    },
    delayBg: {
        width: px(180),
        height: px(180),
        alignItems: 'center',
        justifyContent: 'center'
    }
})