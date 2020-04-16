import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { px } from '../utils'
import { ASSET_IMAGES } from '../config';
import { getPersonQuestionDetail, postSpecialClockStatus, getSpecialClockDetail } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class SpecialItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:false,
            selectIndex: 0,
            correct: 0,
            answer: [],
            question: null
        }
    }

    componentDidMount() {
        // this.loadAnswerById();
    }

    render() {
        const { data } = this.props;
        const { icon, interval_min, start_time, error_cnt, name, status } = data
        const startTime = this.parseDate(start_time)
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.specialItemAction.bind(this)} style={styles.content}>
                <View style={styles.head}>
                    <Image style={styles.headImage} defaultSource={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} source={{ uri: icon }} />
                </View>
                <View style={styles.titleView}>
                    <View style={styles.firstLine}>
                        <Text style={styles.titleLabel}>{name}</Text>
                        <Text style={styles.statusLabel}>{this.statusText(status)}</Text>
                    </View>
                    <View style={styles.secondLine}>
                        <Text style={styles.subTitleLabel}>重复{error_cnt}次无应答或错误，通知监护人</Text>
                    </View>
                    <View style={styles.thirdLine}>
                        <Text style={styles.tipTimeLabel}>每{interval_min}分钟提醒</Text>
                        <Text style={styles.startTimeLabel}>开始时间{startTime}</Text>
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
            </TouchableOpacity>
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

    specialItemAction() {
        const { status, id } = this.props.data;

        getSpecialClockDetail({
            id: id,
            callback: this.getSpDetailCallback.bind(this)
        })
    }

    getSpDetailCallback(res) {
        const { success, data, error } = res;
        if (success) {
            const { status, question, id, question_id } = data;
            if (status == 'created' || status == 'runing' || status == 'delay' || status == 'answerError' || status == 'timeout') {
                this.props.navigation.navigate('SignSpecial', {
                    id: id,
                    question_id: question_id
                });
            } else {
                if (status == 'fail') {
                    Toast.info('已过期');
                    return;
                } else if (status == 'notYet') {
                    Toast.info('暂未开始');
                    return;
                } else if (status == 'success') {
                    Toast.info('已成功');
                    return;
                }
            }
        } else {
            Toast.info(error);
        }
    }

    loadAnswerById() {
        // getPersonQuestionDetail
        const { question_id } = this.props.data;
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

    parseDate(dateString) {
        const t = Date.parse(dateString);
        const date = new Date(t);
        return date.getFullYear() + '-' + date.getHours() + '-' + date.getMinutes();
    }

    report() {
        const { data } = this.props;

        const params = {
            id: data.id,
            icon: data.icon,
            name: data.name,
            start_time: data.start_time,
            interval_min: data.interval_min,
            error_cnt: data.error_cnt,
            position: data.position,
            question_id: data.question_id,
            longitude: data.longitude,
            latitude: data.latitude,
            city: data.city,
            status: this.state.selectIndex == this.state.correct ? 'success': 'fail',
            contacts: data.contacts,
            question: data.question
        }
        postSpecialClockStatus({
            params: params,
            callback:this.reportCallback.bind(this)
        });
    }

    reportCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('签到成功！');
        } else {
            Toast.info(error);
        }

        this.showModal();
    }
}

const styles = StyleSheet.create({
    content: {
        marginRight: px(30),
        marginLeft: px(30),
        backgroundColor: '#f7f6fd',
        borderRadius: px(16),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px(20),
        paddingRight: px(30),
        paddingVertical:px(20)
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
        alignItems: 'center',
        height: px(40)
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