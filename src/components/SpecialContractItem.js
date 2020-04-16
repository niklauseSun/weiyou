import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, SafeAreaView, FlatList } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import { NoneData } from '.';
import { getContractList } from '../requests';
import SelectContactItem from './SelectContactItem';

export default class SpecialContractItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            contactList: []
        }
    }

    componentDidMount() {
        this.loadContactList();
    }

    render() {
        const { isShow } = this.state;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={ASSET_IMAGES.ICON_SPECIAL_CONTRACT} />
                <Text style={styles.title}>通知联系人</Text>
                <TouchableOpacity onPress={this.showContractListView.bind(this)} style={styles.moreButton}>
                    <Image source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
                <Modal visible={isShow} transparent={true}>
                    <View style={styles.showView}>
                        <View style={styles.modalContent}>
                            <View style={styles.closeBgView}>
                                <TouchableOpacity onPress={this.showContractListView.bind(this)} style={styles.closeButton}>
                                    <Text>关闭</Text>
                                </TouchableOpacity>
                            </View>
                            <SafeAreaView style={styles.contractView}>
                                <FlatList
                                    data={this.state.contactList.filter((item) => item.username != null)}
                                    renderItem={({item, index}) => {
                                        return <SelectContactItem onChangeSelect={this._changeContacts.bind(this)} selectIndexArray={this.props.selectContactList} data={item} />
                                    }}
                                    ListEmptyComponent={() => <NoneData title="暂无数据" />}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    showContractListView() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    _changeContacts(contacts) {
        const { onChangeContact } = this.props;
        if (onChangeContact) {
            onChangeContact(contacts);
        }
    }

    loadContactList() {
        if (!global.isLogin) {
            return;
        }
        getContractList({
            pageNum: 0,
            pageSize: 10,
            callback: this.loadContactListCallback.bind(this)
        });
    }

    loadContactListCallback(res) {
        const { success, data } = res;
        if (success) {

            this.setState({
                contactList: res.data
            })
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(30),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(44),
        height: px(44)
    },
    title: {
        marginLeft: px(20),
        fontSize: px(26),
        color: '#363641'
    },
    moreButton: {
        width: px(60),
        height: px(90),
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    showView: {
        // alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
      },
      modalContent: {
        height: px(800),
        width: '100%',
        backgroundColor: '#fff',
      },
      closeBgView: {
        height: px(60),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: px(30),
      },
      closeButton: {
        height: '100%',
        justifyContent: 'center'
      },
      contractView: {
          flex: 1
      }
})