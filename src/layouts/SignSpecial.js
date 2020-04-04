import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, Modal, DeviceEventEmitter, ImageBackground } from 'react-native'
import { getSpecialClockDetail, getSpecialClockRecordList, postSpecialClockStatus, getPersonQuestionDetail } from '../requests';
import { Header, SignEnd } from '../components';
import { commonStyles } from '../commonStyles';
import { px, formateDateHourWithString } from '../utils';
import { Toast } from '@ant-design/react-native';
import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";
import { E, ASSET_IMAGES } from "../config";

export default class SignSpecial extends Component {
    constructor(props) {
        super(props);
        console.log('special', props);
        const { id, question_id } = props.navigation.state.params || {}
        this.state = {
            id: id,
            icon: '',
            name: null,
            customer_id: 0,
            question_id: '',
            start_time: '',
            start_day: '',
            interval_min: 0,
            error_cnt: 0,
            position: '上海市',
            longitude: "121,48",
            latitude: "31.23",
            city: "310114",
            create_time: '',
            update_time: '',
            signList: null,
            status: 'created',
            isShow: false,
            selectIndex: 0,
            correct: 0,
            answer: [],
            question: null,
            detail: null,
            recordList: [],
            isSign: true,
        }
    }

    componentDidMount() {
        this.loadSpecialDetail();
        this.loadRecordList();
        // this.loadAnswerById();
    }

//     icon: ""
// id: 24
// name: "特殊测试1"
// customer_id: 121
// question_id: 8
// start_time: "2020-02-24T11:18:35.000Z"
// start_day: "2020-02-23T16:00:00.000Z"
// interval_min: 3
// error_cnt: 3
// position: "上海市"
// longitude: "121,48"
// latitude: "31.23"
// city: "310114"
// status: "created"
// deleted: false
// create_time: "2020-02-24T11:18:23.000Z"
// update_time: "2020-02-24T11:18:23.000Z"

    render() {
        console.log('id', this.state.id);
        const { name, icon, start_time, status, recordList } = this.state;
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="特殊签到" navigation={this.props.navigation}/>
                <Text style={styles.specialTitle}>特殊签到</Text>
                <View style={commonStyles.content}>
                    <View style={styles.info}>
                        {icon == '' ? <Image source={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} style={styles.headImage} />: <Image style={styles.headImage} source={{ uri: icon }} />}
                        <View>
                            <Text style={styles.titleLabel}>{name}</Text>
                            <Text style={styles.timeLabel}>上次更新时间：{recordList.length == 0 ? formateDateHourWithString(start_time): formateDateHourWithString(recordList[0].create_time)}</Text>
                            {/* <Text style={styles.timeLabel}>上次更新时间：{formateDateHourWithString(start_time)}</Text> */}
                        </View>
                    </View>
                    <View style={styles.signContent}>
                    {/* status == 'created' || status == 'runing' || status == 'delay' || status == 'answerError' || status == 'timeout' */}
                        {
                            status == 'delay' || status == 'runing' || status == 'created' || status == 'answerError' || status == 'timeout' ?
                            <Fragment>
                                <TouchableOpacity style={styles.signButton} onPress={this.signAction.bind(this)}>
                                    <ImageBackground style={styles.signBg} source={ASSET_IMAGES.ICON_SPECIAL_SIGN_VIEW}>
                                        <Text style={styles.signText}>签到</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <SignEnd singEndAction={this.signEndAction.bind(this)} />
                            </Fragment>
                        : <View style={styles.failView}>
                                <Text style={styles.failText}>{this.statusText(status)}</Text>
                            </View>
                        }
                    </View>
                </View>
                <Modal
                    visible={this.state.isShow}
                    transparent={true}
                >
                    <TouchableOpacity onPress={this.showModal.bind(this)} activeOpacity={1} style={styles.showView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>选择答案</Text>
                            {
                                this.state.correct.length == 0 ? null:
                                    <Fragment>
                                    <Text style={styles.question}>{this.state.question}</Text>
                                    <View style={styles.answerView}>
                                        <TouchableOpacity onPress={this.changeSelect.bind(this, 0)} style={styles.selectButtonOne}>
                                            <Text style={0 == this.state.selectIndex ? styles.selectText: styles.selectButtonTextNormal}>{this.state.answer[0]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.changeSelect.bind(this, 1)} style={styles.selectButtonTwo}>
                                            <Text style={1 == this.state.selectIndex ? styles.selectText: styles.selectButtonTextNormal}>{this.state.answer[1]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.confirmView}>
                                        <TouchableOpacity onPress={this.showModal.bind(this)} style={styles.cancelButton}>
                                            <Text>取消</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.signRequest.bind(this)} style={styles.confirmButton}>
                                            <Text>确认</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Fragment>
                            }
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        )
    }

    statusText(status) {
        switch (status) {
            case 'fail':
                return '已过期'
            case 'success':
                return '已成功'
            case 'created':
                return '已创建'
            case 'answerError':
                return '问题回答错误'
            case 'runing':
                return '进行中'
            case 'delay':
                return ''
            case 'timeout':
                return '已过期'
            case 'notYet':
                return '未开始'
            default:
                return '错误'
        }

        // ("created","runing","success", "fail", "delay",'answerError', 'timeout'， "notYet") 
    }

    loadRecordList() {
        // getSpecialClockRecordList
        getSpecialClockRecordList({
            clock_id: this.state.id,
            pageNum: 0,
            pageSize: 10,
            callback: this.loadRecordListCallback.bind(this)
        })
    }

    loadRecordListCallback(res) {
        console.log('rettt', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                recordList: data,
            })
        }
    }

    loadSpecialDetail() {
        // getSpecialClockDetail
        getSpecialClockDetail({
            id: this.state.id,
            callback: this.loadSpecialCallback.bind(this)
        })
    }

    loadSpecialCallback(res) {
        console.log('loadSpecialCallback', res);
        if (res.success) {
            const { name, icon, start_time, question_id ,status } = res.data;
            this.setState({
                name: name,
                icon: icon,
                start_time: start_time,
                question_id: question_id,
                detail: res.data,
                status: status
            }, () => {
                this.loadAnswerById();
            })
        }
    }

    loadAnswerById() {
        // getPersonQuestionDetail
        const { question_id } = this.state;
        getPersonQuestionDetail({
            id: question_id,
            callback: this.loadAnswerCallback.bind(this)
        })
    }

    changeSelect(index) {
        this.setState({
            selectIndex: index
        })
    }

    signAction() {
        this.setState({
            isSign: true,
            selectIndex: 0
        }, () => {
            this.showModal();
        })
    }

    signEndAction() {
        this.setState({
            isSign: false,
            selectIndex: 0
        }, () => {
            this.showModal();
        })
    }

    loadAnswerCallback(res) {
        console.log('resss', res)
        const { success, data } = res;
        if (success) {
            const { answer, correct, question } = data;
            this.setState({
                answer: answer,
                correct: correct,
                question: question
            })
        }
    }

    showModal() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    signEnd() {
        const { detail } = this.state;

        const params = {
            id: '',
            clock_id: this.state.id,
            longitude: detail.longitude,
            latitude: detail.latitude,
            city: detail.city,
            status: 'success',
        }

        console.log('report param', params);
        // postSpecialClockStatus
        postSpecialClockStatus({
            params: params,
            callback:this.reportCallback.bind(this)
        });
    }

    signRequest() {
        Geolocation.getCurrentPosition(({ coords, location }) => {
            const { latitude, longitude } = coords;

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

                const { detail } = this.state;
                console.log('isSign', this.state.isSign)
                console.log('index', this.state.selectIndex)
                let status = ''
                if (this.state.isSign) {
                    status = 'delay'
                } else {
                    status = 'success'
                }

                const params = {
                    id: '',
                    clock_id: this.state.id,
                    longitude: retLongitude,
                    latitude: retLatitude,
                    city: retCityCode,
                    status: status,
                    answer_id: this.state.selectIndex
                }

                console.log('signSpecial', params);
                postSpecialClockStatus({
                    params: params,
                    callback:this.reportCallback.bind(this)
                });
            }).catch(err => {
                console.log('err', err);
            })
        });
    }

    report() {
        const { detail } = this.state;

        const params = {
            id: '',
            clock_id: this.state.id,
            longitude: detail.longitude,
            latitude: detail.latitude,
            city: detail.city,
            status: 'success',
        }

        console.log('report param', params);
        // postSpecialClockStatus
        postSpecialClockStatus({
            params: params,
            callback:this.reportCallback.bind(this)
        });
    }

    reportCallback(res) {
        const { success, error, data } = res;
        console.log('report', res);
        if (success) {
            Toast.info('签到成功！');
            const { status } = data;
            if (status == 'success') {
                this.props.navigation.goBack();
                return;
            }
            DeviceEventEmitter.emit('taskReload');
            this.loadSpecialDetail()
            this.loadRecordList()
        } else {
            Toast.info(error);
        }

        this.showModal();
    }

    componentWillUnmount() {
        console.log('unmount');
        DeviceEventEmitter.emit('listReload')
    }
}

