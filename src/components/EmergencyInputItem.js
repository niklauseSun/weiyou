import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import { px } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class EmergencyInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleArray: ['墓志铭', '我这一生', '身后事', '财产处置', '遗产处置', '未了心愿']
        }
    }

    render() {
        const { selectArrays = [], content = null } = this.props;
        const { titleArray } = this.state;
        return (
            <View style={styles.content}>
                <ScrollView horizontal={true} contentContainerStyle={styles.selectButtonViews}>
                    {
                        titleArray.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={this.changeAction.bind(this, index)} style={[styles.defaultButton, selectArrays.indexOf(index) >=0 ? styles.selectButtonStyles: null]}>
                        <Text style={[styles.willDefaultText, selectArrays.indexOf(index) >=0 ? styles.selectTextStyle: null]}>{item}</Text>
                    </TouchableOpacity>
                        })
                    }
                </ScrollView>
            </View>
        )
    }
    changeAction(index) {
        const { changeSelectIndex } = this.props;
        console.log('click', index);

        let res = this.props.selectArrays;
        if (this.props.selectArrays.indexOf(index) >= 0) {
            res = res.filter((item) => item != index);
        } else {
            res.push(index);
        }

        changeSelectIndex(res);


        // if (changeSelectIndex) {
        //     changeSelectIndex(index);
        // }
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
        marginHorizontal: px(20),
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