import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { Header, NormalDeleteItem, NoneData, SpecialDeleteItem, EndComponent } from '../components'
import { getPersonalClockList, getSpecialClockList } from '../requests';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        const { type } = props.navigation.state.params || {};
        this.state = {
            type: type,
            normalList: [],
            specialList: []
        }
    }

    componentDidMount() {
        this.loadTaskList();
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <Header navigation={this.props.navigation} title={this.state.type == 'normal'? '普通任务': '紧急任务'} />
                {this.renderItemList()}
            </SafeAreaView>
        )
    }

    renderItemList() {
        console.log('renderitem', this.state.type, this.state.normalList)
        if (this.state.type == 'normal') {
            return (
                <FlatList
                    data={this.state.normalList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                        return <NormalDeleteItem navigation={this.props.navigation} reloadTask={this.loadNormalTaskList.bind(this)} data={item} />
                    }}
                    ListFooterComponent={() => <EndComponent />}
                    ListEmptyComponent={() => <NoneData />}
                />
            )
        }
        return (
            <FlatList
                data={this.state.specialList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return <SpecialDeleteItem navigation={this.props.navigation} reloadTask={this.loadSpecialTaskList.bind(this)} data={item} />
                }}
                ListEmptyComponent={() => <NoneData />}
                ListFooterComponent={() => <EndComponent />}
            />
        )
    }

    loadTaskList() {
        if (this.state.type == 'normal') {
            this.loadNormalTaskList();
        } else {
            this.loadSpecialTaskList();
        }
    }

    loadNormalTaskList() {
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadTaskListCallback.bind(this)
        }
        // getPersonalClockList
        getPersonalClockList(data);
    }

    loadSpecialTaskList() {
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadTaskListCallback.bind(this)
        }
        // getPersonalClockList
        getSpecialClockList(data);
    }

    loadTaskListCallback(res) {
        console.log('res', res);
        const { success, data } = res;
        if (success) {
            if (this.state.type == 'normal') {
                this.setState({
                    normalList: data
                })
            } else {
                this.setState({
                    specialList: data
                })
            }
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff'
    }
})