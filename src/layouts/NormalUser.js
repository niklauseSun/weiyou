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
                    <RuleItem title="增加联系人数量" subTitle="开通vip会员可支持300位联系人数量" imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                    <RuleItem title="异常状态短信" subTitle="储值扣费  签到累计送次数" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                </View>
            </SafeAreaView>
        )
    }
}

// #ED7539

const styles = StyleSheet.create({

})