import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Modal } from '@ant-design/react-native';
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

const alert = Modal.alert;

export default class SignEnd extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.content} onPress={this.signEnd.bind(this)}>
                <ImageBackground source={ASSET_IMAGES.ICON_SIGN_END} style={styles.signEndBg}>
                    <Text style={styles.signText}>结束</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    signEnd() {
        alert('确认', '确定同意么？', [
            { text: '确认', onPress: () => {
                const { singEndAction } = this.props;
                if (singEndAction) {
                    singEndAction();
                }
            } },
            { text: '取消', onPress: () => {

            } },
        ]);
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        width: px(200),
        height: px(200),
        borderRadius: px(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    signEndBg: {
        width: px(180),
        height: px(180),
        alignItems: 'center',
        justifyContent: 'center'
    },
    signText: {
        fontSize: px(28),
        color: '#686D6E',
        marginTop: px(-10)
    }
})