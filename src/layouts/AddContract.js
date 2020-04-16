import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView,FlatList, TouchableOpacity, Image, Linking, Platform } from 'react-native'
import { Header, SearchItem, PredictContract, NoneData, SearchApplyItem, LineItem } from '../components';
import { searchUser, getLoginInfo } from '../requests';
import { Toast } from '@ant-design/react-native';
import { px } from '../utils';
import * as WeChat from 'react-native-wechat'
import { ASSET_IMAGES } from '../config';
import { commonStyles } from '../commonStyles';

export default class AddContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            searchList: null,
            nickname: '',
            id: ''
        }
    }

    componentDidMount() {
        // getLoginInfo
        getLoginInfo({
            callback: this.getLoginInfoCallback.bind(this)
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title="添加监护人" />
                <View style={commonStyles.body}>
                    <View style={styles.searchBgView}>
                        <SearchItem searchAction={this.search.bind(this)} value={this.state.search} changeText={this.onChangeText.bind(this)} placeholder="输入手机号搜索" />
                    </View>
                    <View style={styles.addBgView}>
                        <TouchableOpacity onPress={this.shareToFriend.bind(this)} style={styles.shareToWxButton}>
                            <Image style={styles.iconWx} source={ASSET_IMAGES.ICON_WX_ADD} />
                            <Text style={styles.addText}>{`通过微信添加\n您的监护人`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.messageShare.bind(this)} style={styles.messageShare}>
                            <Image style={styles.iconSms} source={ASSET_IMAGES.ICON_SMS_ADD} />
                            <Text style={styles.addText}>{
                                `通过通讯录添加\n您的监护人`}</Text>
                        </TouchableOpacity>
                    </View>
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
                </View>
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
                    description: `${this.state.nickname}在唯友，邀请您成为监护人，关注${this.state.nickname}的日常生活点滴,点击链接：wy.24hwu.com/appwake?customer_id=${this.state.id}`
                })
            }
        })
    }

    getLoginInfoCallback(res) {
        const { success, data } = res;
        if (success) {
            const { nickname, id } = data;
            this.setState({
                nickname: nickname,
                id: id
            })
        }
    }

    messageShare() {
        // Linking
        if (Platform.OS == 'ios') {
            Linking.openURL(`sms:&body=${this.state.nickname}在唯友，邀请您成为监护人，关注${this.state.nickname}的日常生活点滴,点击链接：wy.24hwu.com/appwake?customer_id=${this.state.id}`)
        } else {
            Linking.openURL(`sms:?body=${this.state.nickname}在唯友，邀请您成为监护人，关注${this.state.nickname}的日常生活点滴,点击链接：wy.24hwu.com/appwake?customer_id=${this.state.id}`)
        }
    }
}

const styles = StyleSheet.create({
    shareToWxButton: {
        height: px(120),
        marginLeft: px(30),
        alignItems: 'center'
    },
    flatList: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBgView: {
        height: px(120),
        backgroundColor: '#fff'
    },
    addBgView: {
        flexDirection: 'row',
        height: px(240),
        backgroundColor: '#fff',
        marginTop: px(20),
        marginBottom: px(20),
        paddingTop: px(20)
    },
    iconWx: {
        width: px(120),
        height: px(120),
        marginBottom: px(30)
    },
    iconSms: {
        width: px(120),
        height: px(120),
        marginBottom: px(30)
    },
    messageShare: {
        height: px(120),
        marginLeft: px(30),
        alignItems: 'center'
    },
    addText: {
        fontSize: px(24),
        color: '#999'
    }
})