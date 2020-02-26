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

export default class SpecialQuestionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageUrl = null, title = null, question } = this.props;
        return (
            <View style={styles.content}>
                <Image style={styles.headImage} source={imageUrl} />
                <TouchableOpacity onPress={() => {
                    const { onChangeQuestion } = this.props;
                    if (onChangeQuestion) {
                        onChangeQuestion();
                    }
                }} style={styles.moreButton}>
                    <Text style={styles.title}>{question == null? '请选择': question}</Text>
                    <Image source={ASSET_IMAGES.ICON_MORE} />
                </TouchableOpacity>
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