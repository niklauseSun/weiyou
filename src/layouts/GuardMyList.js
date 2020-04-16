import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { Header, GuardianItem, ContactListItem, NormalAddItem, LineItem, NoneData } from '../components';
import { commonStyles } from '../commonStyles';
import { getContractList } from '../requests';

export default class GuardMyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractList: []
        }
    }

    componentDidMount() {
        this.loadContractList();
    }


    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="监护我的人" navigation={this.props.navigation} />
                {/* <GuardianItem navigation={this.props.navigation} /> */}
                <FlatList
                    style={styles.contractList}
                    data={this.state.contractList.filter((item) => item.username != null)}
                    renderItem={({ item }) => {
                        return <ContactListItem navigation={this.props.navigation} data={item} />
                    }}
                    ItemSeparatorComponent={() => <LineItem />}
                    ListEmptyComponent={() => <NoneData title="暂无监护我的人" />}
                />
            </SafeAreaView>
        )
    }

     // request
     loadContractList() {
        // getContractList
        if (!global.isLogin) {
            return;
        }
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadContractListCallback.bind(this)
        }
        getContractList(data);
    }

    loadContractListCallback(res) {
        if (res.success) {
            this.setState({
                contractList: res.data
            })
        } else if (res.error == '未登录') {
            this.setState({
                contractList: [],
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({

})