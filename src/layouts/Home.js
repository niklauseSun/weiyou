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
  NativeEventEmitter,
  Platform,
  Linking,
  RefreshControl
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
  BeginModal,
  NormalAddItem,
  ContractItem,
  HomeContactHeader
} from '../components';
import {commonStyles} from '../commonStyles';
import {px, getCurrentDays, formatDateToString, checkAll, getPosition} from '../utils';
import {ASSET_IMAGES, E} from '../config';
import {
  getPersonalClockByDay,
  getSpecialClockByDay,
  unReadCount,
  signAction,
  getGuardianList,
  contractApplyByOther,
  getOssToken,
  agreeApply
} from '../requests';
import {Toast} from '@ant-design/react-native';
import JPush from 'jpush-react-native';
import * as WeChat from 'react-native-wechat'
import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";

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
      position: null,
      longitude: null,
      latitude: null,
      city: null,
      sign_total: 0,
      isContactLoading: false
    };
  }

  componentDidMount() {
    JPush.init();
    this.connectListener = result => {
        console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
        console.log("notificationListener:" + JSON.stringify(result))
        if (Platform.OS == 'android') {
          const { extras } = result;
          const { id, type } = extras;
          if (type == 'clock') {
            this.props.navigation.navigate('NormalSign', {
              id:id
            });
          } else if (type == 'punchNotice') {
            this.loadContractList();
            this.loadUnReadCount();
          } else {
            this.props.navigation.navigate('SignSpecial', {
              id:id
            })
          }
        }
    };
    JPush.addNotificationListener(this.notificationListener);
    //本地通知回调
    this.localNotificationListener = result => {
        console.log("localNotificationListener:" + JSON.stringify(result))
    };
    //tag alias事件回调
    this.tagAliasListener = result => {
        console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(this.tagAliasListener);

    this.listener = DeviceEventEmitter.addListener('taskReload', message => {
      //收到监听后想做的事情
      this.loadTasks();
      this.loadContractList();
      this.loadUnReadCount();
      this.addSign();
    });

    this.timer = setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 3000);
    if (Platform.OS == 'android') {
      checkAll();
    }

    const wxAppId = 'wxea535c9d15180464'
    WeChat.registerApp(wxAppId);

    this.loadWeekConfig();
    this.loadUnReadCount();
    this.loadContractList();
    this.addSign();

    this.handleLocalNotification();
    Linking.getInitialURL().then((url) => {
      if (url && Platform.OS == 'android') {
        console.log('Initial url is: ' + url);
        if (url.split('=').length == 2) {
          const query = decodeURIComponent(url.split('=')[1]);
          console.log('query', this.getQuery(query));
          const { from_customer_id = null } = this.getQuery(query);
          if (from_customer_id != null && from_customer_id != '') {
            contractApplyByOther({
              callback: this.beApplyByOther.bind(this, from_customer_id),
              customer_id: from_customer_id
            })
          }
        }
      }
    }).catch(err => console.error('An error occurred', err));
    this.getLocation();
  }

  getLocation() {
    setLocatingWithReGeocode(false);
        Geolocation.getCurrentPosition(({ coords, location }) => {
            const { latitude, longitude } = coords;
            console.log('lat', coords, location)

            const url = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${E.WEB_KEY}&radius=1000&extensions=all&poitype=`
            let opts = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": 'application/json;charset=utf-8',
                    "Connection": "keep-alive"
                },
                timeout: 60 * 1000,
            }

            fetch(url, opts).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((res) => {
                console.log('res', res);
                const { regeocode } = res;
                const { pois, formatted_address, addressComponent } = regeocode;
                const { adcode } = addressComponent;
                const { location } = pois[0];
                // const retAddress = `${province}${district}${township}${address}${name}`;
                const retCityCode = `${adcode}`;
                const retLatitude = location.split(',')[1];
                const retLongitude = location.split(',')[0]
                this.setState({
                    position: formatted_address,
                    longitude: retLongitude,
                    latitude: retLatitude,
                    city: retCityCode
                })
                // return {
                //     position: formatted_address,
                //     longitude: retLongitude,
                //     latitude: retLatitude,
                //     city: retCityCode
                // }
            }).catch(err => {
                console.log('err', err);
            })
        });
  }

  componentWillUnmount() {
    this.listener = null;
    this.timer = null;
    // JPush.removeListener(this.connectListener);
    // JPush.removeListener(this.notificationListener);
    // JPush.removeListener(this.localNotificationListener);
    // JPush.removeListener(this.tagAliasListener);
    // this.connectListener = null;
    // this.notificationListener = null;
    // this.localNotificationListener = null;
    // this.tagAliasListener = null;
    this.nativeEmitter.remove();
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
          {this.renderListItem()}
        </ScrollView>
        {/* <AddItem
          addNormal = {
              this.navigateToNormal.bind(this)
          }
          addSpecial = {
              this.navigateToSpecial.bind(this)
          }
        /> */}
        <SignSuccessModal sign_total={this.state.sign_total} dismiss={this.dismissSignSuccessModal.bind(this)} isShow={this.state.showSignSuccess}  />
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ContractItem navigation={this.props.navigation} data={item} />
          )}
          ListEmptyComponent={() => {
            return (
              <NormalAddItem
                type="addContact"
                title="添加您的监护人"
                subTitle="关注您的健康生活状态"
                imageUrl={ASSET_IMAGES.ICON_HOME_SPECIAL_ADD}
                navigation={this.props.navigation}
              />
            );
          }}
        />
      </View>
    );
  }

  _onRefresh() {
    this.loadUnReadCount();
    this.loadContractList();
    this.setState({
      isContactLoading: true
    })
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

  renderListItem() {
    return (
      <View style={styles.moduleContent}>
        <SectionHeader
          type={'normal'}
          title={'日常'}
          addAction={this.navigateToNormal.bind(this)}
        />
        <FlatList
          data={this.state.normalList.filter((item) => item.deleted == false)}
          renderItem={({item, index}) => <NormalItem
            navigation={this.props.navigation}
            data={item}
            position={this.state.position}
            longitude={this.state.longitude}
            latitude={this.state.latitude}
            city={this.state.city}
            key={index} />}
          keyExtractor={(item, index) => index.toString()}
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
          data={this.state.specialList.filter((item) => item.deleted == false)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SpecialItem
              navigation={this.props.navigation}
              data={item}
              key={index + this.state.normalList.length}
            />
          )}
          ListEmptyComponent={() => {
            return (
              <NormalAddItem
                imageUrl={ASSET_IMAGES.ICON_SPECIAL_DEFAULT}
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
    // let date = new Date('2020-02-23T13:53:36.669Z');
    // let timeString = formatDateToString(date);
    // var alarmManager = NativeModules.AlarmManager;
    // alarmManager.addNormalAlarm('normal'+ 7, '测试11', timeString, ['周三'], 'add');
  }

  navigateToSpecial() {
    this.props.navigation.navigate('AddSpecial');
    // let date = new Date('2020-03-05T07:38:50.669Z');
    // let timeString = formatDateToString(date);
    // var alarmManager = NativeModules.AlarmManager;
    // alarmManager.addSpecialAlarm('special', '我是测试 特殊', timeString);
  }

  changeDaySelect(index) {
    this.setState(
      {
        selectIndex: index,
      },
      () => {
        if (!global.isLogin) {
          return;
        }
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
        if (global.isLogin) {
          this.loadTasks();
        }
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
    const {success, data, error} = res;
    if (success) {
      this.setState({
        normalList: data,
      });
    } else if (error == '未登录') {
      global.isLogin = false;
      this.setState({
        normalList: [],
      })
    }
  }

  loadSpecialClockCallback(res) {
    console.log('special', res);
    const {success, data, error} = res;
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
    } else if (error == '未登录') {
      this.setState({
        specialList: [],
      })
    }
  }

  loadUnReadCount() {
    if (global.isLogin) {
      unReadCount({
        callback: this.loadUnReadCountCallback.bind(this),
      });
    }
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
    console.log('sign', res);
    const {success, data } = res;
    if (success) {
      const { sign_total } = data;
      this.setState(
        {
          showSignSuccess: true,
          sign_total: sign_total
        },
        () => {
          setTimeout(() => {
            this.setState({
                showSignSuccess: false,
              });
          }, 3000);
        },
      );
    }
  }

  loadContractList() {
    // getContractList
    if (!global.isLogin) {
      return;
    }
    const data = {
      pageNum: 0,
      pageSize: 10,
      isAsc: false,
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
    } else if (res.error == '未登录') {
      this.setState({
        contactList: [],
      })
    }
  }

  handleLocalNotification() {
    const {EventEmitterManager} = NativeModules;
    const nativeEmitterManager = new NativeEventEmitter(EventEmitterManager);
    this.nativeEmitter = nativeEmitterManager.addListener(
    'NativeResult',
    (data) => {
      console.log('native result', data);
      const { type, idStr } = data;
      if (type === 'notification') {
        if (idStr.split('-')[1] === '(null)') {
          console.log('ddd');
          return;
        }
        if (idStr.split('-')[0] === 'normal') {
          this.props.navigation.navigate('NormalSign', {
              id:idStr.split('-')[1]
          });
        } else {
          this.props.navigation.navigate('SignSpecial', {
            id:idStr.split('-')[1]
        });
        }
      }

      if (type === 'awake') {
        const { string } = data;
        if (string.split('=')[0] === 'customer_id') {
          console.log('be Apply', string.split('=')[1]);
          // contractApplyByOther
          contractApplyByOther({
            callback: this.beApplyByOther.bind(this, string.split("=")[1]),
            customer_id: string.split('=')[1]
          })
        }
      }
    })
  }

  beApplyByOther(customerid, res) {
    console.log('ddd', customerid, res);
    const { success, error, data } = res;
    if (success) {
      // agreeApply
      agreeApply({
        callback: this.agreeApplyCallback.bind(this),
        id: data
      })
    } else {
      Toast.info(error);
    }
  }

  agreeApplyCallback(res) {
    console.log('res apply', res);
    const { success, error } = res;
    if (success) {
      Toast.info('添加成功');
      DeviceEventEmitter.emit('taskReload')
      DeviceEventEmitter.emit('contactReload');
    } else {
      Toast.info(error);
    }
  }

  getQuery(url) {
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
    arr.forEach((item) => {
    let tempArr = item.substring(1).split('=');
    let key = decodeURIComponent(tempArr[0]);
    let val = decodeURIComponent(tempArr[1]);
    obj[key] = val;
      });
    }
    return obj;
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
