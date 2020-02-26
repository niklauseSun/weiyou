import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Modal } from '@ant-design/react-native';
import { px } from '../utils';

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
                <Text style={styles.signText}>结束</Text>
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
        backgroundColor: '#999',
        borderRadius: px(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px(40)
    }
})