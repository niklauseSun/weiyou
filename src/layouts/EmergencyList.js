import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, DeviceEventEmitter } from 'react-native'
import { commonStyles } from '../commonStyles';
import { Header, NoneData, EmergencyListItem } from '../components';
import { px } from '../utils';
import { getPersonEmergencyList } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class EmergencyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emergencyList: null
        }
    }

    componentDidMount() {
        this.loadEmergencyList();

        this.emitter = DeviceEventEmitter.addListener('loadEmergencyList',(dict) => {
            this.loadEmergencyList();
        })
    }

    componentWillUnmount() {
        this.emitter = null
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="紧急" navigation={this.props.navigation} rightComponent={this.rightComponent()}/>
                <FlatList
                    contentContainerStyle={commonStyles.body}
                    data={this.state.emergencyList}
                    renderItem={({item, index}) => {
                        return <EmergencyListItem navigation={this.props.navigation} data={item} />
                    }}
                    ListEmptyComponent={() => <NoneData />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        )
    }

    rightComponent() {
        return <TouchableOpacity onPress={this.navigateAdd.bind(this)} style={styles.saveButton}>
            <Text style={styles.saveText}>添加</Text>
        </TouchableOpacity>
    }

    navigateAdd() {
        if (!global.isLogin) {
            this.props.navigation.navigate("LoginView");
            return;
        }
        this.props.navigation.navigate('AddEmergency');
    }

    // request

    loadEmergencyList() {
        if (!global.isLogin) {
            return;
        }
        // getPersonEmergencyList
        getPersonEmergencyList({
            pageNum: 0,
            pageSize: 10,
            callback: this.loadCallback.bind(this)
        })
    }

    loadCallback(res) {
        const { success, error, data } = res;
        if (success) {
            this.setState({
                emergencyList: data
            })
        } else {
            Toast.info(error);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    saveButton: {
        width: px(120),
        height: px(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveText: {
        fontSize: px(28),
        color: '#ED7539'
    }
})