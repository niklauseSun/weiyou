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
    const showData = this.showItem();
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
                    <Text style={styles.headerTitle}>title</Text>
                    <TouchableOpacity onPress={this.closeModal.bind(this)} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>关闭</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.selectButtonViews}>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 0)} style={this.state.selectIndexArray[0]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[0]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>日</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 1)} style={this.state.selectIndexArray[1]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[1]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>一</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 2)} style={this.state.selectIndexArray[2]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[2]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>二</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 3)} style={this.state.selectIndexArray[3]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[3]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>三</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 4)} style={this.state.selectIndexArray[4]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[4]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>四</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 5)} style={this.state.selectIndexArray[5]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[5]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>五</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeSelectIndex.bind(this, 6)} style={this.state.selectIndexArray[6]? styles.selectedWeekButton: styles.selectWeekButton}>
                        <Text style={this.state.selectIndexArray[6]?styles.selectedWeekButtonText: styles.selectWeekButtonText}>六</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.selectAllBgView}>
                    <TouchableOpacity style={styles.selectAllButton}>
                        <Text style={styles.selectAllButtonText}>全选</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.confirmView}>
                    <TouchableOpacity style={styles.confirmButton}>
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
        console.log('close')
        this.setState({
            isShow: !this.state.isShow
        })
    }

    changeSelectIndex(index) {
        let data = this.state.selectIndexArray;
        data[index] = !data[index];
        this.setState({
            selectIndexArray: data
        })
    }

    showItem() {
        let data = []
        for (let i = 0;i < this.state.selectIndexArray.length; i++) {
            if (this.state.selectIndexArray[i]) {
                switch(i) {
                    case 0:
                    data.push('周日');
                    break;
                    case 1:
                    data.push('周一')
                    break;
                    case 2:
                    data.push('周二');
                    break;
                    case 3:
                    data.push('周三')
                    break;
                    case 4:
                    data.push('周四');
                    break;
                    case 5:
                    data.push('周无')
                    break;
                    case 6:
                    data.push('周六')
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
    padding: px(10),
    marginRight: px(15),
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
