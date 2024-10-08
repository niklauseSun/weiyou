import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, DeviceEventEmitter } from 'react-native'
import { getMessageDetail, setMessageRead } from '../requests';
import { ASSET_IMAGES } from '../config';
import { commonStyles } from '../commonStyles';
import { Header } from '../components';
import { px, formateDateHourWithString } from '../utils';

export default class MessageDetail extends Component {
    constructor(props) {
        super(props);
        const { id } = props.navigation.state.params || {}
        this.state = {
            id: id,
            content: '',
            nickname: '',
            avatar: '',
            create_time: '',
            data: {}
        }
    }

    componentDidMount() {
        this.loadMessageDetail()
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="消息详情" navigation={this.props.navigation} />
                <View>
                    <View style={styles.headView}>
                        {this.state.avatar == ''? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />: <Image style={styles.headImage} resizeMode={'cover'} source={{ uri: this.state.avatar}}/>}
                        {/* <Image style={styles.headImage}  source={{ uri: this.state.avatar}}/> */}
                        <Text style={styles.name}>{this.state.nickname}</Text>
                    </View>
                    <Text style={styles.contentText}>{this.state.content}</Text>
                    <View style={styles.timeLine}>
                        <Text style={styles.timeText}>{formateDateHourWithString(this.state.create_time)}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    loadMessageDetail() {
        // getMessageDetail
        getMessageDetail({
            callback: this.loadCallback.bind(this),
            id: this.state.id
        })
    }

    loadCallback(res) {
        const { success, data } = res;
        if (success) {
            const {
                readed,
                content,
                nickname,
                avatar,
                create_time
            } = data
            this.setState({
                content: content,
                nickname: nickname,
                avatar: avatar,
                create_time: create_time,
                data: data
            });

            if (readed == 0) {
                this.messageRead();
            }
        }
    }

    messageRead() {
        // setMessageRead
        const param = this.state.data;
        param['readed'] = 1
        setMessageRead({
            params: param,
            callback: this.setMessageReaded.bind(this)
        })
    }

    setMessageReaded(res) {
        const { success } = res;
        if (success) {
            DeviceEventEmitter.emit('reloadMessageList');
            DeviceEventEmitter.emit('unReadCountReload');
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    headView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        marginTop: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        marginRight: px(30),
    },
    name: {
        fontSize: px(30),
        color: '#333'
    },
    contentText: {
        fontSize: px(28),
        color: '#666',
        marginHorizontal: px(30),
        marginTop: px(30)
    },
    timeLine: {
        paddingHorizontal: px(30),
        marginTop: px(30),
        alignItems: 'flex-end'
    },
    timeText: {
        fontSize: px(24),
        color: '#999'
    }
})