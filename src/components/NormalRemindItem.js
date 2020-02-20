import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { ASSET_IMAGES } from '../config';
import { px, formatHour } from '../utils';

import { DatePicker } from '@ant-design/react-native';

export default class NormalRemindItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      selectTime: null
    };
  }

  render() {
    const { isShow } = this.state;
    return (
      <View style={styles.content}>
        <Image style={styles.headImage} source={ASSET_IMAGES.ICON_SPECIAL_TIME}  />
        <Text style={styles.title}>提醒</Text>
        <TouchableOpacity onPress={this.showDatePicker.bind(this)} style={styles.remindButton}>
            <Text style={styles.remindText}>{this.state.selectTime == null ? '+': formatHour(this.state.selectTime)}</Text>
        </TouchableOpacity>
        <DatePicker
          visible={isShow}
          value={this.state.selectTime}
          onOk={(e) => {
            this.setState({
              isShow: false,
              selectTime: e
            })
          }}
          onDismiss={(e) => {
            this.setState({
              isShow: false
            })
          }}
          mode='time'
          title="选择日期"
        />
      </View>
    );
  }
  showDatePicker() {
    this.setState({
      isShow: true,
    })
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: px(1),
    marginHorizontal: px(20),
    height: px(120),
    alignItems: 'center',
  },
  headImage: {
    width: px(44),
    height: px(44),
    marginRight: px(20)
  },
  title: {
    fontSize: px(32),
    color: '#666',
    flex: 1
  },
  remindButton: {
    width: px(120),
    height: px(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px(10),
    backgroundColor: '#eaeaea'
  },
  remindButtonText: {
    fontSize: px(28)
  },
  showView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
  },
  modalContent: {
    height: px(800),
    width: '100%',
    backgroundColor: '#fff',
  },
});
