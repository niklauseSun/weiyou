import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { commonStyles } from '../commonStyles';
import { Header } from '../components';

export default class QuestionReport extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="意见反馈" />
                <View style={commonStyles.body}>

                </View>
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})