import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Header, PriceView, RuleItem, PayViews } from '../components';
import { commonStyles } from '../commonStyles';
import { ASSET_IMAGES, E } from '../config';
import { px } from '../utils';
import * as WeChat from 'react-native-wechat';
import { previewVipOrder, createVipOrder, payVipOrder } from '../requests';
import { Toast } from '@ant-design/react-native';

export default class Test extends Component {
    constructor(props) {
        super(props);
        const { score } = props.navigation.state.params || {};
        this.state = {
            selectIndex: 0,
            isAgree: false,
            price: 0.01,
            rateNum: 0,
            score: score,
            contact_limit: 10,
            rate_score_rmb: 30,
            message_cnt: 90
        }
    }

    componentDidMount() {
        this.calculatePrice();
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="购买会员" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.body}>
                    <PriceView
                        selectIndex={this.state.selectIndex}
                        price={this.state.price}
                        rateNum={this.state.rateNum}
                        score={this.state.score}
                        changeSelect={this.changeSelectIndex.bind(this)}
                        changePrice={this.changePrice.bind(this)}
                        changeRateNum={this.changeRateNum.bind(this)}
                        calculatePrice={this.calculatePrice.bind(this)}
                    />
                    <View style={styles.rulesView}>
                        <RuleItem title="增加监护人数量" subTitle={`支持${this.state.contact_limit}位监护人数量`} imageUrl={ASSET_IMAGES.ICON_VIP_USER} />
                        <RuleItem title="异常状态短信" subTitle={`含${this.state.message_cnt}次`} imageUrl={ASSET_IMAGES.ICON_VIP_PHONE} />
                        <RuleItem title="积分抵扣现金服务" subTitle={`${this.state.rate_score_rmb}积分可抵扣1元现金`} imageUrl={ASSET_IMAGES.ICON_VPI_RATE} />
                    </View>
                    <PayViews selectIndex={0} />
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

    changeSelectIndex(index) {
        this.setState({
            selectIndex: index
        }, () => {
            this.calculatePrice();
        })
    }

    changePrice(price) {
        this.setState({
            price: price
        })
    }

    calculatePrice() {
        // previewVipOrder
        let timeText = 'quarter';
        if (this.state.selectIndex == 1) {
            timeText = 'halfYear';
        } else if (this.state.selectIndex == 2) {
            timeText = 'year';
        }
        previewVipOrder({
            callback: this.previewCallback.bind(this),
            use_score: 0,
            time: timeText
        })
    }
    previewCallback(res) {
        console.log('preview', res);
//         total_amount: "2.0000"
// message_cnt: 180
// contact_limit: 10
// rate_score_rmb: 30
        const { success, data } = res;
        if (success) {
            const { total_amount, message_cnt, contact_limit, rate_score_rmb } = data;
            this.setState({
                price: parseFloat(total_amount).toFixed(2),
                message_cnt: message_cnt,
                contact_limit: contact_limit,
                rate_score_rmb: rate_score_rmb
            })
        }
    }

    changeRateNum(num) {
        this.setState({
            rateNum: num
        })
    }

    wxPay() {
        if (!this.state.isAgree) {
            Toast.info('请确认vip规则');
            return;
        }
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
                Toast.info('付款成功');
                this.props.navigation.popToTop();
                DeviceEventEmitter.emit('reloadLogin');
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