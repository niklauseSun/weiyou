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
            specialList: [],
            pageIndex: 0,
            isLoading: false
        }
    }

    componentDidMount() {
        this.loadTaskList();
        this.emitter = DeviceEventEmitter.addListener('taskListReload',(dict) => {
            this.setState({
                pageIndex: 0
            }, () => {
                this.loadTaskList();
            })
        })
    }

    componentWillUnmount() {
        this.emitter = null;
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <Header navigation={this.props.navigation} title={this.state.type == 'normal'? '日常任务': '特殊任务'} rightComponent={this.rightComponent()} />
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
                onEndReached={() => {
                    if (!this.state.isLoading) {
                        this.loadMoreTaskList();
                    }
                }}
            />
        )
    }

    goToAdd() {
        if (!global.isLogin) {
            this.props.navigation.navigate('LoginView');
            return;
        }
        if (this.state.type == 'normal') {
            this.props.navigation.navigate('AddHabitDetail');
        } else {
            this.props.navigation.navigate('AddSpecial');
        }
    }

    loadTaskList() {
        if (!global.isLogin) {
            return;
        }
        this.setState({
            isLoading: true,
            pageIndex: 0
        }, () => {
            if (this.state.type == 'normal') {
                this.loadNormalTaskList();
            } else {
                this.loadSpecialTaskList();
            }
        })
    }

    loadMoreTaskList() {
        this.setState({
            isLoading: true
        }, () => {
            if (!global.isLogin) {
                return;
            }
            if (this.state.type == 'normal') {
                this.loadMoreNormalTaskList();
            } else {
                this.loadMoreSpecialTaskList();
            }
        })
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

    loadMoreNormalTaskList() {
        const data = {
            pageNum: this.state.pageIndex,
            pageSize: 10,
            callback: this.loadMoreTaskListCallback.bind(this)
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

    loadMoreSpecialTaskList() {
        const data = {
            pageNum: this.state.pageIndex,
            pageSize: 10,
            callback: this.loadMoreTaskListCallback.bind(this)
        }
        // getPersonalClockList
        getSpecialClockList(data);
    }

    loadTaskListCallback(res) {
        const { success, data } = res;
        if (success) {
            if (this.state.type == 'normal') {
                this.setState({
                    normalList: data,
                    pageIndex: this.state.pageIndex + 1,
                    isLoading: false
                })
            } else {
                this.setState({
                    specialList: data,
                    pageIndex: this.state.pageIndex + 1,
                    isLoading: false
                })
            }
        }
    }

    loadMoreTaskListCallback(res) {
        const { success, data } = res;
        if (success) {
            if (this.state.type == 'normal') {
                this.setState({
                    normalList: [...this.state.normalList, ...data],
                    pageIndex: this.state.pageIndex + 1
                })
            } else {
                this.setState({
                    specialList: [...this.state.specialList, ...data],
                    pageIndex: this.state.pageIndex + 1
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