import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    DeviceEventEmitter,
    NativeModules,
    Platform
} from 'react-native';
import {
  Header,
  NormalNameItem,
  NormalRemindItem,
  NormalDateSelectItem,
  NormalRepeatItem,
  NormalContractItem,
  SelectModal,
  NormalRemindTextItem,
} from '../components';
import { px, formatDateToString, uploadOssFile } from '../utils';
import { Toast } from '@ant-design/react-native';
import { addCustomerClock, getClockDetailById, editCustomerClock, getContractList } from '../requests';
import ImagePicker from 'react-native-image-crop-picker';

export default class AddHabitDetail extends Component {
  constructor(props) {
    super(props);
    const { addType = 'add', id = '' } = props.navigation.state.params || {}
    this.state = {
      addType: addType,
      id: id, // 任务id
      icon: null,		//图标
      tmpl_id: '',	//模板ID
      name: null,	//任务名称
      clock_time: null, //	提醒时间
      start_time: null, //	开始日期
      end_time: null, //		结束日期
      repeats: 0, //	   	重复规律（7位 位运算，分别表示每个周几  1000000 表示只周一提醒）
      ring: null, //			铃声
      tips_start: null, //	开始好友提示语
      tips_delay: null,//	延迟好友提示语
      tips_end: null, //	结束好友提示语
      interval_min: 5, //	再响间隔（分钟）
      interval_cnt: 2, //	再响次数
      contacts: [], //		设置时为联系人结构体ID数组；获取时为联系人结构体数组
      status: null,
      selectContacts:[]
    };
  }

