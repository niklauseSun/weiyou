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

export default class SpecialLocationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { type = 'text', imageUrl = null, title = 'test', placeholder = 'testHolder', showMoreButton = true } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <TouchableOpacity onPress={this.selectLocation.bind(this)} style={styles.middleView}>
                    <Text numberOfLines={1} style={styles.title}>{this.props.title == null ? '选择地点': this.props.title}</Text>
                    <Image style={styles.moreButton} source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
            </View>
        )
    }

    selectLocation() {
        this.props.navigation.navigate('LocationMap', {
            addType: this.props.addType,
            city: this.props.city,
            longitude: this.props.longitude,
            latitude: this.props.latitude,
            position: this.props.position
        });
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(156),
        backgroundColor: '#fff',
        marginHorizontal: px(30),
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    inputItem: {
        flex: 1,
        height: '100%',
        textAlign: 'right'
    },
    moreButton: {
        marginLeft: px(10)
    },
    title: {

    }
})