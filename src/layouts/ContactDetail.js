import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { getContractDetail } from '../requests';
import { Header, EditItem } from '../components';
import { commonStyles } from '../commonStyles';
import { px } from '../utils';

export default class ContactDetail extends Component {
    constructor(props) {
        super(props);
        const { id = 0, type = 'edit' } = props.navigation.state.params || {};
        this.state = {
            id: id,
            nickname: '',
            avatar: '',
            email: '',
            phonenumber: '',
            sex: '',
            position: '',
            status: '',
            data: {},
            isEditable: false,
            remark_name: null,
            type: type
        }
    }

    componentDidMount() {
        this.loadContactDetail();
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header navigation={this.props.navigation} title={this.state.nickname} rightComponent={this.rightComponent(this.state.isEditable)} />
                {
                    this.state.avatar == '' ? <View style={styles.headImage} />: <Image style={styles.headImage} source={{ uri: this.state.avatar}} />
                }
                <EditItem title="昵称" subTitle={this.state.remark_name} editable={this.state.isEditable}/>
                <EditItem title="性别" subTitle={this.state.sex == 'male'? '男': '女'}/>
                <EditItem title="生日" />
                <EditItem title="所在地" subTitle={this.state.position} />
                <EditItem title="身高" />
                <EditItem title="体重" />
                <EditItem title="唯有号" />
            </SafeAreaView>
        )
    }

    rightComponent() {
        if (this.state.type != 'add') {
            // return <TouchableOpacity onPress={this.rightAction.bind(this)} style={styles.editButton}>
            //     <Text style={styles.editButtonText}>{this.state.isEditable? '保存': '修改'}</Text>
            // </TouchableOpacity>
        }
    }

    rightAction() {
        if (!this.state.isEditable) {
            this.setState({
                isEditable: true
            })
        } else {
            // saveAction
            this.setState({
                isEditable: false
            })
        }
    }

    saveAction() {

    }

    saveCallback() {
        
    }

    loadContactDetail() {
        getContractDetail({
            callback: this.loadDetailCallback.bind(this),
            id: this.state.id
        })
    }

    loadDetailCallback(res) {
        const { success, data } = res;
        if (success) {
            const {
                nickname,
                avatar,
                email,
                phonenumber,
                sex,
                status,
                position,
                remark_name
            } = data;
            this.setState({
                nickname: nickname,
                avatar: avatar,
                email: email,
                phonenumber: phonenumber,
                sex: sex,
                position: position,
                status: status,
                remark_name: remark_name,
                data: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    headImage: {
        width: px(120),
        height: px(120),
        marginLeft: px(30),
        borderRadius: px(60),
        marginTop: px(30),
        marginBottom: px(30)
    },
    editButton: {
        width: px(120),
        height: px(90),
        alignItems: 'center',
        justifyContent: 'center'
    }
})