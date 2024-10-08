import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { getContractApplyList, agreeApply } from '../requests';
import { NoneData } from '.';
import { px } from '../utils';
import { Toast, Modal } from '@ant-design/react-native';

const alert = Modal.alert;

export default class NewApplyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyList:[]
        }
    }

    componentDidMount() {
        this.loadNewApplyRequestList();
    }

    render() {
        return (
            <Fragment>
                <FlatList
                    contentContainerStyle={{ flex: 1}}
                    data={this.state.applyList.filter((item) =>  item.status == 'applying')}
                    renderItem={({item}) => {
                        return this.renderItem(item);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => <NoneData title="暂无申请" />}
                />
            </Fragment>
        )
    }

    renderItem(item) {
        const { reason = '', nickname = '', avatar = '', id } = item;

        return <TouchableOpacity style={styles.actionContent}>
            {avatar == '' || avatar == null ? <View style={styles.headImage}></View> :<Image style={styles.headImage} source={{ uri: avatar }} /> }
            <View style={styles.detail}>
                <Text style={styles.name}>{nickname == null ? '': nickname}</Text>
                {/* <Text style={styles.reason}>{reason == null ? '': reason}</Text> */}
                <Text style={styles.reason}>{`${nickname}用户申请您成为他的监护人`}</Text>
            </View>
            <View style={styles.applyStatusView}>
                <TouchableOpacity onPress={this.agreeAction.bind(this, id)} style={styles.agreeButton}>
                    <Text style={styles.agreeText}>同意</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    }

    navigate(item) {
        const { id } = item;
        this.props.navigation.navigate('ContactDetail', {
            id: id,
            type: 'add'
        })
    }

    agreeAction(id) {
        // contractApplyByOther
        alert('确认', '确定同意么？', [
            { text: '确认', onPress: () => {
                this.agree(id)
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }

    agree(id) {
        agreeApply({
            id: id,
            callback: this.agreeCallback.bind(this)
        });
    }

    agreeCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('已同意');
            this.loadNewApplyRequestList();
            DeviceEventEmitter.emit('taskReload');
        } else {
            Toast.info(error);
        }
    }

    loadNewApplyRequestList() {
        if (!global.isLogin) {
            return;
        }
        const data = {
            pageNum: 0,
            pageSize: 10
        }
        getContractApplyList({
            params: data,
            callback: this.loadCallback.bind(this)
        })
    }

    loadCallback(res) {
        const { success, data } = res;
        if (success) {
            this.setState({
                applyList: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
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
        marginHorizontal: px(30)
    },
    name: {
        fontSize: px(28),
        color: '#333'
    },
    reason: {
        fontSize: px(24),
        color: '#999',
        marginTop: px(10)
    },
    agreeButton: {
        width: px(120),
        height: px(60),
        borderRadius: px(30),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED7539'
    },
    agreeText: {
        fontSize: px(26),
        color: '#fff'
    }
})