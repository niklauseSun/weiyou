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
import { px } from '../utils';
import { Toast } from '@ant-design/react-native';
import { addCustomerClock } from '../requests';

export default class AddHabitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: '',
      id: null, // 任务id
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
      deleted: null, //		是否已删除
      contacts: null, //		设置时为联系人结构体ID数组；获取时为联系人结构体数组
      status: null
    };
  }

  render() {
    console.log('fff', this.state.taskData);
    return (
      <SafeAreaView style={styles.content}>
        <Header title="新建打卡任务" navigation={this.props.navigation} />
        <TouchableOpacity activeOpacity={1} onPress={() => {
          Keyboard.dismiss()
        }}>
          <ScrollView>
              <SelectModal onSelectData={this.SelectData.bind(this)} />
              <NormalNameItem changeText={this.changeName.bind(this)} name={this.state.name} icon={this.state.icon} />
              <NormalRepeatItem repeats={this.state.repeats} changeRepeatsNum={this.changeRepeatNumAction.bind(this)} />
              <NormalDateSelectItem startTime={this.state.start_time} endTime = {this.state.end_time} changeTime={this.changeTimeAction.bind(this)} />
              <NormalRemindItem clockTime={this.state.clock_time} changeTime={this.changeClockTime.bind(this)} />
              <NormalRemindTextItem title="开始提示音" type='start' value={this.state.tips_start} placeholder="请输入开始提示音" onChangeText={this.changeText.bind(this)} />
              <NormalRemindTextItem title="延迟提示音" type='delay' value={this.state.tips_delay} placeholder="请输入延迟提示音" onChangeText={this.changeText.bind(this)} />
              <NormalRemindTextItem title="结束提示音" type='end'   value={this.state.tips_end}   placeholder="请输入结束提示音" onChangeText={this.changeText.bind(this)} />
              <NormalContractItem />
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

  // 选择模板数据
  SelectData(data) {
    console.log('selctData', data);
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
      deleted: null, //		是否已删除
      contacts: null, //		设置时为联系人结构体ID数组；获取时为联系人结构体数组
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
      start_time: startTime,
      end_time:endTime
    })
  }

  changeClockTime(time) {
    this.setState({
      clock_time: time
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
        id: null,
        icon: this.state.icon || '',
        tmpl_id: this.state.tmpl_id,
        name: this.state.name,
        clock_time: this.state.clock_time,
        start_time: this.state.start_time == null? new Date().getTime(): this.state.start_time,
        end_time: this.state.end_time,
        repeats: this.state.repeats,
        ring: this.state.ring || '',
        tips_start: this.state.tips_start,
        tips_delay: this.state.tips_delay,
        tips_end: this.state.tips_end,
        interval_min: this.state.interval_min,
        interval_cnt: this.state.interval_cnt,
        deleted: this.state.deleted,
        contacts: this.state.contacts
      },
      callback: this.addClockCallback.bind(this)
    }

    console.log('addData', data);

    // addCustomerClock
    addCustomerClock(data);
  }
  addClockCallback(res) {
    const { success } = res;
    if (success) {
      Toast.info('添加成功！');
      DeviceEventEmitter.emit('taskReload');
      this.props.navigation.goBack();
    }
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
    marginTop: px(30)
  },
  saveText: {
    fontSize: px(40),
    color: '#fff'
  }
});
