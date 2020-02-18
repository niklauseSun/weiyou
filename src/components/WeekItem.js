import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation} from 'react-native'
import { getCurrentDays, px } from '../utils';

const weekString = ["日", "一", "二", "三", "四", "五", "六"];

export default class WeekItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeek: null,
            today: null,
            weeks: null,
            selectIndex: 0
        }
    }

    componentDidMount() {
    }

    render() {
        const { currentWeek, weeks, selectIndex } = this.props;

        return (
            <View style={styles.content}>
                { currentWeek == null ? null: 
                    currentWeek.map((item, index) => {
                        return (
                            <View style={styles.weekItem} key={index}>
                                <Text>{weekString[weeks[index]]}</Text>
                                <TouchableOpacity onPress={this.selectItem.bind(this, index)} style={[styles.selectItem , {
                                    backgroundColor: index == selectIndex ? '#e06831': '#fff'
                                }]}>
                                    <Text style={[styles.selectItemText, {
                                        color: index === selectIndex ? '#fff': '#000'
                                    }]}>{ item === this.state.today ? '今': item }</Text>
                                </TouchableOpacity>
                                {/* <View style={styles.dotView} /> */}
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    selectItem(index) {
        const { onChangeSelect } = this.props;
        onChangeSelect(index)
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: px(176),
        backgroundColor: '#fff'
    },
    weekItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectItem: {
        width: px(66),
        height: px(66),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(33),
        marginTop: px(14)
    },
    selectItemText: {
        fontSize: px(36)
    },
    dotView: {
        width: px(12),
        height: px(12),
        backgroundColor: '#e06831',
        marginTop: px(14),
        borderRadius: px(6)

    }
})