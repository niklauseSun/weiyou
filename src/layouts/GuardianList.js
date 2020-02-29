import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header, GuardianItem } from '../components';
import { commonStyles } from '../commonStyles';

export default class GuardianList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="我监护的人" navigation={this.props.navigation} />
                <GuardianItem navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})