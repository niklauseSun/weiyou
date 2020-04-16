import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {ASSET_IMAGES} from '../config';
import {px} from '../utils';

export default class NormalRepeatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShow: false,
        selectIndexArray: [false, false, false, false, false, false, false]
    };
  }

  render() {
    const { repeats } = this.props;
    let aString = this.switchToArray(repeats)
    const showData = this.showItem(aString);
    return (
      <View style={styles.content}>
        {/* <View style={styles.headImage}></View> */}
        <Image style={styles.headImage} source={ASSET_IMAGES.ICON_SPECIAL_REPEAT} />
        <Text style={styles.title}>重复</Text>
        <TouchableOpacity onPress={this.closeModal.bind(this)} style={styles.selectButton}>
          {showData.map((item, index) => {
            return (
              <View key={index} style={styles.weekView}>
                <Text style={styles.weekText}>{item}</Text>
              </View>
            );
          })}
          <Image source={ASSET_IMAGES.ICON_MORE} />
        </TouchableOpacity>
        <Modal visible={this.state.isShow} transparent={true}>
          <View style={styles.showView}>
            <View style={styles.modalContent}>
                <View style={styles.headerView}>
                    <View style={styles.headerButtonView}/>
                    <Text style={styles.headerTitle}>选择</Text>
                    <TouchableOpacity onPress={this.closeModal.bind(this)} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>关闭</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.selectButtonViews}>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 0, aString)} style={aString[0] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[0] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>一</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 1, aString)} style={aString[1] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[1] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>二</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 2, aString)} style={aString[2] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[2] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>三</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 3, aString)} style={aString[3] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[3] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>四</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 4, aString)} style={aString[4] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[4] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>五</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 5, aString)} style={aString[5] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[5] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>六</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 6, aString)} style={aString[6] == '1'? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={aString[6] == '1'?styles.selectedWeekButtonText: styles.selectWeekButtonText}>日</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.selectAllBgView}>
                    <TouchableOpacity onPress={this.selectAll.bind(this)} style={styles.selectAllButton}>
                        <Text style={styles.selectAllButtonText}>全选</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.confirmView}>
                    <TouchableOpacity onPress={this.closeModal.bind(this)} style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>确认</Text>
                    </TouchableOpacity>
                </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }

    closeModal() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    selectAll() {
      const { changeRepeatsNum } = this.props;
      if (changeRepeatsNum) {
        changeRepeatsNum(127)
      }
    }

    changeSelectIndex(index, aString) {
      let array = (aString + '').split('');
      let selectString = aString[index];
      if (selectString == '0') {
        array[index] = '1'
      } else {
        array[index] = '0'
      }
      let num = parseInt(array.join(''), 2);
      const { changeRepeatsNum } = this.props;
      if (changeRepeatsNum) {
        changeRepeatsNum(num);
      }
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
    color: '#666'
  },
  selectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end'
  },
  subTitle: {
    flex: 1,
    textAlign: 'right',
    marginRight: px(20),
  },
  weekView: {
    borderRadius: px(6),
    backgroundColor: '#ED7539',
    padding: px(6),
    marginRight: px(15),
  },
  weekText: {
    fontSize: px(24),
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
  headerView: {
      height: px(80),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: px(30)
  },
  headerButtonView: {
      flex: 1
  },
  headerTitle: {
      flex: 1,
      color: '#ED7539',
      fontSize: px(36)
  },
  headerButtonText: {
      fontSize: px(26)
  },
  selectButtonViews: {
      flexDirection: 'row',
      width: '100%',
      height: px(80),
      alignItems: 'center',
      justifyContent: 'space-evenly'
  },
  selectWeekButton: {
      paddingHorizontal: px(10),
      paddingVertical: px(6),
      borderRadius: px(6)
  },
  selectedWeekButton: {
    paddingHorizontal: px(10),
      paddingVertical: px(6),
      backgroundColor: '#ED7539',
      borderRadius: px(10)
  },
  selectWeekButtonText: {
    color: '#ED7539',
    fontSize: px(34)
  },
  selectedWeekButtonText: {
    color: '#fff',
    fontSize: px(34)
  },
  selectAllBgView: {
      height: px(60),
      alignItems: 'flex-end',
      marginTop: px(30)
  },
  selectAllButton: {
      width: px(120),
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  selectAllButtonText: {
      fontSize: px(32),
      color: '#ED7539'
  },
  confirmView: {
      height: px(120),
      width: '100%',
      paddingHorizontal: px(60),
      marginTop: px(30)
  },
  confirmButton: {
      height: px(120),
      borderRadius: px(20),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ED7539'
  },
  confirmButtonText: {
      color: '#fff',
      fontSize: px(38)
  }
});
