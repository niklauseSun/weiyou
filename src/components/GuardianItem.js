import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { getGuardianList } from '../requests';
import { px } from '../utils';
import { LineItem, NoneData } from '.';
import { ASSET_IMAGES } from '../config';

export default class GuardianItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guardianList: []
        }
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        return (
            <View style={styles.content}>
                <FlatList
                    data={this.state.guardianList.filter((item) => item.username != null )}
                    renderItem={({item, index}) => {
                        return <TouchableOpacity onPress={this.navigate.bind(this, item)} style={styles.itemContent} key={index}>
                            {item.avatar == ''||item.avatar == null ? <Image source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} style={styles.headImage}  />:<Image style={styles.headImage} source={{ uri: item.avatar}} />}
                            <View style={styles.detailView}>
                                <Text style={styles.name}>{item.nickname == null ? '': item.nickname}</Text>
                                <Text style={styles.detailText}>{item.message == null ? '': item.message.content}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                    ItemSeparatorComponent={() => <LineItem />}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => <NoneData title="暂无监护人" />}
                />
            </View>
        )
    }

    navigate(item) {
        const { message }= item;
        this.props.navigation.navigate('GuardianMessageList', {
            nickname: item.nickname,
            avatar: item.avatar,
            messageList: message == null ? []:[message]
        })
    }

    loadList() {
        // getGuardianList
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadListCallback.bind(this)
        }
        getGuardianList(data)
    }

    loadListCallback(res) {
        console.log('list', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                guardianList: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    itemContent: {
        height: px(120),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        paddingVertical: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        backgroundColor: '#999'
    },
    detailView: {
        marginLeft: px(30)
    },
    name: {
        fontSize: px(28),
        color: '#333'
    },
    detailText: {
        fontSize: px(26),
        color: '#999'
    }
})