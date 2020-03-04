import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { Header, NormalDeleteItem, NoneData, SpecialDeleteItem, EndComponent } from '../components'
import { getPersonalClockList, getSpecialClockList } from '../requests';
import { px } from '../utils';

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
        this.emitter = DeviceEventEmitter.addListener('taskListReload',(dict) => {
            this.loadTaskList();
        })
    }

    componentWillUnmount() {
        this.emitter = null;
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <Header navigation={this.props.navigation} title={this.state.type == 'normal'? '普通任务': '紧急任务'} rightComponent={this.rightComponent()} />
                {this.renderItemList()}
            </SafeAreaView>
        )
    }

    rightComponent() {
        return <TouchableOpacity onPress={this.goToAdd.bind(this)} style={styles.addButton}>
            <Text style={styles.addButtonText}>添加</Text>
        </TouchableOpacity>
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

    goToAdd() {
        if (this.state.type == 'normal') {
            this.props.navigation.navigate('AddHabitDetail');
        } else {
            this.props.navigation.navigate('AddSpecial');
        }
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
    },
    addButton: {
        width: px(100)
    },
    addButtonText: {
        color: '#ED7539'
    }
})