import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Home, Message, Setting } from '../layouts'
import React, { Component } from "react";
import { Image, StyleSheet } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

const defaultNavigationOptions = {
    headerShown: false
}

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: defaultNavigationOptions
    }
})

const MessageStack = createStackNavigator({
    Message: {
        screen: Message,
        navigationOptions: defaultNavigationOptions
    }
})

const SettingStack = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: defaultNavigationOptions
    }
})

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "打卡",
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA_SELECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA}
                        />
                    );
                }
            }
        }
    },
    Message: {
        screen: MessageStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "邻里",
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA_SELECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA}
                        />
                    );
                }
            }
        }
    },
    Settings: {
        screen: SettingStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA_SELECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_DAKA}
                        />
                    );
                }
            }
        }
    }
}, {
    lazy: true,
    tabBarOptions: {
        activeTintColor: "#FBA345"
    }
});

const styles = StyleSheet.create({
    iconStyle: {
        height: px(18),
        width: px(18)
    }
})

export default createAppContainer(TabNavigator);