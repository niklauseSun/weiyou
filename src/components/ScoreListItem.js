import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { px, formateDateHourWithString } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class ScoreListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { type, score, create_time, direction } = this.props.data;
        return (
            <View style={styles.content}>
                <View style={{ width: px(20), height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.lineView}></View>
                    <View style={styles.dotView}></View>
                </View>
                <View style={styles.contentView}>
                    <View>
                        <Text style={styles.signText}>{this.typeStatus(type)}</Text>
                        <Text style={styles.timeText}>{formateDateHourWithString(create_time)}</Text>
                    </View>
                    <View style={styles.scoreView}>
                        <Text style={ direction == 'add'? styles.addText: styles.minusText}>{direction == 'add' ? '+' : '-'}</Text>
                        <Text style={ direction == 'add'? styles.addText: styles.minusText}>{score}</Text>
                        {direction == 'add' ? <Image style={styles.pigIcon} source={ASSET_IMAGES.ICON_ADD_PIG} />: <Image style={styles.pigIcon} source={ASSET_IMAGES.ICON_DELETE_PIG} />}
                    </View>
                </View>
                <View style={styles.bottomLineView} />
            </View>
        )
    }

    typeStatus(type) {
        switch(type) {
            case 'sign':
                return '签到';
            case 'vipOrder':
                return '购买会员'
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(140),
        paddingHorizontal: px(30),
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    lineView: {
        width: px(3),
        height: '100%',
        backgroundColor: '#eaeaea'
    },
    dotView: {
        backgroundColor: '#333',
        position: 'absolute',
        borderRadius: px(10),
        height: px(20),
        width: px(20)
    },
    bottomLineView: {
        height: px(1),
        width: '100%',
        backgroundColor: '#eaeaea',
        position: 'absolute',
        left: px(40),
    },
    contentView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: px(30)
    },
    signText: {
        fontSize: px(30),
        color: '#333',
        marginBottom: px(20)
    },
    timeText: {
        color: '#999'
    },
    scoreView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    addText: {
        fontSize: px(26),
        color: '#FF7200'
    },
    minusText: {
        fontSize: px(26),
        color: '#26BB7A'
    },
    pigIcon: {
        marginLeft: px(20)
    }
})