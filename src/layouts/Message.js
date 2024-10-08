import React, { Component, Fragment } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, DeviceEventEmitter } from 'react-native'
import { HeaderItem, SearchItem, ContractItem, LineItem, TabHeader, PredictContract, NewApplyItem, GuardianItem, ContactListItem, NormalAddItem, NoneData } from '../components'
import { commonStyles } from '../commonStyles'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';
import { getContractList } from '../requests';

class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractList: [],
            tabItems:[
                {
                    name: '监护我的人',
                },
                {
                    name: '推荐监护人',
                },
                {
                    name: '新的申请',
                }
            ],
            selectIndex: 0
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('contactReload', message => {
            //收到监听后想做的事情
            this.loadContractList();
          });
        this.loadContractList();
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <HeaderItem leftAction={this.navigateAddContract.bind(this)} title="联系人" />
                {/* <SearchItem /> */}
                <TabHeader data={this.state.tabItems} selectIndex={this.state.selectIndex} onChangeTabIndex={this.onChangeTabIndex.bind(this)} />
                {
                    this.renderDetail()
                }
            </SafeAreaView>
        );
    }

    renderDetail() {
        const { selectIndex } = this.state;
        switch(selectIndex) {
            case 0:
                return this.renderContractList();
            case 1:
                return this.renderPredictContract()
            case 2:
                return this.renderNewApply()
            // case 3:
            //     return this.renderGuardian()
        }
    }

    renderContractList() {
        return  <Fragment>
                    <FlatList
                        style={styles.contractList}
                        data={this.state.contractList.filter((item) => item.username != null)}
                        renderItem={({ item }) => {
                            return <ContactListItem navigation={this.props.navigation} data={item} />
                        }}
                        ItemSeparatorComponent={() => <LineItem />}
                        ListEmptyComponent={() => <NoneData title="暂无监护我的人" />}
                    />
                </Fragment>
    }

    renderPredictContract() {
        return <PredictContract navigation={this.props.navigation} />;
        // <PredictContract />
    }

    renderNewApply() {
        return <NewApplyItem navigation={this.props.navigation} />
    }

    renderGuardian() {
        return <GuardianItem navigation={this.props.navigation} />
    }

    navigateAddContract() {
        if (!global.isLogin) {
            this.props.navigation.navigate('LoginView');
            return;
        }
        this.props.navigation.navigate('AddContract')
    }

    onChangeTabIndex(index) {
        if (index == 0) {
            this.loadContractList();
        }
        this.setState({
            selectIndex: index
        })
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

export default MessageScreen;

const styles = StyleSheet.create({
    contractList: {
        marginTop: px(30)
    },
    noneContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})