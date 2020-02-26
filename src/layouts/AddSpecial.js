import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
    NativeModules
} from 'react-native'
import {
    Header,
    SpecialSelectItem,
    SpecialRepeatItem,
    NormalContractItem,
    SpecialLocationItem,
    SpecialQuestionItem
} from '../components';
import { ASSET_IMAGES } from '../config';
import { px, formatDateToString } from '../utils';
import SpecialContractItem from '../components/SpecialContractItem';
import { addSpecialClock } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class AddSpecial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: new Date(),
            name: null,
            id: '',
            icon: '',
            start_time: new Date(),
            interval_min: 5,
            error_cnt: 3,
            position: '上海市',
            question_id: null,
            longitude: '121,48',
            latitude: '31.23',
            city: '310114',
            contracts: null,
            question: null
        }
    }

    componentDidMount() {
        this.emitter = DeviceEventEmitter.addListener('changeQuestion',(dict) => {
            console.log('changeQuestion', dict);
            const { id, question } = dict;
            this.setState({
                question_id: id,
                question: question
            })
        })
    }

    componentWillUnmount() {
        this.emitter = null;
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header title="特殊" navigation={this.props.navigation} />
                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                    Keyboard.dismiss()
                }} style={styles.contentView}> */}
                    <ScrollView style={styles.contentView}>
                        <View style={styles.nameView}>
                            <Image style={styles.nameHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} />
                            <Text style={styles.nameLabel}>特殊</Text>
                            <TextInput style={styles.nameInput} placeholder="请输入事件名称" placeholderTextColor="#C9C7C7" value={this.state.value} onChangeText={this.changeName.bind(this)} />
                        </View>
                        <SpecialLocationItem showMoreButton={false} placeholder="请填写事件地址" type="input" imageUrl={ASSET_IMAGES.ICON_SPECIAL_LOCATION} />
                        <SpecialSelectItem onChangeTime={this.onChangeTime.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_TIME} title={this.state.start_time} />
                        <SpecialQuestionItem onChangeQuestion={this.onChangeQuestion.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_QUESTION} title={this.state.question}/>
                        <SpecialRepeatItem cnt={this.state.interval_min} repeat={this.state.error_cnt} changeCnt={this.onChangeCnt.bind(this)} changeRepeat={this.onChangeRepeat.bind(this)} />
                        <SpecialContractItem />
                        <TouchableOpacity onPress={this.addSpecialTask.bind(this)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>添加</Text>
                        </TouchableOpacity>
                    </ScrollView>
                {/* </TouchableOpacity> */}
            </SafeAreaView>
        )
    }

    formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        const h = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second= date.getSeconds();
        second = minute < 10 ? ('0' + second) : second;
        return y + '.' + m + '.' + d+' '+h+':'+minute;
    }

    changeName(text) {
        this.setState({
            name: text
        })
    }

    onChangeCnt(cnt) {
        this.setState({
            interval_min: cnt
        })
    }

    onChangeRepeat(repeat) {
        this.setState({
            error_cnt: repeat
        })
    }

    onChangeTime(e) {
        this.setState({
            start_time: e
        })
    }

    onChangeQuestion() {
        this.props.navigation.navigate('AddQuestion');
    }

    addSpecialTask() {

        if (this.state.question_id == null) {
            Toast.info('请选择问题');
            return;
        }
//         id  			任务id
// icon		图
// name	任务名称
// start_time	开始日期
// interval_min	间隔时间（分钟）
// error_cnt	错误次数
// position	地理位置（汉化）
// question_id	问题ID
// longitude	经度
// latitude	纬度
// city		城市编码
// status		状态（"created", "runing", "finish", "fail"）已创建 提醒中 已结束 已失败
// status	状态("runing","success", "fail", "delay", "notYet") 已开始 成功 失败 延迟  未到打卡时间(获取某天的任务时才有此字段)
// contacts		设置时为联系人结构体ID数组；获取时为联系人结构体数组
// question	问题详情(获取任务详情时)
// deleted
        const params = {
            id: this.state.id,
            icon: this.state.icon,
            name: this.state.name,
            start_time: this.state.start_time == null ? new Date().toISOString(): this.state.start_time.toISOString(),
            interval_min: this.state.interval_min,
            error_cnt: this.state.error_cnt,
            position: '上海市',
            question_id: this.state.question_id,
            longitude: '121,48',
            latitude: '31.23',
            city: '310114',
            contracts: this.state.contracts,
            question: this.state.question
        }
        const data = {
            params: params,
            callback: this.addSpecialTaskCallback.bind(this)
        }
        console.log('addRequest', data)
        // addSpecialClock
        addSpecialClock(data);
    }

    addSpecialTaskCallback(res) {
        console.log('res', res);
        const { success } = res;
        if (success) {
            Toast.info('添加成功');
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('taskReload');
            this.addNativeClock()
        }
    }

    addNativeClock() {
        let date = this.state.start_time == null ? new Date(): new Date(this.state.start_time);
        let timeString = formatDateToString(date);
        var alarmManager = NativeModules.AlarmManager;
        alarmManager.addSpecialAlarm('special' + new Date().getTime(), this.state.name, timeString);
        // alarmManager.addNormalAlarm('normal'+ new Date().getTime(), this.state.name, timeString, weeks);
      }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentView: {
        flex: 1,
        backgroundColor: '#eaeaea'
    },
    nameView: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(20),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    nameHeadImage: {
        width: px(90),
        height: px(90)
    },
    nameLabel: {
        marginLeft: px(20),
        color: '#474342',
        fontSize: px(32),
        fontWeight: 'bold'
    },
    nameInput: {
        marginLeft: px(10),
        height: '100%',
        flex: 1,
        textAlign: 'right'
    },
    addButton: {
        height: px(120),
        backgroundColor: '#393235',
        marginHorizontal: px(40),
        marginTop: px(40),
        borderRadius: px(10),
        marginBottom: px(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: px(34)
    }
})