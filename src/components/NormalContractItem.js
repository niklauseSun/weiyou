import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, SafeAreaView, FlatList } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import { NoneData, SelectContactItem } from '.';
import { getContractList } from '../requests';

export default class NormalContractItem extends Component {
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
                    {
                        this.state.contactList.map((item, index) => {
                            if (this.props.contactList.indexOf(item.id) < 0) {
                                return null
                            }
                            console.log('contact', item, this.props);
                            if (item.avatar == '') {
                                return <Image style={styles.contactHeadImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />
                            }
                            return <Image style={styles.contactHeadImage} source={{ uri: item.avatar}} />
                        })
                    }
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
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => {
                                    return <SelectContactItem onChangeSelect={this._changeContacts.bind(this)} selectIndexArray={this.props.contactList || []} data={item} />
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
        const { success } = res;
        if (success) {
            const { data } = res;
            let aArray = []
            for (let i = 0;i < data.length;i++) {
                aArray.push(data[i].id);
            }
            this.setState({
                contactList: res.data
            })
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        marginHorizontal: px(20),
        height: px(120),
        alignItems: 'center',
    },
    headImage: {
        width: px(44),
        height: px(44),
        marginRight: px(20)
    },
    contactHeadImage: {
        width: px(60),
        height: px(60),
        backgroundColor: '#999',
        borderRadius: px(30),
        marginRight: px(20)
    },
    title: {
        fontSize: px(32),
        color: '#666'
    },
    moreButton: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
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