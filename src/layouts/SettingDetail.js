import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import { Header, SetDetailItem } from '../components';
import { px } from '../utils';

export default class SettingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <Header navigation={this.props.navigation} title="设置" />
                <View style={styles.content}>
                    <SetDetailItem />
                </View>
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#eaeaea',
        paddingTop: px(30)
    }
})