import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Header, PriceView, RuleItem, PayViews } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES, E } from '../config';
import { px } from '../utils';
import * as WeChat from 'react-native-wechat';
import { previewVipOrder, createVipOrder, payVipOrder } from '../requests';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            isAgree: false
        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="购买会员" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <PriceView />
                    <View style={styles.rulesView}>
                        <RuleItem title="增加联系人数量" subTitle="开通vip会员可支持300位联系人数量" imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                        <RuleItem title="异常状态短信" subTitle="储值扣费  签到累计送次数" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                        <RuleItem title="积分抵扣现金服务" subTitle="签到累计的积分可进行抵扣现金" imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                    </View>
                    <PayViews selectIndex={this.state.selectIndex} />
                    <View style={styles.agreeView}>
                        <TouchableOpacity onPress={this.selectAgree.bind(this)}>
                            {this.state.isAgree ?<Image style={styles.agreeIcon} source={ASSET_IMAGES.ICON_AGREE_SELECT} />: <Image style={styles.agreeIcon} source={ASSET_IMAGES.ICON_AGREE_UN_SELECT} />}
                        </TouchableOpacity>
                        <Text>我已阅读并同意</Text>
                        <TouchableOpacity>
                            <Text style={styles.ruleText}>《唯友VIP规则》</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.payButton} onPress={this.wxPay.bind(this)}>
                        <Text style={styles.payText}>立即支付</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelPayButton} onPress={this.nextTime.bind(this)}>
                        <Text style={styles.cancelText}>下次再说</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

    wxPay() {
        createVipOrder({
            callback: this.getPayIdCallback.bind(this),
            use_score: 0,
            time: 'quarter',
            meta: ''
        })
    }

    getPayIdCallback(res) {
        console.log('payId', res);
        const { success, data } = res;
        if (success) {
            const { id } = data;
            payVipOrder({
                order_id: id,
                paymode: 'wechatAPP',
                callback: this.getPayParamCallback.bind(this)
            })
        }
    }

    getPayParamCallback(res) {
        const { success, data } = res;
        console.log('pay param', data);
        if (success) {
            const params = {
                partnerId: E.BUSINESS_ID,  // 商家向财付通申请的商家id
                prepayId:data.prepayid,   // 预支付订单
                nonceStr:data.noncestr,   // 随机串，防重发
                timeStamp:data.timestamp,  // 时间戳，防重发
                package:'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                sign: data.paySign   // 商家根据微信开放平台文档对数据做的签名
            }
            WeChat.pay(params).then(res => {
                console.log('res', res);
            }).catch(err => {
                console.log('error', err)
            });
        }
    }

    nextTime() {

    }

    selectAgree() {
        this.setState({
            isAgree: !this.state.isAgree
        })
    }
}

// #ED7539

const styles = StyleSheet.create({
    rulesView: {
        backgroundColor: '#fff',
        marginTop: px(20),
        marginBottom: px(20)
    },
    agreeIcon: {
        width: px(30),
        height: px(30),
        marginRight: px(10)
    },
    agreeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: px(50),
        marginBottom: px(40),
        paddingHorizontal: px(30)
    },
    ruleText: {
        color: '#ed7539'
    },
    payButton: {
        height: px(90),
        backgroundColor: '#ed7539',
        marginHorizontal: px(30),
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px(30),
        marginBottom: px(30)
    },
    payText: {
        fontSize: px(28),
        color: '#fff'
    },
    cancelPayButton: {
        height: px(90),
        backgroundColor: '#999',
        marginHorizontal: px(30),
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: px(60)
    }
})