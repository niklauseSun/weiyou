import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { recommendContractList, recommendContractApply } from '../requests';
import { NoneData } from '.';
import { px } from '../utils';
import { Toast, Modal } from '@ant-design/react-native';

const prompt = Modal.prompt;

export default class PredictContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: []
        }
    }

    componentDidMount() {
        this.loadPredictList();
    }

//     id: 83
// friend_id: 104
// reason: "系统推荐"
// status: "applying"
// username: "15256015621"
// nickname: "Sprlia"
// avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erttzb5tiaXyLT8zxsh0L7WHN9AdT283jF2sbXcovKBtFARawicshZG7vx

    render() {
        return (
            <View style={styles.content}>
                <FlatList
                    contentContainerStyle={styles.content}
                    data={this.state.recommendList.filter((item) => item.username != null )}
                    renderItem={({item}) => {
                        return <TouchableOpacity onPress={this.applyAction.bind(this, item)} style={styles.actionContent}>
                            {item.avatar == '' ? <View style={styles.headImage}></View> :<Image style={styles.headImage} source={{ uri: item.avatar }} /> }
                            <View style={styles.detail}>
                                <Text style={styles.name}>{item.nickname}</Text>
                                <Text style={styles.reason}>{item.reason}</Text>
                            </View>
                            <View style={styles.applyStatusView}>
                                <Text style={styles.applyStatus}>{item.status == 'applying'? '已申请': ''}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => <NoneData title="暂无推荐联系人" />}
                />
            </View>
        )
    }

    applyAction(item) {
        const { status } = item;
        if (status == 'applying') {
            Toast.info('已申请！');
            return;
        }
// recommendContractApply
        prompt(
            '请求成为我的监护人',
            '请输入添加理由',
            [
                { text: '取消' },
                { text: '提交', onPress: reason => {
                    this.apply(reason, item.id)
                } },
            ],
        )
    }

    apply(reason, id) {
        recommendContractApply({
            id: id,
            reason: reason,
            callback: this.applyCallback.bind(this)
        })
    }

    applyCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('添加成功');
            this.loadPredictList();
        } else {
            Toast.info(error);
        }
    }

    loadPredictList() {
        // recommendContractList
        if (!global.isLogin) {
            return;
        }
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadPredictListCallback.bind(this)
        }
        recommendContractList(data);
    }

    loadPredictListCallback(res) {
        const { success, data } = res;
        if (success) {
            this.setState({
                recommendList: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    actionContent: {
        paddingHorizontal: px(30),
        paddingVertical: px(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headImage: {
        height: px(90),
        width: px(90),
        borderRadius: px(45),
        backgroundColor: '#999'
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: px(20)
    },
    name: {
        fontSize: px(30),
        color: '#333'
    },
    reason: {
        fontSize: px(26),
        color: '#999',
        marginTop: px(10)
    },
    applyStatus: {
        fontSize: px(24),
        color: '#ED7539'
    }
})