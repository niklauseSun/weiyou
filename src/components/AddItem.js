import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdd: true
        }
    }

    render() {
        const { isAdd } = this.state;
        return (
            <View style={[styles.content, {
                width: isAdd ? px(600): px(114)
            }]}>
                {this.state.isAdd ? <View style={styles.typeView}>
                    <TouchableOpacity style={styles.addTypeBtn}>
                        <Image style={styles.addImage} source={ASSET_IMAGES.ICON_CUSTOM} />
                        <Text style={styles.addTypeTitle}>日常</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addTypeBtn}>
                        <Image style={styles.addImage} source={ASSET_IMAGES.ICON_SPECIAL} />
                        <Text style={styles.addTypeTitle}>特殊</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addTypeBtn}>
                        <Image style={styles.addImage} source={ASSET_IMAGES.ICON_EMERGENCY} />
                        <Text style={styles.addTypeTitle}>紧急</Text>
                    </TouchableOpacity>
                </View>: null}
                <View style={styles.addBtnView}>
                    <TouchableOpacity activeOpacity={1} onPress={this.showAddView.bind(this)} style={styles.addBtn}>
                        <Image source={ASSET_IMAGES.ICON_ADD} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    showAddView() {
        this.setState({
            isAdd: !this.state.isAdd
        });
        LayoutAnimation.easeInEaseOut();
    }
}


const styles = StyleSheet.create({
    content: {
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        position: 'absolute',
        right: px(50),
        bottom: px(120),
        height: px(114),
        width: px(114),
        borderRadius: px(57),
        overflow: 'hidden'
    },
    typeView: {
        // flex: 1
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1
    },
    addTypeBtn: {
        alignItems: 'center'
    },
    addTypeTitle: {
        color: '#333333',
        fontSize: px(18),
        fontWeight: 'bold'
    },
    addBtnView: {
        justifyContent: 'center',
        marginRight: px(4),
    },
    addBtn: {
        width: px(106),
        height: px(106),
        borderRadius: px(53),
        alignItems: 'center',
        justifyContent: 'center'
    },
    addImage: {
        width: px(50),
        height: px(50),
        marginBottom: px(10)
    }
})