import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class NormalDateSelectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { startTime = '', endTime = '' } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.startView}>
                    <Text style={styles.title}>开始时间</Text>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>今天</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.subTitle}>subTitle</Text> */}
                </View>
                <View style={styles.endView}>
                    <Text style={styles.title}>开始时间</Text>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>无限期目标</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(240),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        marginHorizontal: px(30),
        flexDirection: 'row',
    },
    startView: {
        flex: 1,
        justifyContent: 'center',
        borderRightColor: 'red'
    },
    endView: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#999',
        fontSize: px(28),
        marginBottom: px(10),
    },
    selectButton: {
        paddingVertical: px(6)
    },
    selectButtonText: {
        fontSize: px(36),
        color: '#ED7539'
    }
});