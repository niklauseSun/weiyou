import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import { px } from '../utils';
import AddImageView from './AddImageView';
import { ASSET_IMAGES } from '../config';

export default class QuestionDescribe extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { question = '' } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.headerView}>
                    <Text style={styles.headTitle}>意见/问题描述</Text>
                    <Text style={styles.headNum}>{question.length}/200</Text>
                </View>
                <TextInput multiline={true} placeholder="请填写10字以上的问题描述，以便我们更好的为您解决问题" style={styles.input} />
                <View>
                    <Text style={styles.uploadText}>上传问题截图，最多4张（选填）</Text>
                    <View style={styles.imageViews}>
                        {this.props.imageList.map((item, index) => {
                            return <AddImageView imageUrl={item} removeAction={this._removeImage.bind(this, index)} />
                        })}
                        <TouchableOpacity onPress={this.addImageAction.bind(this)} style={styles.addButton}>
                            <Image style={styles.addImage} source={ASSET_IMAGES.ICON_IMAGE_ADD} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    addImageAction() {
        const { addImage } = this.props;
        if (addImage) {
            addImage();
        }
    }

    _removeImage(index) {
        const { removeImage } = this.props;
        if (removeImage) {
            removeImage(index);
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: px(30),
        paddingVertical: px(20),
        backgroundColor: '#fff',
        marginTop: px(20)
    },
    headerView: {
        height: px(100),
        flexDirection: 'row',
        alignItems: 'center'
    },
    headTitle: {
        flex: 1,
        fontSize: px(30),
        fontWeight: 'bold'
    },
    headNum: {
        fontSize: px(26),
        fontWeight: 'bold'
    },
    input: {
        height: px(150)
    },
    addButton: {
        height: px(160),
        width: px(160),
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(10)
    },
    addImage: {
        height: px(120),
        width: px(120)
    },
    uploadText: {
        marginVertical: px(10),
        fontSize: px(26),
        color: '#999'
    },
    imageViews: {
        height: px(210),
        flexDirection: 'row',
        alignItems: 'center'
    }
})