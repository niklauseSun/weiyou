import React, { Component } from 'react'
import { View, Text } from 'react-native'

class MessageScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>message!</Text>
            </View>
        );
    }
}

export default MessageScreen;