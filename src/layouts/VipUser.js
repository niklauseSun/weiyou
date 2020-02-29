import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Header, UserHeader, RuleItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config'
import { px } from '../utils';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="会员" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <UserHeader title="唯有会员规则" />
                    <RuleItem title="增加联系人数量" subTitle="开通vip会员可支持300位联系人数量" imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                    <RuleItem title="异常状态短信" subTitle="储值扣费  签到累计送次数" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                    <RuleItem title="积分抵扣现金服务" subTitle="签到累计的积分可进行抵扣现金" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                    <UserHeader title="会员规则" />
                    <View style={styles.vipRuleView}>
                        <Text>会员规则</Text>
                    </View>

                    <TouchableOpacity style={styles.openButton} onPress={this.openVip.bind(this)}>
                        <Text style={styles.openButtonText}>去开通</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

    openVip() {
        this.props.navigation.navigate('BuyVipView')
    }
}

// #ED7539

const styles = StyleSheet.create({
    vipRuleView: {
        marginHorizontal: px(30),
        height: px(100),
        backgroundColor: '#fff',
        borderRadius: px(30),
        paddingHorizontal: px(30),
        paddingVertical: px(20)
    },
    openButton: {
        height: px(120),
        marginHorizontal: px(30),
        backgroundColor: '#ED7539',
        marginTop: px(50),
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    openButtonText: {
        fontSize: px(34),
        color: '#fff'
    }
})