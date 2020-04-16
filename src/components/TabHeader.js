import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
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
                <ScrollView
                    style={styles.scrollView}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.content}>
                {
                    data.map((item, index) => {
                        return <TouchableOpacity key={index} onPress={this.changeIndex.bind(this, index)} style={styles.tabButton}>
                            <Text style={[styles.defaultText, selectIndex === index ? styles.selectText: null ]}>{item.name}</Text>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
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
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        paddingHorizontal: px(20)
    },
    scrollView: {
        height: px(90),
    },
    tabButton: {
        paddingHorizontal: px(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultText: {
        fontSize: px(28),
        color: '#999'
    },
    selectText: {
        color: '#ED7539'
    }
})