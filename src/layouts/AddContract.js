import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView,FlatList, TouchableOpacity } from 'react-native'
import { Header, SearchItem, PredictContract, NoneData, SearchApplyItem, LineItem } from '../components';
import { searchUser } from '../requests';
import { Toast } from '@ant-design/react-native';
import { px } from '../utils';
import * as WeChat from 'react-native-wechat'

export default class AddContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            searchList: null
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title="添加" />
                <SearchItem searchAction={this.search.bind(this)} value={this.state.search} changeText={this.onChangeText.bind(this)} placeholder="输入关键字" />
                <TouchableOpacity onPress={this.shareToFriend.bind(this)} style={styles.shareToWxButton}>
                    <Text>分享到微信</Text>
                </TouchableOpacity>
                {
                    this.state.searchList == null? null :<FlatList
                    contentContainerStyle={styles.flatList}
                    data={this.state.searchList}
                    renderItem={({item}) => {
                        return <SearchApplyItem data={item} />
                    }}
                    ItemSeparatorComponent={() => <LineItem />}
                    ListEmptyComponent={() => <NoneData title="暂无搜索结果" />}
                />
                }
            </SafeAreaView>
        )
    }

    onChangeText(text) {
        this.setState({
            search: text
        })
    }

    search() {
        // searchUser
        if (this.state.search == null) {
            Toast.info('请输入搜索关键字！');
            return;
        }
        const data = {
            pageNum: 0,
            pageSize: 10,
            skey: this.state.search,
            callback: this.loadSearchResult.bind(this)
        }
        searchUser(data);
    }

    loadSearchResult(res) {
        console.log('search', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                searchList: data
            })
        }
    }

    shareToFriend() {
        WeChat.isWXAppInstalled().then(res => {
            if (res) {
                // 是否安装
                WeChat.shareToSession({
                    type: 'text',
                    description: '测试分享'
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    shareToWxButton: {
        height: px(120),
        backgroundColor: 'red'
    },
    flatList: {
        marginTop: px(30)
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
})