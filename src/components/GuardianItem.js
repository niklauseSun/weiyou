import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { getGuardianList } from '../requests';
import { px } from '../utils';
import { LineItem } from '.';

export default class GuardianItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guardianList: []
        }
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        return (
            <View style={styles.content}>
                <FlatList
                    data={this.state.guardianList}
                    renderItem={({item, index}) => {
                        // return <View key={index}>
                        //     <Image source={{ uri: item.avatar }} />
                        //     <View>
                        //         <Text>{item.nickname}</Text>
                        //         <Text>{item.message}</Text>
                        //     </View>
                        // </View>
                        return <View style={styles.itemContent} key={index}>
                            {item.avatar == '' ? <View style={styles.headImage}  />:<Image style={styles.headImage} source={{ uri: item.avatar}} />}
                            <View style={styles.detailView}>
                                <Text style={styles.name}>{item.nickname}</Text>
                                <Text style={styles.detailText}>{item.message == null ? '': item.message.content}</Text>
                            </View>
                        </View>
                    }}
                    ItemSeparatorComponent={() => <LineItem />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    loadList() {
        // getGuardianList
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadListCallback.bind(this)
        }
        getGuardianList(data)
    }

    loadListCallback(res) {
        console.log('list', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                guardianList: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    itemContent: {
        height: px(120),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: px(30),
        paddingVertical: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        borderRadius: px(45),
        backgroundColor: '#999'
    },
    detailView: {
        marginLeft: px(30)
    },
    name: {
        fontSize: px(28),
        color: '#333'
    },
    detailText: {
        fontSize: px(26),
        color: '#999'
    }
})