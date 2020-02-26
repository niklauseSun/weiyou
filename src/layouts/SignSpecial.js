import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native'
import { getSpecialClockDetail, getSpecialClockRecordList, postSpecialClockStatus, getPersonQuestionDetail } from '../requests';
import { Header, SignEnd } from '../components';
import { commonStyles } from '../commonStyles';
import { px, formateDateHourWithString } from '../utils';
import { Toast } from '@ant-design/react-native';

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
            question_id: question_id,
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
            recordList: []
        }
    }

    componentDidMount() {
        this.loadSpecialDetail();
        this.loadRecordList();
        this.loadAnswerById();
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
                <View style={commonStyles.content}>
                    <View style={styles.info}>
                        {icon == '' ? <View style={styles.headImage} />: <Image style={styles.headImage} source={{ uri: icon }} />}
                        <View>
                            <Text style={styles.titleLabel}>{name}</Text>
                            <Text style={styles.timeLabel}>上次更新时间：{recordList.length == 0 ? formateDateHourWithString(start_time): formateDateHourWithString(recordList[recordList.length - 1].create_time)}</Text>
                            {/* <Text style={styles.timeLabel}>上次更新时间：{formateDateHourWithString(start_time)}</Text> */}
                        </View>
                    </View>
                    <View style={styles.signContent}>
                        {
                            status == 'runing' || status == 'created' ?
                            <Fragment>
                                <TouchableOpacity style={styles.signButton} onPress={this.showModal.bind(this)}>
                                    <Text style={styles.signText}>签到</Text>
                                </TouchableOpacity>
                                <SignEnd singEndAction={this.signEnd.bind(this)} />
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
                                        <TouchableOpacity onPress={this.report.bind(this)} style={styles.confirmButton}>
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
            default:
                return '进行中'
        }
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

    report() {
        const { detail } = this.state;

        const params = {
            id: '',
            clock_id: this.state.id,
            longitude: detail.longitude,
            latitude: detail.latitude,
            city: detail.city,
            status: this.state.selectIndex == this.state.correct ? 'delay': 'fail',
        }

        console.log('report param', params);
        // postSpecialClockStatus
        postSpecialClockStatus({
            params: params,
            callback:this.reportCallback.bind(this)
        });
    }

    reportCallback(res) {
        const { success, error } = res;
        console.log('report', res);
        if (success) {
            Toast.info('签到成功！');
            this.loadSpecialDetail()
            this.loadRecordList()
        } else {
            Toast.info(error);
        }

        this.showModal();
    }
}

// #ED7539

const styles = StyleSheet.create({
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        paddingVertical: px(20),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        backgroundColor: '#999'
    },
    titleLabel: {
        fontSize: px(30),
        color: '#ED7539',
        marginLeft: px(30)
    },
    timeLabel: {
        marginLeft: px(30),
        marginTop: px(10),
        fontSize: px(26),
        color: '#999'
    },
    signContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signButton: {
        width: px(400),
        height: px(400),
        backgroundColor: '#ED7539',
        borderRadius: px(200),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signText: {
        fontSize: px(60),
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
    }
})