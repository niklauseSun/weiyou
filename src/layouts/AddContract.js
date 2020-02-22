import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header, SearchItem, PredictContract } from '../components';

export default class AddContract extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header navigation={this.props.navigation} title="添加" />
                {/* <SearchItem placeholder="输入关键字" /> */}
                <PredictContract />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
})