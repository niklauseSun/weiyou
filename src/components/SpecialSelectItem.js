import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { ASSET_IMAGES } from '../config';
import { px } from '../utils'
import { DatePicker } from '@ant-design/react-native';

export default class SpecialSelectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    render() {
        const { imageUrl = null, title = 'test' } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <TouchableOpacity onPress={this.showTimePick.bind(this)} style={styles.moreButton}>
                    <Text style={styles.title}>{title}</Text>
                    <Image source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
                <DatePicker
                    minDate={new Date()}
                    visible={this.state.isShow}
                    onOk={(e) => {
                        const { onChangeTime = null } = this.props;
                        if (onChangeTime) {
                            onChangeTime(e);
                        }
                        this.showTimePick();
                    }}
                    onDismiss={() => {
                        this.showTimePick();
                    }}
                />
            </View>
        )
    }
    showTimePick() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(20),
        borderRadius: px(10),
        marginTop: px(20),
        alignItems: 'center',
        paddingHorizontal: px(30)
    },
    headImage: {
        width: px(44),
        height: px(44),
        marginRight: px(30)
    },
    middleView: {
        flex: 1
    },
    inputItem: {
        flex: 1,
        height: '100%'
    },
    title: {
        fontSize: px(28),
        marginRight: px(10),
    },
    moreButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})