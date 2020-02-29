import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  FlatList,
  SectionList,
  ScrollView,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';
import {
  Header,
  SignItem,
  AddItem,
  WarnHeader,
  SignSuccessModal,
  MessageItem,
  WeekItem,
  NormalItem,
  SpecialItem,
  SectionHeader,
  NoneData,
  BeginModal,
  NormalAddItem,
  SpecialAddItem,
  ContractItem,
  HomeContactHeader,
  GuardianItem,
} from '../components';
import {commonStyles} from '../commonStyles';
import {px, getCurrentDays, formatDateToString} from '../utils';
import {ASSET_IMAGES} from '../config';
import {
  getPersonalClockByDay,
  getSpecialClockByDay,
  unReadCount,
  signAction,
  getContractList,
  getGuardianList,
} from '../requests';
import {Toast} from '@ant-design/react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: null,
      today: null,
      selectIndex: 0,
      weeks: null,
      normalList: [],
      specialList: [],
      messageCnt: 0,
      showSignSuccess: false,
      isShow: false,
      contactList: [],
    };
  }

  componentDidMount() {
    this.loadWeekConfig();
    this.loadUnReadCount();
    this.addSign();
    this.loadContractList();

    this.listener = DeviceEventEmitter.addListener('taskReload', message => {
      //收到监听后想做的事情
      this.loadTasks();
    });

    this.timer = setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 3000);
  }

  componentWillUnmount() {
    this.listener = null;
    this.timer = null;
  }

  render() {
    const {messageCnt} = this.state;
    return (
      <SafeAreaView style={commonStyles.content}>
        {/* <Text>Home!</Text> */}
        <Header
          leftIsBack={false}
          title="唯友首页"
          rightComponent={this.rightComponent(messageCnt)}
        />
        {/* <SignItem /> */}
        <WeekItem
          currentWeek={this.state.currentWeek}
          weeks={this.state.weeks}
          selectIndex={this.state.selectIndex}
          onChangeSelect={this.changeDaySelect.bind(this)}
        />
        <ScrollView style={commonStyles.content}>
          {this.renderContactList()}
          {this.renderListItem(this.state.normalList, this.state.specialList)}
        </ScrollView>
        {/* <AddItem
                    addNormal = {
                        this.navigateToNormal.bind(this)
                    }
                    addSpecial = {
                        this.navigateToSpecial.bind(this)
                    }
                /> */}
        {/* <SignSuccessModal dismiss={this.dismissSignSuccessModal.bind(this)} isShow={this.state.showSignSuccess}  /> */}
        <BeginModal isShow={this.state.isShow} />
      </SafeAreaView>
    );
  }

  // view
  rightComponent(messageCnt) {
    return (
      <TouchableOpacity
        onPress={this.navigateToMessageList.bind(this)}
        activeOpacity={0.7}
        style={styles.messageButton}>
        <Image style={styles.messageIcon} source={ASSET_IMAGES.ICON_MESSAGE} />
        {this.renderUnReadComponent(messageCnt)}
      </TouchableOpacity>
    );
  }

  renderContactList() {
    return (
      <View style={styles.moduleContent}>
        <HomeContactHeader navigation={this.props.navigation} />
        <FlatList
          data={this.state.contactList.filter((item) => item.username != null)}
          renderItem={({item}) => (
            <ContractItem navigation={this.props.navigation} data={item} />
          )}
        />
      </View>
    );
  }

  renderUnReadComponent(messageCnt) {
    if (messageCnt == 0) return null;
    if (messageCnt <= 99) {
      return (
        <View style={styles.messageCount}>
          <Text style={styles.messageCountText}>{messageCnt}</Text>
        </View>
      );
    }
    return (
      <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>99+</Text>
      </View>
    );
  }

  renderListItem(normalList = [], specialList = []) {
    return (
      <View style={styles.moduleContent}>
        <SectionHeader
          type={'normal'}
          title={'日常'}
          addAction={this.navigateToNormal.bind(this)}
        />
        <FlatList
          data={normalList}
          renderItem={({item, index}) => <NormalItem data={item} key={index} />}
          ListEmptyComponent={() => {
            return (
              <NormalAddItem
                imageUrl={ASSET_IMAGES.ICON_HOME_NORMAL_ADD}
                navigation={this.props.navigation}
              />
            );
          }}
        />
        <SectionHeader
          type={'special'}
          title={'特殊'}
          addAction={this.navigateToSpecial.bind(this)}
        />
        <FlatList
          data={specialList}
          renderItem={({item, index}) => (
            <SpecialItem
              navigation={this.props.navigation}
              data={item}
              key={index + normalList.length}
            />
          )}
          ListEmptyComponent={() => {
            return (
              <NormalAddItem
                imageUrl={ASSET_IMAGES.ICON_HOME_SPECIAL_ADD}
                title="添加特殊打卡任务"
                subTitle="发生紧急情况通知监护人"
                type="special"
                navigation={this.props.navigation}
              />
            );
          }}
        />
        {/* {specialList.map((item, index) => {
                    return <SpecialItem navigation={this.props.navigation} data={item} key={index + normalList.length}/>
                })} */}
      </View>
    );
  }

  // action
  navigateToMessageList() {
    this.props.navigation.navigate('MessageList');
  }

  navigateToNormal() {
    this.props.navigation.navigate('AddHabitDetail');
    // let date = new Date('2020-02-23T09:50:36.669Z');
    // let timeString = formatDateToString(date);
    // var alarmManager = NativeModules.AlarmManager;
    // alarmManager.addNormalAlarm('normal'+ 7, '测试', timeString, ['周日']);
  }

  navigateToSpecial() {
    this.props.navigation.navigate('AddSpecial');
  }

  changeDaySelect(index) {
    this.setState(
      {
        selectIndex: index,
      },
      () => {
        this.loadTasks();
      },
    );
    LayoutAnimation.easeInEaseOut();
  }

  dismissSignSuccessModal() {
    this.setState({
      showSignSuccess: false,
    });
  }

  loadWeekConfig() {
    let days = getCurrentDays();
    const {currentWeek, today, weeks, requestWeeks} = days;
    const index = currentWeek.indexOf(today);
    this.setState(
      {
        currentWeek: currentWeek,
        today: today,
        weeks: weeks,
        selectIndex: index,
        requestWeeks: requestWeeks,
      },
      () => {
        this.loadTasks();
      },
    );
  }

  // request
  loadTasks() {
    Toast.info('加载中', 0.5);
    const {selectIndex, requestWeeks} = this.state;
    const data = {
      callback: this.loadClockCallback.bind(this),
      day: requestWeeks[selectIndex],
    };
    const specialData = {
      callback: this.loadSpecialClockCallback.bind(this),
      day: requestWeeks[selectIndex],
    };
    getPersonalClockByDay(data);
    getSpecialClockByDay(specialData);
  }

  loadClockCallback(res) {
    const {success, data} = res;
    if (success) {
      this.setState({
        normalList: data,
      });
    }
  }

  loadSpecialClockCallback(res) {
    console.log('special', res);
    const {success, data} = res;
    if (success) {
      this.setState({
        specialList: data,
      });

      let runArray = data.filter(item => item.status == 'runing');
      if (runArray.length >= 1) {
        // 跳转到 特殊打卡页面
        console.log('jump sign special');
        this.props.navigation.navigate('SignSpecial', {
          id: runArray[0].id,
          question_id: runArray[0].question_id,
        });
      }
    }
  }

  loadUnReadCount() {
    unReadCount({
      callback: this.loadUnReadCountCallback.bind(this),
    });
  }

  loadUnReadCountCallback(res) {
    const {success, data} = res;
    if (success) {
      const {messageCnt = 0} = data;
      this.setState({
        messageCnt: messageCnt,
      });
    }
  }

  addSign() {
    signAction({
      callback: this.addSignCallback.bind(this),
    });
  }

  addSignCallback(res) {
    const {success} = res;
    if (success) {
      this.setState(
        {
          showSignSuccess: true,
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                showSignSuccess: false,
              },
              3000,
            );
          });
        },
      );
    }
  }

  loadContractList() {
    // getContractList
    const data = {
      pageNum: 0,
      pageSize: 10,
      callback: this.loadContractListCallback.bind(this),
    };
    getGuardianList(data);
  }

  loadContractListCallback(res) {
    console.log('res contract', res);
    if (res.success) {
      this.setState({
        contactList: res.data,
      });
    }
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 12,
  },
  moduleContent: {
    marginHorizontal: px(30),
    borderColor: '#eaeaea',
    borderWidth: px(3),
    borderRadius: px(20),
    marginVertical: px(20),
    paddingVertical: px(30),
  },
  messageButton: {
    marginRight: px(30),
    width: px(60),
    height: px(60),
  },
  messageCount: {
    position: 'absolute',
    backgroundColor: 'red',
    height: px(36),
    width: px(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: px(40),
    borderRadius: px(18),
  },
  messageCountText: {
    fontSize: px(16),
    color: '#fff',
  },
  messageIcon: {
    marginLeft: px(10),
    marginTop: px(10),
  },
});
