import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {px} from '../utils';
import {TabHeader, AddNormalItem, NoneData} from '.';
import {getAllCategory, getClockTmp} from '../requests';

export default class SelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      category: [],
      clockList: [],
      selectIndex: 0,
    };
  }

  componentDidMount() {
    this.loadAllCategory();
  }

  render() {
    const {isShow = true} = this.state;
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={this.showModal.bind(this)} style={styles.selectModalButton}>
          <Text style={styles.selectModalButtonText}>选择模板</Text>
        </TouchableOpacity>
        <Modal visible={isShow} transparent={true}>
          <View style={styles.showView}>
            <View style={styles.modalContent}>
              <View style={styles.closeBgView}>
                <TouchableOpacity onPress={this.showModal.bind(this)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>关闭</Text>
                </TouchableOpacity>
              </View>
              <TabHeader
                data={this.state.category}
                selectIndex={this.state.selectIndex}
                onChangeTabIndex={this.changeIndex.bind(this)}
              />
              {this.state.clockList.length == 0 ? null : (
                <FlatList
                  data={this.state.clockList.filter(item => {
                    return (
                      item.category_id ===
                      this.state.category[this.state.selectIndex].id
                    );
                  })}
                  numColumns={2}
                  renderItem={({item}) => (
                    <AddNormalItem
                      changeData={this.selectData.bind(this)}
                      navigation={this.props.navigation}
                      data={item}
                    />
                  )}
                  ListEmptyComponent={() => <NoneData title="暂无模板" />}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // action
  changeIndex(index) {
    this.setState({
      selectIndex: index,
    });
  }

  selectData(data) {
    const {onSelectData} = this.props;
    if (onSelectData) {
      onSelectData(data);
      this.setState({
        isShow: false,
      });
    }
  }

  showModal() {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  loadAllCategory() {
    // getAllCategory
    getAllCategory({
      callback: this.loadAllCategoryCallback.bind(this),
    });
  }

  loadAllCategoryCallback(res) {
    console.log('category', res);

    const {success, data} = res;
    if (success) {
      this.setState(
        {
          category: data,
        },
        () => {
          this.loadAllNormal();
        },
      );
    }
  }

  loadAllNormal() {
    // getClockTmp
    getClockTmp({
      callback: this.loadAllNormalCallback.bind(this),
    });
  }

  loadAllNormalCallback(res) {
    console.log('clock', res);
    const {success, data} = res;
    if (success) {
      this.setState({
        clockList: data,
      });
    }
  }
}

const styles = StyleSheet.create({
  content: {
    height: px(60),
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: px(30)
  },
  selectModalButton: {
    height: '100%',
    justifyContent: 'center'
  },
  selectModalButtonText: {
    color: '#ED7539'
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
  closeBgView: {
    height: px(60),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: px(30),
  },
  closeButton: {
    height: '100%',
    justifyContent: 'center'
  }
});
