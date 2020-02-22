import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    Keyboard,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {
    Header,
    SpecialSelectItem,
    SpecialRepeatItem,
    NormalContractItem,
    SpecialLocationItem,
    SpecialQuestionItem
} from '../components';
import { ASSET_IMAGES } from '../config';
import { px } from '../utils';
import SpecialContractItem from '../components/SpecialContractItem';

export default class AddSpecial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: new Date(),
            name: null,
            cnt: 5,
            repeat: 3
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={styles.content}>
                <Header title="特殊" navigation={this.props.navigation} />
                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                    Keyboard.dismiss()
                }} style={styles.contentView}> */}
                    <ScrollView style={styles.contentView}>
                        <View style={styles.nameView}>
                            <Image style={styles.nameHeadImage} source={ASSET_IMAGES.ICON_SPECIAL_DEFAULT} />
                            <Text style={styles.nameLabel}>特殊</Text>
                            <TextInput style={styles.nameInput} placeholder="请输入事件名称" placeholderTextColor="#C9C7C7" value={this.state.value} onChangeText={this.changeName.bind(this)} />
                        </View>
                        <SpecialLocationItem showMoreButton={false} placeholder="请填写事件地址" type="input" imageUrl={ASSET_IMAGES.ICON_SPECIAL_LOCATION} />
                        <SpecialSelectItem onChangeTime={this.onChangeTime.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_TIME} title={this.formatDate(this.state.selectDate)} />
                        <SpecialQuestionItem onChangeQuestion={this.onChangeQuestion.bind(this)} imageUrl={ASSET_IMAGES.ICON_SPECIAL_QUESTION} title="我的小学老师是谁？" />
                        <SpecialRepeatItem cnt={this.state.cnt} repeat={this.state.repeat} changeCnt={this.onChangeCnt.bind(this)} changeRepeat={this.onChangeRepeat.bind(this)} />
                        <SpecialContractItem />
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>添加</Text>
                        </TouchableOpacity>
                    </ScrollView>
                {/* </TouchableOpacity> */}
            </SafeAreaView>
        )
    }

    formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        const h = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second= date.getSeconds();
        second = minute < 10 ? ('0' + second) : second;
        return y + '.' + m + '.' + d+' '+h+':'+minute;
    }

    changeName(text) {
        this.setState({
            name: text
        })
    }

    onChangeCnt(cnt) {
        this.setState({
            cnt: cnt
        })
    }

    onChangeRepeat(repeat) {
        this.setState({
            repeat: repeat
        })
    }

    onChangeTime(e) {
        this.setState({
            selectDate: e
        })
    }

    onChangeQuestion() {
        this.props.navigation.navigate('AddQuestion');
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentView: {
        flex: 1,
        backgroundColor: '#eaeaea'
    },
    nameView: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(20),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    nameHeadImage: {
        width: px(90),
        height: px(90)
    },
    nameLabel: {
        marginLeft: px(20),
        color: '#474342',
        fontSize: px(32),
        fontWeight: 'bold'
    },
    nameInput: {
        marginLeft: px(10),
        height: '100%',
        flex: 1,
        textAlign: 'right'
    },
    addButton: {
        height: px(120),
        backgroundColor: '#393235',
        marginHorizontal: px(40),
        marginTop: px(40),
        borderRadius: px(10),
        marginBottom: px(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: px(34)
    }
})