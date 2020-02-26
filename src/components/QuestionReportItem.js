import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class QuestionReportItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = '卡顿', index = 0, selectIndex = 0} = this.props;
        return (
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={this.onChangeSelectIndex.bind(this)} style={styles.selectButton}>
                    {index == selectIndex ? <Image style={styles.selectIcon} source={ASSET_IMAGES.ICON_SELECT_CORRECT} />: null}
                </TouchableOpacity>
            </View>
        )
    }

    onChangeSelectIndex() {
        const { changeIndex, index } = this.props;
        if (changeIndex) {
            changeIndex(index);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(120),
        flexDirection: 'row',
        paddingHorizontal: px(30),
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    selectIcon: {
        width: px(40),
        height: px(40)
    },
    selectButton: {
        flex: 1,
        alignItems: 'flex-end',
        height: '100%',
        justifyContent: 'center'
    }
})