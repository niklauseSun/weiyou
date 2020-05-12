import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, EmergencyInputItem, AddImageList, SpecialContractItem, AddEmergencyInput } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import { addEmergencyItem, editEmergencyItem, getEmergencyDetail, getWill, getPersonEmergencyList } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class AddEmergency extends Component {
    constructor(props) {
        super(props);

        const { addType = 'add', id = '' } = props.navigation.state.params || {}
        this.state = {
            addType: addType,
            pics: [],
            id: id,
            content: null,
            phone: null,
            contact: [],
            selectTypeIndex: 0,
            upImages: [],
            epitaphText: '', // 墓志铭
            myLifeText: '', // 我这一生
            funeralText: '', // 身后事
            propertyText: '', // 财产处置
            remainsText: '', // 遗体处理
            willText: '', // 未完成愿望
            epitaphId: '',
            myLifeId: '',
            funeralId: '',
            propertyId: '',
            remainsId: '',
            willId: '',
            selectArrays:[]
        }
    }

    componentDidMount() {
        this.loadWill();
    }

    render() {
        const { selectArrays } = this.state;
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="幸福寄语" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <View style={styles.headImageView}>
                        <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_EMERGENCY_BG} />
                    </View>
                    <EmergencyInputItem selectArrays={this.state.selectArrays} content={this.state.content} selectIndex={this.state.selectTypeIndex} changeText={this.changeContent.bind(this)} changeSelectIndex={this.changeSelectArrays.bind(this)}/>
                    {
                        selectArrays.indexOf(0) >= 0 ? <AddEmergencyInput maxCount={20} placeholder={"#写给自己的墓志铭..."} value={this.state.epitaphText} changeText={this.changeEpitaphText.bind(this)}/>: null
                    }
                    {
                        selectArrays.indexOf(1) >= 0 ? <AddEmergencyInput maxCount={150} placeholder={"#我这一生..."} value={this.state.myLifeText} changeText={this.changeMyLife.bind(this)} />: null
                    }
                    {
                        selectArrays.indexOf(2) >= 0 ? <AddEmergencyInput maxCount={150} placeholder={"#请告诉我们，我先走了..."} value={this.state.funeralText} changeText={this.changeFuneralText.bind(this)} />: null
                    }
                    {
                        selectArrays.indexOf(3) >= 0 ? <AddEmergencyInput maxCount={150} placeholder={"#不动产及动产的处置方案..."} value={this.state.propertyText} changeText={this.changePropertyText.bind(this)} />: null
                    }
                    {
                        selectArrays.indexOf(4) >= 0 ? <AddEmergencyInput maxCount={150} placeholder={"#遗体处置..."} value={this.state.remainsText} changeText={this.changeRemainsText.bind(this)} />: null
                    }
                    {
                        selectArrays.indexOf(5) >= 0 ? <AddEmergencyInput maxCount={150} placeholder={"#未处理的心愿..."} value={this.state.willText} changeText={this.changeWillText.bind(this)} />: null
                    }
                    <Text style={styles.tip}>重要提示：此处填写的所有内容将在您离世后发送给指定监护人。请勿填写密码等安全隐私！</Text>
                    {/* <AddEmergencyInput maxCount={150} placeholder={"#我这一生..."} value={this.state.myLifeText} changeText={this.changeMyLife.bind(this)} />
                    <AddEmergencyInput maxCount={150} placeholder={"#请告诉我们，我先走了..."} value={this.state.funeralText} changeText={this.changeFuneralText.bind(this)} />
                    <AddEmergencyInput maxCount={150} placeholder={"#不动产及动产的处置方案..."} value={this.state.propertyText} changeText={this.changePropertyText.bind(this)} />
                    <AddEmergencyInput maxCount={150} placeholder={"#遗体处置..."} value={this.state.remainsText} changeText={this.changeRemainsText.bind(this)} />
                    <AddEmergencyInput maxCount={150} placeholder={"#未处理的心愿..."} value={this.state.willText} changeText={this.changeWillText.bind(this)} /> */}
                    <TouchableOpacity onPress={this.addAction.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>保存</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

    changeEpitaphText(text) {
        this.setState({
            epitaphText: text
        })
    }

    changeMyLife(text) {
        this.setState({
            myLifeText: text
        })
    }

    changeFuneralText(text) {
        this.setState({
            funeralText: text
        })
    }

    changePropertyText(text) {
        this.setState({
            propertyText: text
        })
    }

    changeRemainsText(text) {
        this.setState({
            remainsText: text
        })
    }

    changeWillText(text) {
        this.setState({
            willText: text
        })
    }

    changeContact(contact) {
        this.setState({
            contact: contact
        })
    }

    onChangeImageList(type, localImages = [], remoteImages) {
        if (type == 'add') {
            this.setState({
                pics: [...this.state.pics ,...localImages],
                upImages: [...this.state.upImages, ...remoteImages]
            })
        } else {
            this.setState({
                pics: localImages,
                upImages: remoteImages
            })
        }
    }

    changePhone(text) {
        this.setState({
            phone: text
        })
    }

    changeSelectArrays(index) {
        this.setState({
            selectArrays: index
        })
    }

    changeContent(text) {
        this.setState({
            content: text
        })
    }

    addAction() {
        let emergencys = [];
        if (this.state.epitaphId.length == 0) {
            emergencys.push({
                content: this.state.epitaphText,
                type: 'mu'
            })
        } else {
            emergencys.push({
                id: this.state.epitaphId,
                content: this.state.epitaphText,
                type: 'mu'
            })
        }

        if (this.state.myLifeId.length == 0) {
            emergencys.push({
                content: this.state.myLifeText,
                type: 'wo'
            })
        } else {
            emergencys.push({
                id: this.state.myLifeId,
                content: this.state.myLifeText,
                type: 'wo'
            })
        }

        if (this.state.funeralId.length == 0) {
            emergencys.push({
                content: this.state.funeralText,
                type: 'shen'
            })
        } else {
            emergencys.push({
                id: this.state.funeralId,
                content: this.state.funeralText,
                type: 'shen'
            })
        }

        if (this.state.propertyId.length == 0) {
            emergencys.push({
                content: this.state.propertyText,
                type: 'cai'
            })
        } else {
            emergencys.push({
                id: this.state.propertyId,
                content: this.state.propertyText,
                type: 'cai'
            })
        }

        if (this.state.remainsId.length == 0) {
            emergencys.push({
                content: this.state.remainsText,
                type: 'yi'
            })
        } else {
            emergencys.push({
                id: this.state.remainsId,
                content: this.state.remainsText,
                type: 'yi'
            })
        }

        if (this.state.willId.length == 0) {
            emergencys.push({
                content: this.state.willText,
                type: 'wei'
            })
        } else {
            emergencys.push({
                id: this.state.willId,
                content: this.state.willText,
                type: 'wei'
            })
        }

        const params = {
            emergencys: emergencys
        }

        // const params = {
        //     emergencys: [
        //         {
        //             id: this.state.epitaphId,
        //             content: this.state.epitaphText,
        //             type: 'mu'
        //         }, {
        //             id: this.state.myLifeId,
        //             content: this.state.myLifeText,
        //             type: 'wo'
        //         }, {
        //             id: this.state.funeralId,
        //             content: this.state.funeralText,
        //             type: 'shen'
        //         }, {
        //             id: this.state.propertyId,
        //             content: this.state.propertyText,
        //             type: 'cai'
        //         }, {
        //             id: this.state.remainsId,
        //             content: this.state.remainsText,
        //             type: 'yi'
        //         }, {
        //             id: this.state.willId,
        //             content: this.state.willText,
        //             type: 'wei'
        //         }
        //     ]
        // }

        // const params = {
        //     id: this.state.id,
        //     content: this.state.content,
        //     type: type,
        //     phonenumber: this.state.phone,
        //     pictures: this.state.upImages,
        //     contacts: this.state.contacts
        // }

        // if (this.state.addType == 'add') {
        //     addEmergencyItem({
        //         callback: this.loadAddCallback.bind(this),
        //         params: params
        //     })
        // } else {
        console.log('params',  params);
        editEmergencyItem({
            callback: this.loadAddCallback.bind(this),
            params: params
        })
        // }
    }

    loadAddCallback(res) {
        console.log('add call', res);
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

    loadWill() {
        // getWill

        getWill({
            callback: this.loadWillCallback.bind(this)
        })
    }

    loadWillCallback(res) {
        console.log('res', res);
        const { success, data, error } = res;
        if (success) {
            for (let i = 0; i< data.length;i++) {
                if (data[i].type == 'mu') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 0]
                        })
                    }
                    this.setState({
                        epitaphId: data[i].id,
                        epitaphText: data[i].content,
                    })
                } else if (data[i].type == 'wo') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 1]
                        })
                    }
                    this.setState({
                        myLifeId: data[i].id,
                        myLifeText: data[i].content,
                    })
                } else if (data[i].type == 'shen') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 2]
                        })
                    }
                    this.setState({
                        funeralId: data[i].id,
                        funeralText: data[i].content
                    })
                } else if (data[i].type == 'cai') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 3]
                        })
                    }
                    this.setState({
                        propertyId: data[i].id,
                        propertyText: data[i].content
                    })
                } else if (data[i].type == 'yi') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 4]
                        })
                    }
                    this.setState({
                        remainsId: data[i].id,
                        remainsText: data[i].content
                    })
                } else if (data[i].type == 'wei') {
                    if (data[i].content && data[i].content.length > 0) {
                        this.setState({
                            selectArrays: [...this.state.selectArrays, 5]
                        })
                    }
                    this.setState({
                        willId: data[i].id,
                        willText: data[i].content,
                    })
                }
            }
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
        const { success } = res;
        if (success) {
            let index = 0;
            if (type == 'will') {
                index = 0
            } else if (type == 'donation') {
                index = 1
            } else {
                index = 2
            }

            const { id, content, type, phonenumber, pictures } = res.data;
            this.setState({
                id: id,
                content: content,
                selectTypeIndex: index,
                phone: phonenumber,
                upImages: pictures,
                pics: pictures
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
        backgroundColor: '#333'
    },
    addButtonText: {
        fontSize: px(34),
        color: '#fff'
    },
    tip: {
        color: '#9F8E66',
        marginHorizontal: px(20),
        marginTop: px(20)
    }
})