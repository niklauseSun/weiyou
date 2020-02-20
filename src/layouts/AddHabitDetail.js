import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
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

export default class AddHabitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: null
    };
  }

  render() {
    console.log('fff', this.state.taskData);
    return (
      <SafeAreaView style={styles.content}>
        <Header title="新建打卡任务" navigation={this.props.navigation} />
        <SelectModal onSelectData={this.SelectData.bind(this)} />
        <NormalNameItem changeText={this.changeName.bind(this)} data={this.state.taskData} />
        <NormalRepeatItem />
        <NormalDateSelectItem />
        <NormalRemindItem />
        <NormalRemindTextItem title="开始提示音" placeholder="请输入开始提示音" />
        <NormalRemindTextItem title="延迟提示音" placeholder="请输入延迟提示音" />
        <NormalRemindTextItem title="结束提示音" placeholder="请输入结束提示音" />
        <NormalContractItem />
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
    this.setState({
      taskData: data
    })
  }

  changeName(text) {
    let data = Object.assign({}, this.state.taskData, { name: text })
    this.setState({
      taskData: data
    })
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
