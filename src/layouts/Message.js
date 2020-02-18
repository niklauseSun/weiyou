import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image } from 'react-native'
import { HeaderItem, SearchItem, ContractItem, LineItem } from '../components'
import { commonStyles } from '../commonStyles'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractList: []
        }
    }
    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <HeaderItem leftAction={this.navigateAddContract.bind(this)} title="联系人" />
                <SearchItem />
                {this.state.contractList.length == 0 ? 
                <View style={styles.noneContent}>
                   <Image source={ASSET_IMAGES.IMAGE_NONE_CONTRACT} />
                </View>:<FlatList
                        style={styles.contractList}
                        data={this.state.contractList}
                        renderItem={({ item }) => {
                            return <ContractItem data={item} />
                        }}
                        ItemSeparatorComponent={() => <LineItem />}
                    />
                }
            </SafeAreaView>
        );
    }

    navigateAddContract() {
        this.props.navigation.navigate('AddContract')
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