import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Toast, Picker } from '@ant-design/react-native';
import { changePersonInfo, getLoginInfo } from '../requests';
import { Header, SetDetailItem, EditItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';
import { px, uploadOssFile, initAliyunOSS } from '../utils';
import ImagePicker from 'react-native-image-crop-picker';

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
            isEditable: false,
            filePath: null,
            uploadUrl: null
        }
    }

    componentDidMount() {
        this.loadPersonInfo()
    }

    render() {
        const { avatar, nickname, email, sex, phonenumber, filePath } = this.state;
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title="个人资料" rightComponent={this.rightComponent()} />
                <ScrollView style={commonStyles.body}>
                    <TouchableOpacity disabled={!this.state.isEditable} onPress={this.uploadHeadImage.bind(this)} style={styles.headView}>
                       { filePath == null ? (avatar == '' ? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />: <Image style={styles.headImage} source={{ uri: avatar }} />) : <Image style={styles.headImage} source={{ uri: filePath }} />}
                        <Text>{phonenumber}</Text>
                    </TouchableOpacity>
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
            avatar: this.state.uploadUrl == null ? oldData.avatar: this.state.uploadUrl,
            id: oldData.id,
            username: oldData.username,
            nickname: this.state.nickname,
            email: this.state.email,
            sex: this.state.sex,
            phonenumber: this.state.phonenumber
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
            this.setState({
                isEditable: !this.state.isEditable
            }, ()=> {
                DeviceEventEmitter.emit('reloadLogin');
            })
        }
    }

    uploadHeadImage() {
        if (global.dir == null) {
            initAliyunOSS();
        }
        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo'
        }).then(img => {
            let imageName = this.acquireImageName(img.path);
            uploadOssFile(imageName, img.path).then((e) => {
                let url = 'https://' + global.imageHost + '/' + imageName;
                Toast.info('上传图片成功');
                this.setState({
                    filePath: img.path,
                    uploadUrl: url
                })
            });
        })
    }

    acquireImageName(path) {
        const filetype = path.substring(path.lastIndexOf('.')).toLowerCase();
        const currm = new Date().getTime() + '';
        const objectKey = `${global.dir}/${currm}${filetype}`;
        return objectKey
    }
}

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