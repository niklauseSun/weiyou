import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { Header, MessageItem, NoneData } from '../components';
import { commonStyles } from '../commonStyles';

export default class GuardianMessageList extends Component {
    constructor(props) {
        super(props);
        const { nickname, avatar, messageList } = props.navigation.state.params || {}
        this.state = {
            nickname: nickname,
            avatar: avatar,
            messageList: messageList
        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title="消息" />
                <View style={commonStyles.body}>
                    <FlatList
                        data={this.state.messageList}
                        renderItem={({ item }) => {
                            return <MessageItem navigation={this.props.navigation} data={{id: item.id, avatar: this.state.avatar, content: item.content, create_time: item.create_time, nickname: this.state.nickname}} />
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => <NoneData title="暂无消息" />}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})