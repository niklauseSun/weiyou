import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class SpecialAddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Text>添加特殊打卡任务</Text>
                <Text>发生紧急情况通知监护人</Text>
            </View>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})