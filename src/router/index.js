import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import {
    Home,
    Message,
    Setting,
    MessageList,
    LoginView,
    ShortLoginView,
    ForgetPassword,
    ResetPassword,
    Task,
    AddContract,
    AddHabit,
    AddSpecial,
    AddHabitDetail,
    AddQuestion,
    TaskList,
    EditPassword,
    SignSpecial,
    SettingDetail,
    QuestionReport,
    AddEmergency,
    EmergencyList,
    ContactList,
    ContactDetail,
    GuardianMessageList,
    MessageDetail,
    GuardianList,
    PersonDetail,
    AccountView,
    NormalUser,
    BuyVipView,
    VipUser,
    NormalSign,
    LocationMap,
    GuardMyList
}
from '../layouts'
import React from "react";
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
    },
    MessageList: {
        screen: MessageList,
        navigationOptions: defaultNavigationOptions
    },
    AddHabit: {
        screen: AddHabit,
        navigationOptions: defaultNavigationOptions
    },
    AddSpecial: {
        screen: AddSpecial,
        navigationOptions: defaultNavigationOptions
    },
    AddHabitDetail: {
        screen: AddHabitDetail,
        navigationOptions: defaultNavigationOptions
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: defaultNavigationOptions
    },
    SignSpecial: {
        screen: SignSpecial,
        navigationOptions: defaultNavigationOptions
    },
    ContactList: {
        screen: ContactList,
        navigationOptions: defaultNavigationOptions
    },
    ContactDetail: {
        screen: ContactDetail,
        navigationOptions: defaultNavigationOptions
    },
    GuardianMessageList: {
        screen: GuardianMessageList,
        navigationOptions: defaultNavigationOptions
    },
    MessageDetail: {
        screen: MessageDetail,
        navigationOptions: defaultNavigationOptions
    },
    GuardianList: {
        screen: GuardianList,
        navigationOptions: defaultNavigationOptions
    },
    NormalSign: {
        screen: NormalSign,
        navigationOptions: defaultNavigationOptions
    },
    LocationMap: {
        screen: LocationMap,
        navigationOptions: defaultNavigationOptions
    },
    GuardMyList: {
        screen: GuardMyList,
        navigationOptions: defaultNavigationOptions
    }
})

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
}

const TaskStack = createStackNavigator({
    Task: {
        screen: Task,
        navigationOptions: defaultNavigationOptions
    },
    TaskList: {
        screen: TaskList,
        navigationOptions: defaultNavigationOptions
    },
    AddSpecial: {
        screen: AddSpecial,
        navigationOptions: defaultNavigationOptions
    },
    AddHabitDetail: {
        screen: AddHabitDetail,
        navigationOptions: defaultNavigationOptions
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: defaultNavigationOptions
    },
    LocationMap: {
        screen: LocationMap,
        navigationOptions: defaultNavigationOptions
    }
})

TaskStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
}

const MessageStack = createStackNavigator({
    Message: {
        screen: Message,
        navigationOptions: defaultNavigationOptions
    },
    AddContract: {
        screen: AddContract,
        navigationOptions: defaultNavigationOptions
    },
    ContactDetail: {
        screen: ContactDetail,
        navigationOptions: defaultNavigationOptions
    }
})

MessageStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
}

const SettingStack = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: defaultNavigationOptions
    },
    LoginView: {
        screen: LoginView,
        navigationOptions: defaultNavigationOptions
    },
    ShortLoginView: {
        screen: ShortLoginView,
        navigationOptions: defaultNavigationOptions
    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: defaultNavigationOptions
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: defaultNavigationOptions
    },
    EditPassword: {
        screen: EditPassword,
        navigationOptions: defaultNavigationOptions
    },
    SettingDetail: {
        screen: SettingDetail,
        navigationOptions: defaultNavigationOptions
    },
    QuestionReport: {
        screen: QuestionReport,
        navigationOptions: defaultNavigationOptions
    },
    AddEmergency: {
        screen: AddEmergency,
        navigationOptions: defaultNavigationOptions
    },
    EmergencyList: {
        screen: EmergencyList,
        navigationOptions: defaultNavigationOptions
    },
    PersonDetail: {
        screen: PersonDetail,
        navigationOptions: defaultNavigationOptions
    },
    AccountView: {
        screen: AccountView,
        navigationOptions: defaultNavigationOptions
    },
    NormalUser: {
        screen: NormalUser,
        navigationOptions: defaultNavigationOptions
    },
    VipUser: {
        screen: VipUser,
        navigationOptions: defaultNavigationOptions
    },
    BuyVipView: {
        screen: BuyVipView,
        navigationOptions: defaultNavigationOptions
    }
})

SettingStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
}

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
    Task: {
        screen: TaskStack,
        navigationOptions: {
            header: null,
            tabBarLabel: "任务",
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_TASK_SELECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_TASK}
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
                            source={ASSET_IMAGES.ICON_LINLI_SLECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_LINLI}
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
                            source={ASSET_IMAGES.ICON_MY_SELECT}
                        />
                    );
                } else {
                    return (
                        <Image
                            style={styles.styles}
                            source={ASSET_IMAGES.ICON_MY}
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