import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Header, UserHeader, RuleItem } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES } from '../config'
import { px } from '../utils';
import { getVipSet } from '../requests';
import { WebView } from 'react-native-webview'

export default class Test extends Component {
    constructor(props) {
        super(props);
        const { message_cnt, isVip, score } = props.navigation.state.params || {};
        this.state = {
            message_cnt: message_cnt,
            isVip: isVip,
            rules: null,
            score: score
        }
    }

    componentDidMount() {
        getVipSet({
            callback: this.getVipSetDetail.bind(this)
        })
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="会员" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <UserHeader title="唯有会员规则" />
                    <RuleItem title="增加会员监护人数量" subTitle="开通vip会员可支持10位监护人数量" imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                    <RuleItem title="异常状态短信" subTitle="送90~360次数" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                    <RuleItem title="会员积分抵扣现金服务" subTitle="30积分可抵扣1元现金" imageUrl={ASSET_IMAGES.ICON_VPI_RATE} />
                    <UserHeader title="会员规则" />
                    <View style={styles.vipRuleView}>
                        {
                            this.state.rules == null ? null: <WebView
                                useWebKit={true}
                                style={{
                                    height: px(100)
                                }}
                                source={{ html: `<div style="font-size: 50">${this.state.rules[1].body}</div>` }}
                            />
                        }
                    </View>

                    <TouchableOpacity style={styles.openButton} onPress={this.openVip.bind(this)}>
                        <Text style={styles.openButtonText}>{this.state.isVip ? '延长会员': '去开通'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

    openVip() {
        this.props.navigation.navigate('BuyVipView',{
            score: this.state.score
        })
    }

    getVipSetDetail(res) {
        const { success, data } = res;
        if (success) {
            const { rules } = data;
            this.setState({
                rules: rules
            });
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    vipRuleView: {
        marginHorizontal: px(30),
        height: px(200),
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