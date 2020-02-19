import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  SectionList,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, AddNormalItem, AddNormalHeader, TabHeader} from '../components';
import {px} from '../utils';
import {commonStyles} from '../commonStyles';

export default class AddHabit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnList: [
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
      ],
      healthList: [
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
      ],
      motionList: [
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
      ],
      emotionList: [
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
        {
          title: '早起',
          time: '08:30',
        },
      ],
      selectIndex: 0,
      tabTitles: ['运动', '学习', '运动', '情歌'],
    };
  }

  render() {
    const dataArray = this.showArray();

    return (
      <SafeAreaView style={commonStyles.content}>
        <Header navigation={this.props.navigation} title="新建打卡任务" />
        <TabHeader
          data={this.state.tabTitles}
          selectIndex={this.state.selectIndex}
          onChangeTabIndex={this.changeIndex.bind(this)}
        />
        <FlatList
          data={dataArray}
          numColumns={2}
          renderItem={({item}) => (
            <AddNormalItem navigation={this.props.navigation} data={item} />
          )}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>自定义</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  showArray() {
    switch (this.state.selectIndex) {
      case 0:
        return this.state.healthList;
      case 1:
        return this.state.learnList;
      case 2:
        return this.state.motionList;
      case 3:
        return this.state.emotionList;
      default:
        return this.state.healthList;
    }
  }

  changeIndex(index) {
    this.setState({
      selectIndex: index,
    });
  }
}

const styles = StyleSheet.create({
  addButton: {
    width: '100%',
    height: px(120),
    marginHorizontal: px(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px(20),
    borderRadius: px(10),
  },
  addButtonText: {
    color: '#fff',
    fontSize: px(32),
  },
});
