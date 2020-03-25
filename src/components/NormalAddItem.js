import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class NormalAddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageUrl = null, title = '添加打卡任务', subTitle = '养成练好的生活习惯'} = this.props;
        return (
            <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <View style={styles.titleView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    navigate() {
        const { type = 'normal' } = this.props;
        if (type == 'special') {
            this.props.navigation.navigate('AddSpecial');
        } else if (type == 'addContact') {
            this.props.navigation.navigate('AddContract')
        } else if (type == 'normal') {
            this.props.navigation.navigate('AddHabitDetail');
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: px(40),
        backgroundColor: '#eaeaea',
        borderRadius: px(20),
        height: px(272),
        borderColor: '#ed7539',
        borderWidth: px(1),
        marginVertical: px(20)
    },
    headImage: {
        height: px(110),
        width: px(110),
        marginLeft:px(40),
        marginRight: px(40)
    },
    titleView: {
        alignItems: 'center'
    },
    title: {
        fontSize: px(40),
        color: '#333'
    },
    subTitle: {
        fontSize: px(26),
        color: '#999',
        marginTop: px(20)
    }
})