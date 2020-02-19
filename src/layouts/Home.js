import React, { Component, Fragment } from 'react'
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image, LayoutAnimation, FlatList, SectionList, ScrollView } from 'react-native'
import { Header, SignItem, AddItem, WarnHeader, SignSuccessModal, MessageItem, WeekItem, NormalItem, SpecialItem, SectionHeader, NoneData } from '../components'
import { commonStyles } from '../commonStyles'
import { px, getCurrentDays } from '../utils'
import { ASSET_IMAGES } from '../config'
import { getPersonalClockByDay, getSpecialClockByDay, unReadCount } from '../requests'

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWeek: null,
            today: null,
            selectIndex: 0,
            weeks: null,
            normalList: [],
            specialList: [],
            messageCnt: 0
        }
    }

    componentDidMount() {
        this.loadWeekConfig();
        this.loadUnReadCount();
    }

    render() {
        const { messageCnt } = this.state;
        return (
            <SafeAreaView style={commonStyles.content}>
                {/* <Text>Home!</Text> */}
                <Header leftIsBack={false} title="唯友首页" rightComponent={this.rightComponent(messageCnt)} />
                {/* <SignItem /> */}
                <WeekItem
                    currentWeek={this.state.currentWeek}
                    weeks={this.state.weeks}
                    selectIndex={this.state.selectIndex}
                    onChangeSelect={this.changeDaySelect.bind(this)}
                />
                <ScrollView style={commonStyles.content}>
                    {this.renderListItem(this.state.normalList, this.state.specialList)}
                </ScrollView>
                <AddItem
                    addNormal = {
                        this.navigateToNormal.bind(this)
                    }
                    addSpecial = {
                        this.navigateToSpecial.bind(this)
                    }
                />
            </SafeAreaView>
        );
    }

    // view
    rightComponent(messageCnt){
        return (
            <TouchableOpacity onPress={this.navigateToMessageList.bind(this)} activeOpacity={0.7} style={styles.messageButton}>
                <Image style={styles.messageIcon} source={ASSET_IMAGES.ICON_MESSAGE} />
                {this.renderUnReadComponent(messageCnt)}
            </TouchableOpacity>
        )
    }

    renderUnReadComponent(messageCnt) {
        if (messageCnt == 0) return null;
        if (messageCnt <= 99) {
            return <View style={styles.messageCount}>
                <Text style={styles.messageCountText}>{messageCnt}</Text>
            </View>
        }
        return <View style={styles.messageCount}>
            <Text style={styles.messageCountText}>99+</Text>
        </View>
    }

    renderListItem(normalList = [], specialList = []) {
        if (normalList.length === 0 && specialList.length === 0) {
            return <NoneData />
        }
        return (
            <Fragment>
                <SectionHeader type={'normal'} title={"日常"} />
                {normalList.map((item, index) => {
                    return <NormalItem data={item} key={index} />
                })}
                <SectionHeader type={'special'} title={"特殊"} />
                {specialList.map((item, index) => {
                    return <SpecialItem data={item} key={index + normalList.length}/>
                })}
            </Fragment>
        )
    }

    // action
    navigateToMessageList() {
        this.props.navigation.navigate('MessageList')
    }

    navigateToNormal() {
        this.props.navigation.navigate('AddHabitDetail');
    }

    navigateToSpecial() {
        this.props.navigation.navigate('AddSpecial');
    }

    changeDaySelect(index) {
        this.setState({
            selectIndex: index
        })
        LayoutAnimation.easeInEaseOut();
    }

    loadWeekConfig() {
        let days = getCurrentDays();
        const {
            currentWeek,
            today,
            weeks,
            requestWeeks
        } = days;
        const index = currentWeek.indexOf(today)
        this.setState({
            currentWeek: currentWeek,
            today: today,
            weeks: weeks,
            selectIndex: index,
            requestWeeks: requestWeeks
        }, () => {
            this.loadTasks();
        })
    }

    // request
    loadTasks() {
        const { selectIndex, requestWeeks } = this.state;
        const data = {
            callback: this.loadClockCallback.bind(this),
            day: '2020-02-17'
        }
        const specialData = {
            callback: this.loadSpecialClockCallback.bind(this),
            day: requestWeeks[selectIndex]
        }
        getPersonalClockByDay(data);
        getSpecialClockByDay(specialData)
    }

    loadClockCallback(res) {
        const {
            success,
            data
        } = res;
        if (success) {
            this.setState({
                normalList: data
            })
        }
    }

    loadSpecialClockCallback(res) {
        const {
            success,
            data
        } = res;
        if (success) {
            this.setState({
                specialList: data
            })
        }
    }

    loadUnReadCount() {
        unReadCount({
            callback: this.loadUnReadCountCallback.bind(this)
        })
    }

    loadUnReadCountCallback(res) {
        const { success, data } = res;
        console.log('unreadCount', data);
        if (success) {
            const { messageCnt = 0 } = data;
            this.setState({
                messageCnt: messageCnt
            })
        }
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        marginBottom: 12
    },
    messageButton: {
        marginRight: px(30),
        width: px(60),
        height: px(60)
    },
    messageCount: {
        position: 'absolute',
        backgroundColor: 'red',
        height: px(36),
        width: px(36),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px(40),
        borderRadius: px(18)
    },
    messageCountText: {
        fontSize: px(16),
        color: '#fff',
    },
    messageIcon: {
        marginLeft: px(10),
        marginTop: px(10)
    }
});
