import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';

export default class SectionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title = "" } = this.props;
        return (
            <View style={styles.content}>
                <Text style={styles.header}>{title}</Text>
                <TouchableOpacity onPress={this.headAction}>
                    <Image source={ASSET_IMAGES.ICON_HOME_TASK_ADD} />
                </TouchableOpacity>
            </View>
        )
    }

    headAction = () => {
        const { addAction } = this.props;
        if (addAction) {
            addAction();
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(90),
        alignItems: 'center',
        paddingHorizontal: px(30),
        marginBottom: px(10)
    },
    header: {
        flex: 1
    }
})