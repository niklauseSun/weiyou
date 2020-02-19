import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px, formatHourWithString } from '../utils';

export default class AddNormalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { icon,name , clock_time } = this.props.data;
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this.navigateDetail.bind(this)} style={styles.innerContent}>
                    <Image style={styles.headImage} source={{ uri: icon}} />
                    <View>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subTitle}>{formatHourWithString(clock_time)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    navigateDetail() {
        const { changeData, data } = this.props;
        if (changeData) {
            changeData(data)
        }
        // this.props.navigation.navigate('AddHabitDetail');
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        width: '50%',
        height: px(142),
        marginTop: px(20),
        paddingHorizontal: px(24)
    },
    innerContent: {
        backgroundColor: '#eaeaea',
        flex: 1,
        borderRadius: px(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        resizeMode: 'contain',
        marginLeft: px(20),
        marginRight: px(20)
    },
    title: {
        color: '#333333',
        fontSize: px(32)
    },
    subTitle: {
        fontSize: px(26),
        color: '#999'
    }
})