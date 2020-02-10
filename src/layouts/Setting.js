import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Header, MyDetailItem, AccountView } from '../components'
import SetInfoItem from '../components/SetInfoItem'
import { ASSET_IMAGES } from '../config';

class SettingScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.content}>
                <MyDetailItem />
                <AccountView />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_ABOUT_US} title={"关于我们"} />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_OPINION} title={"意见反馈"} />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_EVALUATION} title={"评价鼓励"} />
                <SetInfoItem imageUrl={ASSET_IMAGES.ICON_RECOMMEND} title={"推荐给好友"} />
            </SafeAreaView>
        );
    }
}

export default SettingScreen;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
})