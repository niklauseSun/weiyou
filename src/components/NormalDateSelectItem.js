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
    };
  }

  render() {
    const {startTime = null, endTime = null } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.startView}>
          <Text style={styles.title}>开始时间</Text>
          <TouchableOpacity onPress={this.showStartSelect.bind(this)} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{startTime == null ? '今天': formateDateType(startTime)}</Text>
          </TouchableOpacity>
          {/* <Text style={styles.subTitle}>subTitle</Text> */}
        </View>
        <View style={styles.endView}>
          <Text style={styles.title}>结束时间</Text>
          <TouchableOpacity onPress={this.showEndSelect.bind(this)} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{endTime == null ? '无限期目标': formateDateType(endTime)}</Text>
            {
              this.props.endTime == null ? null :  <TouchableOpacity style={styles.endLessButton} onPress={this.resetTime.bind(this)}>
                <Text style={styles.endLessButtonText}>x</Text>
              </TouchableOpacity>
            }
          </TouchableOpacity>
        </View>
        <DatePicker
          minDate={new Date()}
          value={ this.state.startTimeShow ? startTime: endTime}
          visible={this.state.startTimeShow || this.state.endTimeShow}
          mode='date'
          onOk={(e) => {
              if (this.state.startTimeShow) {
                this.setState({
                    startTimeShow: false,
                })
                const { changeTime } = this.props;
                changeTime(e, this.props.endTime);
              } else {
                this.setState({
                    endTimeShow: false,
                })
                const { changeTime } = this.props;
                changeTime(this.props.startTime, e);
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

  resetTime() {
    const { changeTime } = this.props;
    changeTime(this.props.startTime, null);
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
    flexDirection: 'row'
  },
  selectButtonText: {
    fontSize: px(36),
    color: '#ED7539',
  },
  endLessButton: {
    // marginTop: px(30),
    marginLeft: px(60),
    width: '100%',
    height: '100%'
  },
  endLessButtonText: {
    color: '#999'
  }
});
