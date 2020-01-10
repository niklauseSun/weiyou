import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Home, Message, Setting } from '../layouts'

const TabNavigator = createBottomTabNavigator({
    Home: Home,
    Message: Message,
    Settings: Setting
});

export default createAppContainer(TabNavigator);