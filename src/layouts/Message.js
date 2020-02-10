import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Header } from '../components'
import { commonStyles } from '../commonStyles'

class MessageScreen extends Component {
    render() {
        return (
            <SafeAreaView style={commonStyles.body}>
                <Header title="联系人" />
                <Text>message!</Text>
            </SafeAreaView>
        );
    }
}

export default MessageScreen;