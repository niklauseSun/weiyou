import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, DeviceEventEmitter, ScrollView } from 'react-native'
import { Header, TaskItem, SectionHeader, NormalItem, NormalAddItem, NormalDeleteItem, SpecialDeleteItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';
import { px } from '../utils'
import {
    getSpecialClockList,
    getPersonalClockList
} from '../requests';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            normalList:[],
            specialList: []
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

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header leftIsBack={false} title="任务" />
                <ScrollView style={commonStyles.content}>
                    {this.renderListItem()}
                    {/* <TaskItem navigation={this.props.navigation} title="日常任务" imageUrl={ASSET_IMAGES.ICON_CUSTOM} />
                    <TaskItem navigation={this.props.navigation} type="emergency" imageUrl={ASSET_IMAGES.ICON_EMERGENCY} /> */}
                </ScrollView>
            </SafeAreaView>
        )
    }

    renderListItem() {
        return (
          <View style={styles.moduleContent}>
            <SectionHeader
              type={'normal'}
              title={'日常'}
              addAction={this.navigateToNormal.bind(this)}
            />
            <Text style = {
                styles.tipText
            }>记录日常生活，提醒用户按时用餐就寝，并将生活状态反馈给监护人。</Text>
            <FlatList
                data={this.state.normalList.filter((item) => item.deleted == false)}
                renderItem={({item}) => {
                    return <NormalDeleteItem navigation={this.props.navigation} reloadTask={this.loadNormalTaskList.bind(this)} data={item} />
                }}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => {
                return (
                  <NormalAddItem
                    imageUrl={ASSET_IMAGES.ICON_HOME_NORMAL_ADD}
                    navigation={this.props.navigation}
                  />
                );
              }}
            />
            <SectionHeader
              type={'special'}
              title={'特殊'}
              addAction={this.navigateToSpecial.bind(this)}
            />
            <Text style={styles.tipText}>记录突发事件，对于即将发生可能存在风险的事件设置提醒，按固定频率推送问题，遇到无应答或多次答错状况立刻通知监护人。</Text>
            <FlatList
              data={this.state.specialList.filter((item) => item.deleted == false)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <SpecialDeleteItem
                  navigation={this.props.navigation}
                  data={item}
                  key={index + this.state.normalList.length}
                />
              )}
              ListEmptyComponent={() => {
                return (
                  <NormalAddItem
                    imageUrl={ASSET_IMAGES.ICON_SPECIAL_DEFAULT}
                    title="添加特殊打卡"
                    subTitle="发生紧急情况通知监护人"
                    type="special"
                    navigation={this.props.navigation}
                  />
                );
              }}
            />
          </View>
        );
    }

    navigateToNormal() {
        this.props.navigation.navigate('AddHabitDetail');
    }

    navigateToSpecial() {
        this.props.navigation.navigate('AddSpecial');
    }

    loadTaskList() {
        this.loadNormalTaskList();
        this.loadSpecialTaskList();
    }

    loadNormalTaskList() {
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadNormalTaskListCallback.bind(this)
        }
        // getPersonalClockList
        getPersonalClockList(data);
    }

    loadNormalTaskListCallback(res) {
        const { success, data } = res;
        if (success) {
            this.setState({
                normalList: data,
            })
        }
    }

    loadSpecialTaskList() {
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadSpecialTaskListCallback.bind(this)
        }
        // getPersonalClockList
        getSpecialClockList(data);
    }


    loadSpecialTaskListCallback(res) {
        const { success, data } = res;
        if (success) {
            this.setState({
                specialList: data,
                isLoading: false
            })
        }
    }
}

const styles = StyleSheet.create({
    moduleContent: {

    },
    tipText: {
        marginHorizontal: px(30),
        marginBottom: px(20),
        color: '#9F8E66',
        fontSize: px(24)
    }
})