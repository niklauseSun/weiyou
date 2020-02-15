import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';

export default class AgreeProtocolItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { isSelect } = this.props;
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this.selectChange.bind(this)} style={styles.agreeButton}>
                    <Image style={styles.agreeImage} source={ isSelect? ASSET_IMAGES.ICON_AGREE_SELECT: ASSET_IMAGES.ICON_AGREE_UN_SELECT} />
                </TouchableOpacity>
                <Text style={styles.agreeText}>我已阅读并同意</Text>
                <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.detailText}>《唯友登录协议》</Text>
                </TouchableOpacity>
            </View>
        )
    }

    selectChange() {
        const { statusChange } = this.props;
        statusChange(!this.props.isSelect);
    }
}

const styles = StyleSheet.create({
    content: {
        marginTop: px(30),
        height: px(60),
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeButton: {
        width: px(28),
        height: px(28),
        backgroundColor: 'red',
        marginLeft: px(48)
    },
    agreeImage: {
        width: px(28),
        height: px(28)
    },
    agreeText: {
        marginLeft: px(10)
    },
    detailText: {
        color: '#ED7539'
    }
})