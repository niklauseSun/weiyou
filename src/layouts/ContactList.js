import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { Header, ContractItem } from '../components';
import { commonStyles } from '../commonStyles';
import { getContractList } from '../requests';

export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactList: []
        }
    }

    componentDidMount() {
        this.loadContractList();
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="我监护的人" navigation={this.props.navigation} />
                <FlatList
                    data={this.state.contactList}
                    renderItem={({ item }) => <ContractItem navigation={this.props.navigation} data={item} />}
                />
            </SafeAreaView>
        )
    }

    loadContractList() {
        // getContractList
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadContractListCallback.bind(this)
        }
        getContractList(data)
    }

    loadContractListCallback(res) {
        if (res.success) {
            this.setState({
                contactList: res.data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({

})