// #ED7539

const styles = StyleSheet.create({
    specialTitle: {
        fontSize: px(28),
        color: '#777',
        marginTop: px(30),
        marginLeft: px(30),
        marginBottom: px(30)
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        paddingVertical: px(20),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        marginHorizontal: px(30),
        backgroundColor: '#eaeaea',
        borderRadius: px(10)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
    },
    titleLabel: {
        fontSize: px(28),
        color: '#ED7539',
        marginLeft: px(30)
    },
    timeLabel: {
        marginLeft: px(30),
        marginTop: px(10),
        fontSize: px(24),
        color: '#999'
    },
    signContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signButton: {
        width: px(300),
        height: px(300),
        borderRadius: px(150),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signText: {
        fontSize: px(30),
        marginTop: px(-20),
        color: '#fff'
    },
    showView: {
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        height: px(330),
        width: px(500),
        backgroundColor: '#fff',
        borderRadius: px(30)
    },
    title: {
        fontSize: px(32),
        marginTop: px(30),
        marginBottom: px(30),
        textAlign: 'center'
    },
    answerView: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly'
    },
    selectButtonOne: {
        flex: 1,
        height: px(60),
        paddingHorizontal: px(10)
    },
    selectButtonTwo: {
        flex: 1,
        height: px(60),
        paddingHorizontal: px(10)
    },
    selectButtonTextNormal: {
        textAlign: 'center',
        color: '#333'
    },
    selectText: {
        textAlign: 'center',
        backgroundColor: '#ED7539',
        color: '#fff'
    },
    confirmView: {
        marginTop: px(30),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    question: {
        textAlign: 'center',
        marginBottom: px(40)
    },
    cancelButton: {
        paddingHorizontal: px(50),
        paddingVertical: px(10),
    },
    confirmButton: {
        paddingHorizontal: px(50),
        paddingVertical: px(10),
    },
    signBg: {
        width: px(250),
        height: px(250),
        alignItems: 'center',
        justifyContent: 'center'
    }
})