import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MyDetailItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            isLogin = false,
            isVip = false,
            nickname = "唯友昵称",
            avatar
        } = this.props
        return (
            <ImageBackground source={ASSET_IMAGES.IMAGE_MY_DETAIL_BG} style={styles.content}>
                <View style={styles.myDetailView}>
                    {this.renderHeadImage()}
                    <View style={styles.loginView}>
                        <TouchableOpacity onPress={this.loginAction.bind(this)} activeOpacity={0.7} style={styles.loginButton}>
                            <Text style={styles.loginText}>{ isLogin? nickname: "登录/注册" }</Text>
                        </TouchableOpacity>
                        <Text style={styles.loginSubText}>唯友在手  都是好友</Text>
                    </View>
                        {/* isLogin ? <TouchableOpacity activeOpacity={0.7} style={styles.updateVip} onPress={this.updateVip.bind(this)}>
                            <ImageBackground style={styles.vipImageBg} source={ASSET_IMAGES.IMAGE_VIP_BG}>
                                <Text style={styles.vipText}>
                                    {isVip ? "延长时限" : "升级vip"}
                                </Text>
                            </ImageBackground> */}
                        {/* </TouchableOpacity> :  */}
                        <TouchableOpacity onPress={this.goToSet.bind(this)} activeOpacity={0.7} style={styles.setButton}>
                            <Image source={ASSET_IMAGES.ICON_SET} />
                            <Text style={styles.setButtonText}>设置</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.vipView}>
                    {
                        isLogin ? <View style={styles.vipLoginView}>
                            <TouchableOpacity onPress={this.goNormalView.bind(this)} style={styles.vipNumView}>
                                <Text style={styles.rateNumText}>{ isVip ? "3项": "无" }</Text>
                                <Text style={styles.rateNumSubText}>特权</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.goVipView.bind(this)} style={styles.rateView}>
                                <Text style={styles.rateText}>{isVip ? "VIP会员": "普通用户"}</Text>
                                <Text style={styles.rateSubText}>等级</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={styles.updateVip} onPress={this.updateVip.bind(this)}>
                                <ImageBackground style={styles.vipImageBg} source={ASSET_IMAGES.IMAGE_VIP_BG}>
                                    <Text style={styles.vipText}>
                                        {isVip ? "延长时限" : "vip"}
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
            </ImageBackground>
        )
    }

    renderHeadImage() {
        const { isLogin, avatar } = this.props;
        if (!isLogin) {
            return <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_UN_LOGIN} />
        }

        if (avatar == '') {
            return <TouchableOpacity onPress={this.loginAction.bind(this)}>
                <Image style={styles.headImage} source={ASSET_IMAGES.ICON_DEFAULT_HEAD_IMAGE} />
            </TouchableOpacity>
        }

        return <TouchableOpacity onPress={this.loginAction.bind(this)}>
            <Image style={styles.headImage} source={{ uri: avatar }} />
        </TouchableOpacity>
    }

    goToSet() {
        this.props.navigation.navigate('SettingDetail');
    }

    goVipView() {
        this.props.navigation.navigate('VipUser');
    }

    goNormalView() {
        this.props.navigation.navigate('NormalUser');
    }

    updateVip() {
        const {
            isVip = true
        } = this.props;
        if (isVip) {
            console.log('延长时限');
        } else {
            console.log('升级为vip');
            this.props.navigation.navigate('BuyVipView')
        }
    }

    loginAction() {
        if (this.props.isLogin) {
            // todo
            // 如果登录的话 就跳入个人详情页面
            const { id } = this.props;
            this.props.navigation.navigate('PersonDetail', {
                id: id
            })
            return;
        }
        const { loginAction } = this.props;
        if (loginAction) {
            loginAction()
        }
    }

    navigateSettingDetail() {
        this.props.navigation.navigate('SettingDetail')
    }
}


const styles = StyleSheet.create({
    content: {
        marginRight: px(30),
        marginLeft: px(30),
        height: px(312),
        borderRadius: px(36),
        overflow: 'hidden',
        resizeMode: 'cover',
        marginTop: px(90)
    },
    myDetailView: {
        height: px(124),
        width: '100%',
        marginTop: px(64),
        flexDirection: 'row',
        paddingLeft: px(40),
        paddingRight: px(40),
        alignItems: 'center'
    },
    headImage: {
        width: px(120),
        height: px(120),
        borderRadius: px(60)
    },
    vipView: {
        height: px(76)
    },
    detailText: {
        color: '#fff'
    },
    loginView: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: px(32)
    },
    loginButton: {

    },
    loginText: {
        color: '#fff',
        fontSize: px(32)
    },
    loginSubText: {
        color: '#fff',
        marginTop: px(10)
    },
    setButton: {
        width: px(60),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    setButtonText: {
        marginTop: px(10),
        color: '#999'
    },
    updateVip: {
        height: px(50),
        width: px(120),
        marginLeft: px(140)
    },
    vipImageBg: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vipText: {
        color: '#FAE96F',
        fontSize: px(28)
    },
    vipLoginView: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px(10)
    },
    rateNumText: {
        fontSize: px(30),
        color: '#FCF0A3'
    },
    rateNumSubText: {
        marginTop: px(12),
        color: '#999',
        fontSize: px(24)
    },
    rateView: {
        marginLeft: px(90)
    },
    rateText: {
        fontSize: px(30),
        color: '#FCF0A3'
    },
    rateSubText: {
        marginTop: px(12),
        color: '#999',
        fontSize: px(24)
    }
})