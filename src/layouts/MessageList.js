import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, DeviceEventEmitter } from 'react-native'
import { Header, MessageItem } from '../components';
import { commonStyles } from '../commonStyles';
import { getMessageList } from '../requests';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            pageIndex: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        this.emitter = DeviceEventEmitter.addListener('reloadMessageList', message => {
            //收到监听后想做的事情
            this.loadMessageList();
          });
        this.loadMessageList();
    }

    componentWillUnmount() {
        this.emitter = null;
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header
                    navigation={this.props.navigation}
                    title={"消息列表"} />
                <View style={commonStyles.body}>
                <FlatList
                    data={this.state.messageList.filter((item) => item.username != null )}
                    renderItem={({item}) => <MessageItem navigation={this.props.navigation} data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => {
                        this.loadMoreList();
                    }}
                />
                </View>
            </SafeAreaView>
        )
    }

    loadMessageList() {
        this.setState({
            pageIndex: 0
        }, () => {
            const data = {
                pageNum: this.state.pageIndex,
                pageSize: 10,
                isAsc: false,
                callback: this.loadMessageListCallback.bind(this)
            }
            getMessageList(data);
        })
    }

    loadMessageListCallback(res) {
        console.log('res', res)
        const { success, data } = res;
        if (success) {
            this.setState({
                messageList: data,
                pageIndex: this.state.pageIndex + 1
            })
        }
    }

    loadMoreList() {
        const data = {
            pageNum: this.state.pageIndex,
            pageSize: 10,
            isAsc: false,
            callback: this.loadMoreCallback.bind(this)
        }
        getMessageList(data);
    }

    loadMoreCallback(res) {
        const { success, data } = res;
        if (success) {
            this.setState({
                messageList: [...this.state.messageList, ...data],
                pageIndex: this.state.pageIndex + 1
            })
        }
    }
}


const styles = StyleSheet.create({

})