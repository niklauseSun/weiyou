import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header } from '../components';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView>
                <Header title="购买会员" navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})