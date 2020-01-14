import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Home, Message, Setting } from '../layouts'

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
            tabBarLabel: "打卡"
        }
    },
    Message: {
        screen: MessageStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "邻里"
        }
    },
    Settings: {
        screen: SettingStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "我的"
        }
    }
}, {
    lazy: true,
    tabBarOptions: {
        activeTintColor: "#FBA345"
    }
});

export default createAppContainer(TabNavigator);