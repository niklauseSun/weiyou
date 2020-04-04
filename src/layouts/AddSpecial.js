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
    NativeModules,
    Platform
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
import { px, formatDateToString, uploadOssFile, getPosition } from '../utils';
import SpecialContractItem from '../components/SpecialContractItem';
import { addSpecialClock, getSpecialClockDetail, editSpecialClock, getContractList, deleteSpecialClock } from '../requests';
import ImagePicker from 'react-native-image-crop-picker';
import { Toast } from '@ant-design/react-native';

export default class AddSpecial extends Component {
    constructor(props) {
        super(props);
        const { addType = 'add', id = '' } = props.navigation.state.params || {}
        this.state = {
            selectDate: new Date(),
            addType: addType,
            name: '',
            id: id,
            icon: '',
            start_time: new Date().toISOString(),
            interval_min: 10,
            error_cnt: 3,
            position: null,
            question_id: null,
            longitude: 121.48,
            latitude: 31.23,
            city: '310114',
            contact: [],
            selectContactList: [],
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
        this.locationEmitter = DeviceEventEmitter.addListener('selectAddress', (dict) => {
            const {
                position,
                city,
                latitude,
                longitude
            } = dict;
            this.setState({
                position: position,
                city: city,
                latitude: latitude,
                longitude: longitude
            })
        });
        if (this.state.addType == 'edit') {
            this.loadSpecialDetail()
        } else {
            this.loadContactList();
        }
    }

    componentWillUnmount() {
        this.emitter = null;
        this.locationEmitter = null;
    }

    render() {
        console.log('special', this.state.selectContactList)
        return (
            <SafeAreaView style={styles.content}>
                <Header title="特殊" navigation={this.props.navigation} />
                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                    Keyboard.dismiss()
                }} style={styles.contentView}> */}
                    <ScrollView style={styles.contentView}>
                        <View style={styles.nameView}>
                            <TouchableOpacity onPress={this.uploadImage.bind(this)}>
                                { this.state.icon == '' ? <Image style={styles.nameHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} /> : <Image style={styles.nameHeadImage} source={{ uri: this.state.icon }} />}
                            </TouchableOpacity>
                            <Text style={styles.nameLabel}>特殊</Text>
                            <TextInput style={styles.nameInput} placeholder="请输入事件名称" placeholderTextColor="#C9C7C7" value={this.state.name} onChangeText={this.changeName.bind(this)} />
                        </View>
                        <SpecialLocationItem
                            navigation={this.props.navigation}
                            showMoreButton={false}
                            placeholder="请填写事件地址"
                            addType={this.state.addType}
                            city={this.state.city}
                            longitude={this.state.longitude}
                            latitude={this.state.latitude}
                            position={this.state.position}
                            type="input"
                            imageUrl={ASSET_IMAGES.ICON_SPECIAL_LOCATION}
                            title={this.state.position} />
                        <SpecialSelectItem onChangeTime={this.onChangeTime.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_TIME} title={this.state.start_time} />
                        <SpecialQuestionItem onChangeQuestion={this.onChangeQuestion.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_QUESTION} question={this.state.question}/>
                        <SpecialRepeatItem cnt={this.state.interval_min} repeat={this.state.error_cnt} changeCnt={this.onChangeCnt.bind(this)} changeRepeat={this.onChangeRepeat.bind(this)} />
                        <SpecialContractItem onChangeContact={this.changeContact.bind(this)} selectContactList={this.state.selectContactList} />
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

