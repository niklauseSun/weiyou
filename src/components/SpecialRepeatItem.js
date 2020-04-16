import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class SpecialRepeatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    render() {
        const {
            repeat = 3,
            cnt = 5
        } = this.props;
        let str = cnt + ''
        return (
            <View style={styles.content}>
                <View style={styles.itemContent}>
                    <Image style={styles.itemHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_REPEAT} />
                    <Text style={styles.itemHeadLabel}>重复</Text>
                    <TouchableOpacity style={styles.moreButton} onPress={this.showModal.bind(this)}>
                        <Text style={styles.itemSubLabel}>{repeat}次无人应答，通知监护人</Text>
                        <Image style={styles.iconStyle} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContent}>
                    <Image style={styles.itemHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_SIGN} />
                    <Text style={styles.itemHeadLabel}>间隔（分钟）</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <TextInput onChangeText={this.changeText.bind(this)} keyboardType="number-pad" placeholder="分钟" style={styles.inputItem} value={str} />
                        <Image style={styles.iconStyle} source={ASSET_IMAGES.ICON_MORE} />
                    </TouchableOpacity>
                </View>
                <Modal visible={this.state.isShow} transparent={true}>
                    <View style={styles.showView}>
                        <View style={styles.modalContent}>
                            <View style={styles.closeBgView}>
                                <TouchableOpacity style={styles.closeButton} onPress={this.showModal.bind(this)}>
                                    <Text style={styles.closeButtonText}>关闭</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    data={[1,2,3,4,5,6]}
                                    renderItem={({item, index}) => {
                                        return <TouchableOpacity onPress={this.selectCnt.bind(this, item)} style={styles.selectButton} key={index}>
                                            <Text style={styles.selectButtonText}>{item}次无人应答，通知监护人</Text>
                                        </TouchableOpacity>
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    showModal() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    selectCnt(repeat) {
        const { changeRepeat } = this.props;
        if (changeRepeat) {
            changeRepeat(repeat);
        }
        this.showModal();
    }

    changeText(cnt) {
        const { changeCnt } = this.props;
        if (changeCnt) {
            changeCnt(cnt);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(264),
        backgroundColor: '#fff',
        marginTop: px(20),
        marginLeft: px(30),
        marginRight: px(30),
        borderRadius: px(10),
        paddingHorizontal: px(30)
    },
    itemContent: {
        height: px(132),
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemHeadImage: {
        width: px(44),
        height: px(44),
    },
    itemHeadLabel: {
        marginLeft: px(30),
        fontSize: px(26),
        color: '#474342'
    },
    itemSubLabel:{
        flex: 1,
        textAlign: 'right',
        color: '#474342',
        fontSize: px(26),
        marginRight: px(20)
    },
    inputItem: {
        flex: 1,
        textAlign: 'right',
        marginRight: px(30)
    },
    moreButton:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
    selectButton: {
        height: px(60),
        marginHorizontal: px(50),
        backgroundColor: '#eaeaea',
        marginTop: px(30),
        borderRadius: px(10),
        justifyContent: 'center',
        alignItems: 'center'
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
})