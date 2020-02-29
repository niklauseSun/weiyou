import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Toast, Picker } from '@ant-design/react-native';
import { changePersonInfo, getLoginInfo } from '../requests';
import { Header, SetDetailItem, EditItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class PersonDetail extends Component {
    constructor(props) {
        super(props);
        const { id } = props.navigation.state.params || {};
        this.state = {
            id: id,
            avatar: '',
            nickname: '',
            email: '',
            sex: 'male',
            oldData: {},
            phonenumber: '',
            isShow: false,
            isEditable: false
        }
    }

    componentDidMount() {
        console.log('personal', this.state.id);
        this.loadPersonInfo()
    }

    render() {
        const { avatar, nickname, email, sex, phonenumber } = this.state;
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title="个人资料" rightComponent={this.rightComponent()} />
                <ScrollView style={commonStyles.body}>
                    <View style={styles.headView}>
                        { avatar == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />: <Image style={styles.headImage} source={{ uri: avatar }} />}
                        <Text>{phonenumber}</Text>
                    </View>
                    <View style={commonStyles.content}>
                        <EditItem changeText={this.changeNickname.bind(this)} editable={this.state.isEditable} title="昵称" subTitle={this.state.nickname}/>
                        <View style={styles.sexView}>
                            <Text style={styles.sexTitle}>性别</Text>
                            <TouchableOpacity disabled={!this.state.isEditable} onPress={this.showPicker.bind(this)} style={styles.sexButton}>
                                <Text style={styles.sexButtonText}>{sex == 'male'? '男': '女'}</Text>
                            </TouchableOpacity>
                        </View>
                        <EditItem changeText={this.changeEmail.bind(this)} editable={this.state.isEditable} title="绑定邮箱" subTitle={this.state.email}/>
                        <Picker
                            data={[{label: '男', value: '男'},{label: '女', value: '女'}]}
                            cols={1}
                            onOk={(e)=> {
                                console.log('ok', e);
                                if (e == '女') {
                                    this.setState({
                                        sex: 'female'
                                    })
                                } else {
                                    this.setState({
                                        sex: 'male'
                                    })
                                }
                                this.showPicker();
                            }}
                            onDismiss={() => {
                                this.showPicker();
                            }}
                            visible={this.state.isShow}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    rightComponent() {
        return <TouchableOpacity onPress={this.changeEditStatus.bind(this)} style={styles.editButton}>
            <Text style={styles.editButtonText}>{this.state.isEditable ? '保存': '修改'}</Text>
        </TouchableOpacity>
    }

    changeNickname(text) {
        this.setState({
            nickname: text
        })
    }

    changeEmail(text) {
        this.setState({
            email: text
        })
    }

    changeEditStatus() {
        if (this.state.isEditable) {
            this.editPersonDetail();
        } else {
            this.setState({
                isEditable: !this.state.isEditable
            })
        }
    }

    showPicker() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    loadPersonInfo() {
        // getLoginInfo
        getLoginInfo({
            callback: this.loadCallback.bind(this)
        })
    }

    loadCallback(res) {
        console.log('personInfo' ,res);
        const { success, data } = res;
        if (success) {
            this.setState({
                avatar: data.avatar,
                id: data.avatar,
                username: data.username,
                nickname: data.nickname,
                sex: data.sex,
                email: data.email,
                phonenumber: data.phonenumber
            })
        }

    }

    editPersonDetail() {
        const { oldData } = this.state;
        const data = {
            avatar: oldData.avatar,
            id: oldData.id,
            username: oldData.username,
            nickname: this.state.nickname,
            email: this.state.email,
            sex: this.state.sex,
            phonenumber: this.state.phonenumber
//             avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erKay7VOFxBXRpRxyZfrBIwRMZXlMqQjTIRqdQg19FKj4ksclE3C5LPzmo9WYFWcKpuiaz70YA6NeA/132"
// password: true
// id: 121
// username: "18301709959"
// nickname: "孙玉建🍁"
// email: ""
// phonenumber: "18301709959"
// unionid: "o0F120o1TuVsX5Ew_gS1yozvWk3w"
// mini_openid: "oYtzM4rNzkMJngEt2cGBgFRCPumU"
// app_openid: ""
// id_card: ""
// sex: "male"
// status: "normal"
// position: "上海市嘉定区爱特路68弄"
// longitude: "121.32179260253906"
// latitude: "31.234739303588867"
// city: "310114"
// balance: "0.0000"
// amount: "0.0000"
// message_cnt: 0
// score: 42
// vip_id: -1
// vip_expire: null
// login_date: null
// remark: null
// create_time: "2020-02-15T12:19:39.000Z"
// update_time: "2020-02-29T04:29:25.000Z"
        }
        changePersonInfo({
            callback: this.editCallback.bind(this),
            params: data
        })
    }

    editCallback(res) {
        const { success } = res;
        if (success) {
            Toast.info('修改成功');
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    headView: {
        flexDirection: 'row',
        paddingHorizontal: px(30),
        alignItems: 'center',
        marginTop: px(60),
        marginBottom: px(30)
    },
    headImage: {
        width: px(120),
        height: px(120),
        borderRadius: px(60),
        marginRight: px(30)
    },
    sexView: {
        height: px(90),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        paddingHorizontal: px(30),
        flexDirection: 'row',
        alignItems: 'center'
    },
    sexButton: {
        flex: 1,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    sexTitle: {
        color: '#999'
    },
    editButton: {
        width: px(90),
    },
    editButtonText: {
        color: '#ED7539'
    }
})