import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px, formateDateHourWithString } from '../utils';

export default class EmergencyListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

//     pictures: ["https://devimage.99rongle.com/customer%2F100%2F202021582706595844.jpg"]
// id: 4
// customer_id: 100
// content: "test"
// type: "will"
// phonenumber: "18301709959"
// create_time: "2020-02-26T08:43:26.000Z"
// update_time: "2020-02-26T08:43:26.000Z"

    render() {
        const { type, create_time, content } = this.props.data;
        return (
            <TouchableOpacity onPress={this.navigateEdit.bind(this)} style={styles.content}>
                <Text style={styles.title}>{content}</Text>
                <View style={styles.detail}>
                    <Text style={styles.type}>{this.typeText(type)}</Text>
                    <Text style={styles.time}>{formateDateHourWithString(create_time)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    navigateEdit() {
        this.props.navigation.navigate('AddEmergency', {
            id: this.props.data.id,
            addType: 'edit'
        })
    }


    typeText(type) {
        switch (type) {
            case 'will':
                return '遗嘱'
            case 'donation':
                return '捐赠'
            case 'wish':
                return '心愿'
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(220),
        backgroundColor: '#fff',
        marginHorizontal: px(30),
        borderRadius: px(20),
        marginTop: px(30),
        paddingHorizontal: px(30)
    },
    title: {
        fontSize: px(28),
        marginTop: px(30),
        height: px(120)
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    type: {
        fontSize: px(26),
        color: '#ED7539',
        flex: 1
    },
    time: {
        fontSize: px(24),
        color: '#999'
    }
})