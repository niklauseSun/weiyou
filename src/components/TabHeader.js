import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px } from '../utils';

export default class TabHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data = [], selectIndex = 0 } = this.props;
        return (
            <View style={styles.content}>
                {
                    data.map((item, index) => {
                        return <TouchableOpacity onPress={this.changeIndex.bind(this, index)} style={styles.tabButton}>
                            <Text style={[styles.defaultText, selectIndex === index ? styles.selectText: null ]}>{item.name}</Text>
                        </TouchableOpacity>
                    })
                }
            </View>
        )
    }

    changeIndex(index) {
        const { onChangeTabIndex = null } = this.props;
        if (onChangeTabIndex) {
            onChangeTabIndex(index);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        height: px(90),
        flexDirection: 'row',
        marginLeft: px(30)
    },
    tabButton: {
        width: px(120),
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultText: {
        fontSize: px(32),
        color: '#999'
    },
    selectText: {
        color: '#333333'
    }
})