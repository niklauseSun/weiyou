import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {commonStyles} from '../commonStyles';
import {
  Header,
  QuestionReportItem,
  LineItem,
  QuestionDescribe,
} from '../components';
import {px} from '../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { addUserOpinion } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class QuestionReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: ['闪退', '卡顿', '黑屏/白屏', '死机', '界面异常', '其他'],
      selectIndex: 0,
      uploadImageList: [],
      question: null,
      contract: null,
    };
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.content}>
        <Header title="意见反馈" />
        <ScrollView style={commonStyles.body}>
          <Text style={styles.titleLabel}>
            请选择你在闪退、卡顿或界面异常中遇到的问题
          </Text>
          <FlatList
            data={this.state.questionList}
            renderItem={({item, index}) => (
              <QuestionReportItem
                title={item}
                index={index}
                selectIndex={this.state.selectIndex}
                changeIndex={this.onChangeIndex.bind(this)}
              />
            )}
            ItemSeparatorComponent={() => <LineItem />}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
          <QuestionDescribe
            changeImageList={this.changeImageList.bind(this)}
            imageList={this.state.uploadImageList}
            question={this.state.question}
            onChangeQuestion={this.changeQuestion.bind(this)}
          />
          <View style={styles.contactView}>
            <Text style={styles.contactTitle}>联系方式</Text>
            <TextInput
              style={styles.contactInput}
              placeholder="请填写你的手机号或邮箱，便于我们与您联系"
              value={this.state.contract}
              onChangeText={this.changeContract.bind(this)}
            />
          </View>
          <View style={styles.numberView}>
            <Text style={styles.numTitle}>
              维护人：QQ：460266899 微信：12366169917
            </Text>
          </View>
          <TouchableOpacity onPress={this.reportQuestion.bind(this)} style={styles.submitButton}>
            <Text style={styles.submitText}>提交</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  changeContract(text) {
      this.setState({
        contract: text
      })
  }

  onChangeIndex(index) {
    this.setState({
      selectIndex: index,
    });
  }

  changeQuestion(text) {
      this.setState({
          question: text
      })
  }

  changeImageList(imgs) {
    this.setState({
      uploadImageList: imgs,
    });
  }

  removeImage(index) {
    if (this.state.uploadImageList.length > index) {
      this.setState({
        uploadImageList: this.state.uploadImageList.filter(
          (value, idx) => idx == index,
        ),
      });
    }
  }

  onOpenImagePick() {
    // maxFiles
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 4,
    }).then(images => {
      console.log('images', images);
    });
  }

  reportQuestion() {
    // addUserOpinion
//     contact_info	联系方式
// reason		原因
// pictures		图片地址数组
// content		内容
    if (this.state.question == null || this.state.question.length == 0) {
        Toast.info('请填写问题描述');
        return;
    }

    if (this.state.contract == null || this.state.contract.length == 0) {
        Toast.info('请填写联系方式');
        return;
    }

    addUserOpinion({
        params: {
            contact_info: this.state.contract,
            reason: this.state.questionList[this.state.selectIndex],
            pictures: this.state.uploadImageList,
            content: this.state.question
        },
        callback: this.reportCallback.bind(this)
    })
  }

    reportCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('提交成功');
            this.props.navigation.goBack();
        } else {
            Toast.info(error);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
  titleLabel: {
    marginVertical: px(30),
    marginLeft: px(30),
    fontSize: px(26),
    color: '#666',
  },
  contactView: {
    marginTop: px(20),
    backgroundColor: '#fff',
    paddingHorizontal: px(30),
  },
  contactTitle: {
    marginTop: px(30),
    marginBottom: px(30),
    fontSize: px(28),
    fontWeight: 'bold',
  },
  contactInput: {
    marginBottom: px(40),
    justifyContent: 'center',
  },
  numberView: {
    height: px(90),
    paddingHorizontal: px(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  numTitle: {
    fontSize: px(26),
  },
  submitButton: {
    marginTop: px(60),
    marginBottom: px(40),
    marginHorizontal: px(50),
    backgroundColor: '#ED7539',
    height: px(120),
    borderRadius: px(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: px(34),
    color: '#fff',
  },
});
