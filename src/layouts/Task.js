import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header, TaskItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header leftIsBack={false} title="任务" />
                <View style={commonStyles.body}>
                    <TaskItem navigation={this.props.navigation} title="普通任务" imageUrl={ASSET_IMAGES.ICON_CUSTOM} />
                    <TaskItem navigation={this.props.navigation} type="emergency" imageUrl={ASSET_IMAGES.ICON_EMERGENCY} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})