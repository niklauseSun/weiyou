import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Header, UserHeader, RuleItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config';

export default class NormalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="用户" navigation={this.props.navigation} />
                <View style={commonStyles.body}>
                    <UserHeader />
                    <RuleItem title="增加监护人数量" subTitle="支持3位监护人数量" imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                    <RuleItem title="积分抵扣现金服务" subTitle="10积分可抵扣1元现金" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                </View>
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})