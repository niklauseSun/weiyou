import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, EmergencyInputItem, AddImageList, SpecialContractItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import { addEmergencyItem, editEmergencyItem, getEmergencyDetail } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class AddEmergency extends Component {
    constructor(props) {
        super(props);

        const { addType = 'add', id = '' } = props.navigation.state.params || {}
        console.log('props', props);
        this.state = {
            addType: addType,
            pics: [],
            id: id,
            content: null,
            phone: null,
            contact: [],
            selectTypeIndex: 0
        }
    }

    componentDidMount() {
        if (this.state.addType == 'edit') {
            this.loadEmergency()
        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="紧急" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <View style={styles.headImageView}>
                        <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_EMERGENCY_BG} />
                    </View>
                    <EmergencyInputItem content={this.state.content} selectIndex={this.state.selectTypeIndex} changeText={this.changeContent.bind(this)} changeSelectIndex={this.changeTypeIndex.bind(this)}/>
                    <AddImageList imageList={this.state.pics} changeImageList={this.onChangeImageList.bind(this)} />
                    <TextInput style={styles.textInput} value={this.state.phone} placeholder="请留下您的手机号码（选填）"  onChangeText={this.changePhone.bind(this)} />
                    <SpecialContractItem onChangeContact={this.changeContact.bind(this)} contactList={this.state.contact} />
                    <TouchableOpacity onPress={this.addAction.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>添加</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

    changeContact(contact) {
        this.setState({
            contact: contact
        })
    }

    onChangeImageList(imgs = []) {
        this.setState({
            pics: imgs
        })
    }

    changePhone(text) {
        this.setState({
            phone: text
        })
    }

    changeTypeIndex(index) {
        this.setState({
            selectTypeIndex: index
        })
    }

    changeContent(text) {
        this.setState({
            content: text
        })
    }

    addAction() {
//         id  			ID
// content		内容
// type			类型"will", "donation", 'wish'	遗嘱  捐赠 心愿
// phonenumber	手机号
// pictures		图片数组
// contacts
// addEmergencyItem

        if (this.state.content == null || this.state.content.length == 0) {
            Toast.info('内容不能为空！');
            return;
        }

        let type = 'will'
        if (this.state.selectTypeIndex == 0) {
            type = 'will'
        } else if (this.state.selectTypeIndex == 1) {
            type = 'donation'
        } else {
            type = 'wish'
        }

        const params = {
            id: this.state.id,
            content: this.state.content,
            type: type,
            phonenumber: this.state.phone,
            pictures: this.state.pics,
            contacts: this.state.contacts
        }

        if (this.state.addType == 'add') {
            addEmergencyItem({
                callback: this.loadAddCallback.bind(this),
                params: params
            })
        } else {
            editEmergencyItem({
                callback: this.loadAddCallback.bind(this),
                params: params
            })
        }
    }

    loadAddCallback(res) {
        const { success, error } = res;
        if (success) {
            if (this.state.addType == 'add') {
                Toast.info('添加成功！');
            } else {
                Toast.info('修改成功');
            }
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('loadEmergencyList');
        } else {
            Toast.info(error)
        }
    }

    loadEmergency() {
        getEmergencyDetail({
            id: this.state.id,
            callback: this.loadEmergencyCallback.bind(this)
        })
    }

    loadEmergencyCallback(res) {
        console.log('res', res)
        const { success } = res;
        if (success) {
//             pictures: []
// id: 5
// customer_id: 100
// content: "test2"
// type: "wish"
// phonenumber: null
// create_time: "2020-02-26T12:42:36.000Z"
// update_time: "2020-02-26T12:42:36.000Z"
            let index = 0;
            if (type == 'will') {
                index = 0
            } else if (type == 'donation') {
                index = 1
            } else {
                index = 2
            }

            const { id, content, type, phonenumber } = res.data;
            console.log('data', id, content, index)
            this.setState({
                id: id,
                content: content,
                selectTypeIndex: index,
                phone: phonenumber
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    headImageView: {
        marginTop: px(30),
        alignItems: 'center',
        width: '100%'
    },
    textInput :{
        marginHorizontal: px(30),
        height: px(90),
        backgroundColor: '#fff',
        marginTop: px(20),
        paddingHorizontal: px(20),
        borderRadius: px(10)
    },
    addButton: {
        marginTop: px(50),
        marginBottom: px(40),
        marginHorizontal:px(30),
        height: px(120),
        borderRadius: px(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED7539'
    },
    addButtonText: {
        fontSize: px(34),
        color: '#fff'
    }
})