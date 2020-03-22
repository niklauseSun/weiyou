import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { Header, MessageItem } from '../components';
import { commonStyles } from '../commonStyles';
import { getMessageList } from '../requests';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        }
    }

    componentDidMount() {
        this.loadMessageList();
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
                />
                </View>
            </SafeAreaView>
        )
    }

    loadMessageList() {
        const data = {
            pageNum: 0,
            pageSize: 10,
            isAsc: false,
            callback: this.loadMessageListCallback.bind(this)
        }
        getMessageList(data);
    }

    loadMessageListCallback(res) {
        console.log('res', res)
        const { success, data } = res;
        if (success) {
            this.setState({
                messageList: data
            })
        }
    }
}


const styles = StyleSheet.create({

})