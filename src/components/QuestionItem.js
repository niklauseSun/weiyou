import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class QuestionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data = null } = this.props;
        const { correct, question, answer = [] } = data || {}
        return (
            <View style={styles.content}>
                <View style={styles.questionView}>
                    <Text style={styles.questionTitle}>问题</Text>
                    <Text style={styles.title}>{question}</Text>
                </View>
                <View style={styles.answerView}>
                    <View style={styles.answerTitleView}>
                        <Text style={styles.answerTitle}>答案</Text>
                    </View>
                    <View style={styles.answerList}>
                        <View style={styles.firstLine}>
                            <Text style={styles.firstAnswer}>{answer[0]}</Text>
                            { correct == 0 ? <Text style={styles.correctText}>[正确]</Text>: null}
                        </View>
                        <View style={styles.secondLine}>
                            <Text style={styles.secondAnswer}>{answer[1]}</Text>
                            { correct == 1 ? <Text style={styles.correctText}>[正确]</Text>: null}
                        </View>
                    </View>
                </View>
                <View style={styles.editView}>
                    <TouchableOpacity onPress={this.showEdit.bind(this)} style={styles.editButton}>
                        <Text style={styles.editText}>修改</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    showEdit() {
        const { showEditView } = this.props;
        if (showEditView) {
            showEditView(this.props.data);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        marginHorizontal: px(30),
        borderRadius: px(30),
        backgroundColor: '#fff',
        marginTop: px(30),
        paddingHorizontal: px(30),
        paddingVertical: px(40)
    },
    questionView: {
        flexDirection: 'row',
    },
    questionTitle: {
        fontSize: px(30)
    },
    title: {
        fontSize: px(30),
        marginLeft: px(30)
    },
    answerView: {
        flexDirection: 'row',
        marginTop: px(40)
    },
    answerTitleView: {

    },
    answerTitle: {
        fontSize: px(30)
    },
    answerList: {
        marginLeft: px(30)
    },
    firstLine: {
        flexDirection: 'row'
    },
    secondLine: {
        flexDirection: 'row',
        marginTop: px(20)
    },
    firstAnswer: {
        fontSize: px(28),
        color: '#333'
    },
    secondAnswer: {
        fontSize: px(28),
        color: '#333'
    },
    correctText: {
        marginLeft: px(20),
        fontSize: px(24),
        color: 'red'
    },
    editView: {
        marginTop: px(40),
        width: '100%',
        alignItems: 'flex-end'
    },
    editButton: {
        width: px(120),
        height: px(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    editText: {
        fontSize: px(30),
        color: '#ED7539'
    }
})