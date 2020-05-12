import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { Modal, Toast } from '@ant-design/react-native';
import { contractApply } from '../requests';
import { ASSET_IMAGES } from '../config';

const prompt = Modal.prompt;

export default class SearchApplyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { avatar, nickname, sex } = this.props.data;
        return (
            <View style={styles.content}>
                {
                    avatar == ''? <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />: <Image style={styles.headImage} source={{ uri: avatar}} />
                }
                <View style={styles.detail}>
                    <Text style={styles.name}>{nickname}</Text>
                    <Text style={styles.male}>{sex == 'male'? '男': '女'}</Text>
                </View>
                <View style={styles.applyButtonView}>
                    <TouchableOpacity onPress={() => {
                        prompt(
                            '请求成为我的监护人',
                            '请输入添加理由',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: reason => {
                                    this.apply(reason)
                                } },
                            ],
    )
                    }} style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>申请</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    apply(reason) {
        contractApply({
            customer_id: this.props.data.id,
            reason: reason,
            callback: this.applyCallback.bind(this)
        });
    }

    applyCallback(res) {
        const { success, error } = res;
        if (success) {
            Toast.info('添加成功');
        } else {
            Toast.info(error);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        paddingVertical: px(20),
        paddingHorizontal: px(30),
        height: px(220),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45)
    },
    detail: {
        flex: 1,
        marginLeft: px(20),
        justifyContent: 'center'
    },
    name: {
        fontSize: px(30),
        color: '#333'
    },
    sex: {
        fontSize: px(26),
        color: '#999'
    },
    applyButtonView: {
        width: px(160),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButton: {
        width: px(120),
        height: px(50),
        borderRadius: px(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED7539'
    },
    applyButtonText: {
        fontSize: px(26),
        color: '#fff'
    }
})