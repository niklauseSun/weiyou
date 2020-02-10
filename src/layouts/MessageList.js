import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header } from '../components';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView>
                <Header
                    navigation={this.props.navigation}
                    title={"消息列表"} />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

})