  componentDidMount() {
    if (this.state.addType == 'edit') {
      this.loadHabitDetail();
    } else {
      this.loadContactList();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.content}>
        <Header title={this.state.addType == 'add' ? '新建打卡任务': '修改打卡任务'} navigation={this.props.navigation} />
        <TouchableOpacity  style={styles.content} activeOpacity={1} onPress={() => {
          Keyboard.dismiss()
        }}>
          <ScrollView>
              <SelectModal onSelectData={this.SelectData.bind(this)} />
              <NormalNameItem changeText={this.changeName.bind(this)} name={this.state.name} icon={this.state.icon} changeIcon={this.changeIcon.bind(this)} />
              <NormalRepeatItem
                repeats={this.state.repeats}
                changeRepeatsNum={this.changeRepeatNumAction.bind(this)} />
              <NormalDateSelectItem
                startTime={this.state.start_time == null ? this.state.start_time : new Date(this.state.start_time)}
                endTime = {this.state.end_time == null ? this.state.end_time: new Date(this.state.end_time)}
                changeTime={this.changeTimeAction.bind(this)} />
              <NormalRemindItem
                clockTime={this.state.clock_time == null? this.state.clock_time: new Date(this.state.clock_time)}
                changeTime={this.changeClockTime.bind(this)} />
              <NormalRemindTextItem title="开始提示语" type='start' value={this.state.tips_start} placeholder="请输入开始提示语" onChangeText={this.changeText.bind(this)} />
              <NormalRemindTextItem title="延迟提示语" type='delay' value={this.state.tips_delay} placeholder="请输入延迟提示语" onChangeText={this.changeText.bind(this)} />
              <NormalRemindTextItem title="结束提示语" type='end'   value={this.state.tips_end}   placeholder="请输入结束提示语" onChangeText={this.changeText.bind(this)} />
              <NormalContractItem onChangeContact={this.changeContact.bind(this)} contactList={this.state.selectContacts} />
              <TouchableOpacity onPress={this.addNewNormalClock.bind(this)} style={styles.saveButton}>
                <Text style={styles.saveText}>保存</Text>
              </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  rightComponent = () => {
    return (
      <TouchableOpacity>
        <Text>保存</Text>
      </TouchableOpacity>
    );
  };
  changeContact(contact) {
    this.setState({
      selectContacts: contact
    })
  }

  changeIcon(icon) {
    this.setState({
      icon: icon
    })
  }

  // 选择模板数据
  SelectData(data) {
    this.setState({
      id: null, // 任务id
      icon: data.icon,		//图标
      tmpl_id: data.id,	//模板ID
      name: data.name,	//任务名称
      clock_time: data.clock_time, //	提醒时间
      start_time: data.start_time, //	开始日期
      end_time: data.end_time, //		结束日期
      repeats: data.repeats, //	   	重复规律（7位 位运算，分别表示每个周几  1000000 表示只周一提醒）
      ring: data.ring, //			铃声
      tips_start: data.tips_start, //	开始好友提示语
      tips_delay: data.tips_delay,//	延迟好友提示语
      tips_end: data.tips_end, //	结束好友提示语
      interval_min: data.interval_min, //	再响间隔（分钟）
      interval_cnt: data.interval_cnt, //	再响次数
      status: null
    })
  }

  changeName(text) {
    this.setState({ name: text })
  }

  changeRepeatNumAction(num) {
    this.setState({
      repeats: num
    })
  }

  changeTimeAction(startTime, endTime) {
    this.setState({
      start_time: startTime == null? startTime: startTime.toISOString(),
      end_time:endTime == null ? endTime: endTime.toISOString()
    })
  }

  changeClockTime(time) {
    this.setState({
      clock_time: time == null ? time: time.toISOString()
    })
  }

  changeText(type, text) {
    switch(type) {
      case 'start':
        this.setState({
          tips_start: text
        })
        break;
      case 'delay':
        this.setState({
          tips_delay: text
        })
        break;
      case 'end':
        this.setState({
          tips_end: text
        })
        break;
    }
  }

  addNewNormalClock() {
    if (!global.isLogin) {
      this.props.navigation.navigate('LoginView');
      return;
    }
    if (this.state.name == null) {
      Toast.info('请输入姓名！');
      return;
    }

    if (this.state.clock_time == null) {
      Toast.info('请输入提醒时间！');
      return;
    }

    if (this.state.tips_start == null) {
      Toast.info('请输入开始提示音！');
      return;
    }

    if (this.state.tips_delay == null) {
      Toast.info('请输入延迟提示音！');
      return;
    }

    if (this.state.tips_end == null) {
      Toast.info('请输入结束提示音！');
      return;
    }

    const data = {
      params: {
        id: this.state.id,
        icon: this.state.icon || '',
        tmpl_id: this.state.tmpl_id,
        name: this.state.name,
        clock_time: this.state.clock_time,
        start_time: this.state.start_time == null? String(new Date().toISOString()): this.state.start_time,
        end_time: this.state.end_time == null ? null: this.state.end_time,
        repeats: this.state.repeats,
        ring: this.state.ring || '',
        tips_start: this.state.tips_start,
        tips_delay: this.state.tips_delay,
        tips_end: this.state.tips_end,
        // interval_min: this.state.interval_min,
        interval_min: 2,
        interval_cnt: this.state.interval_cnt,
        contacts: this.state.selectContacts
      },
      callback: this.addClockCallback.bind(this)
    }

    if (this.state.addType == 'add') {
       // addCustomerClock
      addCustomerClock(data);
    } else {
      editCustomerClock(data);
    }
  }
  addClockCallback(res) {
    const { success, error } = res;
    if (success) {
      const { data } = res;
      if (this.state.addType == 'add') {
        Toast.info('添加成功！');
        DeviceEventEmitter.emit('taskReload');
        DeviceEventEmitter.emit('taskListReload');
      } else {
        Toast.info('修改成功');
        DeviceEventEmitter.emit('taskReload');
        DeviceEventEmitter.emit('taskListReload');
        this.removeNativeClock(this.state.id, this.state.repeats);
      }
      this.addNativeClock(data)
      this.props.navigation.goBack();
    } else {
      Toast.info(error);
    }
  }

  addNativeClock(data) {
      const { id } = data;
      let date = new Date(this.state.clock_time);
      let timeString = formatDateToString(date);
      var alarmManager = NativeModules.AlarmManager;
      let aString = this.switchToArray(this.state.repeats);
      let weeks = this.showItem(aString);
      alarmManager.addNormalAlarm('normal-'+ id, this.state.name, timeString, weeks, 'add');
  }

  switchToArray(repeats) {
    let value = parseInt(repeats + '').toString(2);
    let l = value.length;    //获取要格式化数字的长度，如二进制1的话长度为1
    if(l < 7){     //补全位数 0000，这里我要显示4位
        for(var i = 0; i < 7-l; i++) {
            value = "0" + value;     //不够的就在前面补0
        }
    }
    return value;
  }

  showItem(aString) {
      let data = []
      for (let i = 0;i < aString.length; i++) {
          if (aString[i] == '1') {
              switch(i) {
                  case 0:
                  data.push('周一');
                  break;
                  case 1:
                  data.push('周二')
                  break;
                  case 2:
                  data.push('周三');
                  break;
                  case 3:
                  data.push('周四')
                  break;
                  case 4:
                  data.push('周五');
                  break;
                  case 5:
                  data.push('周六')
                  break;
                  case 6:
                  data.push('周日')
                  break;
                  default:
                      break;
              }
          }
      }
      return data;
  }

  loadHabitDetail() {
    getClockDetailById({
      id: this.state.id,
      callback: this.loadHabitDetailCallback.bind(this)
    })
  }

  loadHabitDetailCallback(res) {
    const { success, data } = res;
    const { clock_time } = data;

    let date = new Date();
    let dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + clock_time;

    newDate = (new Date(Date.parse(dateString))).toJSON();

    let aArray = [];
    for (let i = 0; i < data.contacts.length;i++) {
      aArray.push(data.contacts[i].contact_id);
    }

    if (success) {
      this.setState({
        id: data.id,
        tmpl_id: data.tmpl_id,
        name: data.name,
        clock_time: newDate,
        start_time: data.start_time,
        end_time: data.end_time,
        repeats: data.repeats,
        ring: data.ring,
        tips_start: data.tips_start,
        tips_delay: data.tips_delay,
        tips_end: data.tips_end,
        interval_min: data.interval_min,
        interval_cnt: data.interval_cnt,
        selectContacts: aArray
      })
    }
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

  // onChangeContact()

  loadContactListCallback(res) {
    const { success } = res;
    if (success) {
      const { data } = res;
      let aArray = []
      for (let i = 0;i < data.length;i++) {
        aArray.push(data[i].id);
      }

      if (this.state.addType == 'add') {
        this.setState({
          selectContacts: aArray
        })
      }
    }
  }

  removeNativeClock(id, repeats) {
    let aString = this.switchToArray(repeats);
    let weeks = this.showItem(aString);
    var alarmManager = NativeModules.AlarmManager;
    alarmManager.removeNormalAlarmWithId('normal-' + id, weeks);
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveButton: {
    height: px(120),
    marginHorizontal: px(60),
    borderRadius: px(10),
    backgroundColor: '#ED7539',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(30),
    marginBottom: px(60)
  },
  saveText: {
    fontSize: px(40),
    color: '#fff'
  }
});
