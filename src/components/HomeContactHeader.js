import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headerTextView}>
                    <Text>我</Text>
                    <View style={styles.guardView}>
                        <Text style={styles.guardText}>监护</Text>
                    </View>
                    <Text>的人</Text>
                </View>
                <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.moreButton}>
                    <Text style={styles.moreButtonText}>更多</Text>
                </TouchableOpacity>
            </View>
        )
    }

    navigate() {
        this.props.navigation.navigate('GuardianList');
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        height: px(90),
        paddingHorizontal: px(30),
        alignItems: 'center'
    },
    headerTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    guardView: {
        backgroundColor: '#333',
        padding: px(5),
        paddingHorizontal: px(10),
        marginHorizontal: px(5)
    },
    guardText: {
        color: '#fff'
    },
    moreButton: {
        width: px(80),
        alignItems: 'flex-end'
    },
    moreButton: {
        color: '#666'
    }
})