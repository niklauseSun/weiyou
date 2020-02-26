import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { px } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class EmergencyInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { selectIndex = 0, content = null } = this.props;
        console.log('selectIndex', selectIndex)
        return (
            <View style={styles.content}>
                <TextInput onChangeText={this._changeText.bind(this)} style={styles.inputItem} value={content} placeholder="#请写下您的遗嘱 遗体捐赠 心愿描述..." multiline={true} />
                <View style={styles.selectButtonViews}>
                    <TouchableOpacity onPress={this.changeAction.bind(this, 0)} style={[styles.defaultButton, 0 == selectIndex ? styles.selectButtonStyles: null]}>
                        <Text style={[styles.willDefaultText, 0 == selectIndex? styles.selectTextStyle: null]}>遗嘱</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeAction.bind(this, 1)} style={[styles.defaultButton, 1 == selectIndex ? styles.selectButtonStyles: null]}>
                        <Text style={[styles.willDefaultText, 1 == selectIndex? styles.selectTextStyle: null]}>遗体捐赠</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changeAction.bind(this, 2)} style={[styles.defaultButton, 2 == selectIndex ? styles.selectButtonStyles: null]}>
                        <Text style={[styles.willDefaultText, 2 == selectIndex? styles.selectTextStyle: null]}>心愿</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    changeAction(index) {
        const { changeSelectIndex } = this.props;
        if (changeSelectIndex) {
            changeSelectIndex(index);
        }
    }

    _changeText(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height:px(370),
        marginHorizontal: px(30),
        backgroundColor: '#fff',
        borderRadius: px(10),
        marginTop: px(30),
        paddingHorizontal: px(30)
    },
    inputItem: {
        marginTop: px(20),
        flex: 1
    },
    selectButtonViews: {
        height: px(120),
        flexDirection: 'row',
        alignItems: 'center'
    },
    defaultButton: {
        width: px(134),
        height: px(52),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(5),
        borderColor: '#999',
        borderWidth: px(1),
        marginRight: px(20)
    },
    selectButtonStyles: {
        width: px(134),
        height: px(52),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(5),
        backgroundColor: '#333'
    },
    willDefaultText: {
        color: '#333',
        fontSize: px(20)
    },
    selectTextStyle: {
        color: '#fff',
        fontSize: px(20)
    }
})