import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageUrl = null, title = "特殊任务", type="normal" } = this.props;
        return (
            <TouchableOpacity onPress={this.navigateList.bind(this)} activeOpacity={0.7} style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <Text style={styles.title}>{title}</Text>
                <Image style={styles.moreIcon} source={ASSET_IMAGES.ICON_MORE} />
            </TouchableOpacity>
        )
    }

    navigateList() {
        const { type = "normal" } = this.props;
        this.props.navigation.navigate('TaskList', {
            type: type
        });
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(140),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: px(40),
        backgroundColor: '#fff',
        borderRadius: px(70),
        marginTop: px(30)
    },
    headImage: {
        width: px(44),
        height: px(44),
        marginLeft: px(30),
        marginRight: px(30)
    },
    title: {
        flex: 1
    },
    moreIcon: {
        marginRight: px(30)
    }
})