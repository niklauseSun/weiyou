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
                <View style={styles.middleView}>
                    {type == 'input' ? <TextInput placeholderTextColor="#C9C7C7" value={title} style={styles.inputItem} placeholder={placeholder} /> : <Text>{title}</Text>}
                </View>
                {showMoreButton? <TouchableOpacity style={styles.moreButton}>
                    <Image source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>: null }
            </View>
        )
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
        flex: 1
    },
    inputItem: {
        flex: 1,
        height: '100%',
        textAlign: 'right'
    },
    moreButton: {
        width: px(90),
        height: px(90),
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})