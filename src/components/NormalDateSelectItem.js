import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {px, formateDateType} from '../utils';
import {DatePicker} from '@ant-design/react-native';

export default class NormalDateSelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimeShow: false,
      endTimeShow: false,
      startTime: null,
      endTime: null,
    };
  }

  render() {
    const {startTime = '', endTime = ''} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.startView}>
          <Text style={styles.title}>开始时间</Text>
          <TouchableOpacity onPress={this.showStartSelect.bind(this)} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{this.state.startTime == null ? '今天': formateDateType(this.state.startTime)}</Text>
          </TouchableOpacity>
          {/* <Text style={styles.subTitle}>subTitle</Text> */}
        </View>
        <View style={styles.endView}>
          <Text style={styles.title}>结束时间</Text>
          <TouchableOpacity onPress={this.showEndSelect.bind(this)} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{this.state.endTime == null ? '无限期目标': formateDateType(this.state.endTime)}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          minDate={new Date()}
          value={ this.state.startTimeShow ? this.state.startTime: this.state.endTime}
          visible={this.state.startTimeShow || this.state.endTimeShow}
          mode='date'
          onOk={(e) => {
              if (this.state.startTimeShow) {
                this.setState({
                    startTimeShow: false,
                    startTime: e
                })
              } else {
                this.setState({
                    endTimeShow: false,
                    endTime: e
                })
              }
          }}
          onDismiss={() => {
              this.setState({
                  startTimeShow: false,
                  endTimeShow: false
              })
          }}
        />
      </View>
    );
  }

  showStartSelect() {
    this.setState({
      startTimeShow: true,
    });
  }

  dismissStartSelect() {
    this.setState({
      startTimeShow: false,
    });
  }

  showEndSelect() {
    this.setState({
      endTimeShow: true,
    });
  }

  dismissEndSelect() {
    this.setState({
      endTimeShow: false,
    });
  }
}

const styles = StyleSheet.create({
  content: {
    height: px(240),
    borderBottomColor: '#eaeaea',
    borderBottomWidth: px(1),
    marginHorizontal: px(30),
    flexDirection: 'row',
  },
  startView: {
    flex: 1,
    justifyContent: 'center',
    borderRightColor: 'red',
  },
  endView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: px(30),
  },
  title: {
    color: '#999',
    fontSize: px(28),
    marginBottom: px(10),
  },
  selectButton: {
    paddingVertical: px(6),
  },
  selectButtonText: {
    fontSize: px(36),
    color: '#ED7539',
  },
});
