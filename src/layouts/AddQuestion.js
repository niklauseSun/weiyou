import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Header, QuestionItem, NoneData} from '../components';
import {commonStyles} from '../commonStyles';
import {getPersonQuestionList, editPersonQuestion, addPersonQuestion} from '../requests';
import {px} from '../utils';
import { Toast } from '@ant-design/react-native';

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      isShow: false,
      id: null,
      customer_id: null,
      question: null,
      answer: [],
      correct: 0,
    };
  }

  componentDidMount() {
    this.loadQuestions();
  }

  render() {
    const {isShow} = this.state;
    return (
      <SafeAreaView style={commonStyles.content}>
        <Header
          title="问题答案"
          navigation={this.props.navigation}
          rightComponent={this.renderRightComponent()}
        />
        <View style={commonStyles.body}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.questionList}
            ListEmptyComponent={() => <NoneData title="暂无问题，请添加问题"/>}
            renderItem={({item, index}) => {
              return (
                <QuestionItem
                  showEditView={this.showEditView.bind(this)}
                  data={item}
                  navigation={this.props.navigation}
                  key={index + ''}
                />
              );
            }}
          />
        </View>
        <Modal visible={isShow} transparent={true}>
          <View style={styles.showView}>
            <View style={styles.modalContent}>
              <View style={styles.closeBgView}>
                <TouchableOpacity
                  onPress={this.showAddQuestion.bind(this)}
                  style={styles.closeButton}>
                  <Text>关闭</Text>
                </TouchableOpacity>
              </View>
              <SafeAreaView style={styles.contractView}>
                <View style={styles.questionView}>
                  <Text style={styles.questionTitle}>问题</Text>
                  <TextInput onChangeText={(e) => {
                    this.setState({
                      question: e
                    })
                  }} value={this.state.question} placeholder={'请输入问题'} style={styles.questionInput} />
                </View>
                <View style={styles.answerView}>
                  <View style={styles.answerTitleView}>
                    <Text style={styles.answerTitle}>答案</Text>
                  </View>
                  <View style={styles.answerInputView}>
                      <View style={styles.answerInputItem}>
                          <TextInput onChangeText={(e) => {
                            let aArray = this.state.answer;
                            aArray[0] = e;
                            this.setState({
                              answer: aArray
                            })
                          }} value={this.state.answer[0]} placeholder={"请输入一个问题"} style={styles.answerInput} />
                          <TouchableOpacity onPress={this.correctSelect.bind(this, 0)} style={styles.answerButton}>
                              {this.state.correct == 0 ? <Text style={styles.answerText}>选择</Text>: null}
                          </TouchableOpacity>
                      </View>
                      <View style={styles.answerInputItem}>
                          <TextInput onChangeText={(e) => {
                            let aArray = this.state.answer;
                            aArray[1] = e;
                            this.setState({
                              answer: aArray
                            })
                          }} value={this.state.answer[1]} placeholder={"请输入一个问题"} style={styles.answerInput} />
                          <TouchableOpacity onPress={this.correctSelect.bind(this, 1)} style={styles.answerButton}>
                            {this.state.correct == 1 ? <Text style={styles.answerText}>选择</Text>: null}
                          </TouchableOpacity>
                      </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={this.saveQuestion.bind(this)}>
                  <Text style={styles.saveButtonText}>保存</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  renderRightComponent() {
    return (
      <TouchableOpacity
        onPress={this.showAddView.bind(this)}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>添加</Text>
      </TouchableOpacity>
    );
  }

  showAddQuestion() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  correctSelect(index) {
    this.setState({
      correct: index
    })
  }

  showAddView() {
    if (!global.isLogin) {
      this.props.navigation.navigate('LoginView');
      return;
    }
    this.setState({
      id: null,
      question: null,
      answer: [],
      correct: 0,
      isShow: true,
    });
  }

  showEditView(data) {
    const {id, customer_id, question, answer, correct} = data;
    this.setState({
      id: id,
      customer_id: id,
      question: question,
      answer: answer,
      correct: correct,
      isShow: true,
    });
  }

  saveQuestion() {
    const { question, answer } = this.state;

    if (question == null) {
      Toast.info('请输入问题');
      return;
    }

    if (answer.length == 0) {
      Toast.info('请输入答案');
      return;
    }

    const data = {
      params: {
        id: this.state.id,
        customer_id: this.state.customer_id,
        question: this.state.question,
        answer: this.state.answer,
        correct: this.state.correct
      },
      callback: this.saveCallback.bind(this)
    }

    if (this.state.id) {
      editPersonQuestion(data);
    } else {
      addPersonQuestion(data);
    }
  }

  saveCallback(res) {
    console.log('res', res);
    const { success } = res;
    if (success) {
      Toast.info('保存成功');
      this.setState({
        isShow: false
      })
      this.loadQuestions();
    }
  }

  loadQuestions() {
    if (!global.isLogin) {
      return;
    }
    const data = {
      pageNum: 0,
      pageSize: 10,
      callback: this.loadQuestionCallback.bind(this),
    };

    getPersonQuestionList(data);
  }

  loadQuestionCallback(res) {
    console.log('res', res);
    const {success, data} = res;
    if (success) {
      this.setState({
        questionList: data,
      });
    }
  }
}

const styles = StyleSheet.create({
  addButton: {
    width: px(120),
    height: px(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ED7539',
  },
  showView: {
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
  contractView: {
      flex: 1,
      paddingHorizontal: px(30)
  },
  questionView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionTitle: {
      fontSize: px(32),
      color: '#333',
      marginLeft: px(20),
      marginRight: px(20)
  },
  questionInput: {
      flex: 1,
      paddingHorizontal: px(10),
      color: '#999'
  },
  answerView: {
      flexDirection: 'row',
      marginTop: px(30),
  },
  answerTitleView: {
      marginLeft: px(20),
      marginRight: px(20)
  },
  answerTitle: {
      fontSize: px(32),
      marginTop: px(15)
  },
  answerInputView: {
    flex: 1,
    height: px(160)
  },
  answerInputItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  answerInput: {
      flex: 1,
      color: '#999'
  },
  answerButton: {
    width: px(80),
    height: px(60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerText: {
      fontSize: px(26)
  },
  saveButton: {
    height: px(110),
    marginTop: px(30),
    marginHorizontal: px(60),
    backgroundColor: '#ED7539',
    borderRadius: px(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: px(34)
  }
});
