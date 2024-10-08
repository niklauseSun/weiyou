import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { px } from '../utils';

export default class PriceView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { selectIndex = 0, rateNum = 0, score = 44, price } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.priceItem}>
                    <Text style={styles.priceTitle}>价格</Text>
                    <Text style={styles.priceValue}>￥{price}</Text>
                </View>
                <View style={styles.priceItem}>
                    <Text style={styles.vipLabel}>会员时限</Text>
                    <TouchableOpacity onPress={this.changePriceAction.bind(this, 0)} style={selectIndex === 0 ?styles.timeSelectButton: styles.timeButton}>
                        <Text style={selectIndex === 0 ?styles.timeSelectButtonText: styles.timeButtonText}>一季度</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changePriceAction.bind(this, 1)} style={selectIndex === 1 ?styles.timeSelectButton: styles.timeButton}>
                        <Text style={selectIndex === 1 ?styles.timeSelectButtonText: styles.timeButtonText}>半年</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changePriceAction.bind(this, 2)} style={selectIndex === 2 ?styles.timeSelectButton: styles.timeButton}>
                        <Text style={selectIndex === 2 ?styles.timeSelectButtonText: styles.timeButtonText}>一年</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.priceItem}>
                    <Text style={styles.priceLabel}>当前积分</Text>
                    <Text style={styles.priceNum}>{score}</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.textInput}
                        onBlur={() => {
                            const { calculatePrice } = this.props;
                            calculatePrice();
                        }}
                        onChangeText={(text) => {
                            const { changeRateNum } = this.props;
                            changeRateNum(text);
                        }}
                        value={rateNum + ''}
                    />
                </View>
            </View>
        )
    }

    changePriceAction(index) {
        const { changeSelect } = this.props;
        changeSelect(index);
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        marginTop: px(20),
        backgroundColor: '#fff',
        paddingHorizontal: px(30)
    },
    priceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px(120)
    },
    priceTitle: {
        flex: 1
    },
    priceValue: {
        color: '#ed7539'
    },
    vipLabel: {
        flex: 1
    },
    timeButton: {
        width: px(140),
        height: px(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: px(1),
        borderRadius: px(30),
        marginLeft: px(20)
    },
    timeSelectButton: {
        width: px(140),
        height: px(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(30),
        marginLeft: px(20),
        backgroundColor: '#ed7539'
    },
    timeButtonText: {
        color: '#333'
    },
    timeSelectButtonText: {
        color: '#fff'
    },
    textInput: {
        backgroundColor: '#eaeaea',
        width: px(240),
        paddingVertical: px(10),
        borderRadius: px(8),
        textAlign: 'right',
        paddingHorizontal: px(10)
    },
    priceNum: {
        flex: 1,
        marginLeft: px(20)
    }
})