    changeContact(contact) {
        this.setState({
            selectContactList: contact
        })
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
            start_time: e.toISOString()
        })
    }

    onChangeQuestion() {
        this.props.navigation.navigate('AddQuestion');
    }

    addSpecialTask() {

        if (!global.isLogin) {
            this.props.navigation.navigate('LoginView');
            return;
        }
        if (this.state.question_id == null) {
            Toast.info('请选择问题');
            return;
        }

        if (!/^[0-9]*$/.test(this.state.interval_min)) {
            Toast.info('间隔必须请输入数字！');
            return;
        }

        if (parseInt(this.state.interval_min) < 10) {
            Toast.info('间隔不能小于10分钟');
            return;
        }
        const params = {
            id: this.state.id,
            icon: this.state.icon,
            name: this.state.name,
            start_time: this.state.start_time == null ? new Date().toISOString(): this.state.start_time,
            interval_min: this.state.interval_min,
            error_cnt: this.state.error_cnt,
            position: this.state.position,
            question_id: this.state.question_id,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            city: this.state.city,
            contacts: this.state.selectContactList,
            question: this.state.question
        }
        const data = {
            params: params,
            callback: this.addSpecialTaskCallback.bind(this)
        }

        if (this.state.addType == 'add') {
            addSpecialClock(data);
        } else {
            editSpecialClock(data);
        }
        console.log('addRequest', data)
        // addSpecialClock
    }

    addSpecialTaskCallback(res) {
        console.log('res', res);
        const { success, error } = res;
        if (success) {
            const { data } = res;
            if (this.state.addType == 'add') {
                Toast.info('添加成功');
                DeviceEventEmitter.emit('taskReload');
                DeviceEventEmitter.emit('taskListReload');
            } else {
                Toast.info('修改成功');
                DeviceEventEmitter.emit('taskReload');
                DeviceEventEmitter.emit('taskListReload');
                this.removeSpecialAlarm(this.state.id);
            }
            this.addNativeClock(data)
            this.props.navigation.goBack();
        } else {
            Toast.info(error);
        }
    }

    loadSpecialDetail() {
        // getSpecialClockDetail()
        getSpecialClockDetail({
            id: this.state.id,
            callback: this.loadSpecialDetailCallback.bind(this)
        })
    }

    loadSpecialDetailCallback(res) {
        const { success, data } = res;
        console.log('special detail', res);
        const { question, contacts } = data;
        let aArray = [];
        for (let i = 0;i < contacts.length; i++) {
            aArray.push(contacts[i].contact_id)
        }
        if (success) {
            this.setState({
                icon: data.icon,
                name: data.name,
                question_id: data.question_id,
                start_time: data.start_time,
                interval_min: data.interval_min,
                error_cnt: data.error_cnt,
                position: data.position,
                longitude: data.longitude,
                latitude: data.latitude,
                city: data.city,
                question: question.question,
                selectContactList: aArray
            })
        }
    }

    addNativeClock(data) {
        const { id } = data;
        let date = this.state.start_time == null ? new Date(): new Date(this.state.start_time);
        let timeString = formatDateToString(date);
        var alarmManager = NativeModules.AlarmManager;
        alarmManager.addSpecialAlarm('special-' + id, this.state.name, timeString);
    }

    removeSpecialAlarm(id) {
        // removeSpecialAlarmWithId
        var alarmManager = NativeModules.AlarmManager;
        alarmManager.removeSpecialAlarmWithId('special-' + id);
    }

    uploadImage() {
        // uploadOssFile()
        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo'
        }).then(img => {
            let imageName = this.acquireImageName(img.path);
            uploadOssFile(imageName, img.path).then((e) => {
                let url = 'https://' + global.imageHost + '/' + imageName;
                Toast.info('上传图片成功');
                this.setState({
                    icon: url
                });
                // const { changeIcon } = this.props;
                // changeIcon(url);
            });
        })
    }
    acquireImageName(path) {
        const filetype = path.substring(path.lastIndexOf('.')).toLowerCase();
        const currm = new Date().getTime() + '';
        console.log('dir', global.dir);
        const objectKey = `${global.dir}/${currm}${filetype}`;
        return objectKey
    }

    loadContactList() {
        if (!global.isLogin) {
            return;
        }
        getContractList({
            pageNum: 0,
            pageSize: 10,
            callback: this.loadContactListCallback.bind(this)
        });
    }

    loadContactListCallback(res) {
        console.log('contact list', res);
        const { success, data } = res;
        if (success) {
            let aArray = [];
            for (let i = 0;i<data.length;i++) {
                aArray.push(data[i].id);
            }

            this.setState({
                selectContactList: aArray
            })
        }
    }

    getPositionCallback(res) {
        const { success, data } = res;
        if (success) {
            const { longitude, latitude, city } = data;
            this.setState({
                longitude: longitude,
                latitude: latitude,
                city: city
            })
        }
        console.log('res', res);
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
        marginHorizontal: px(30),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    nameHeadImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45)
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