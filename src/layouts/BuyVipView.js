import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Header } from '../components';
import { commonStyles } from '../commonStyles';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="购买会员" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    
                </ScrollView>
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})