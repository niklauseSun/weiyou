import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { px, uploadOssFile } from '../utils';
import { ASSET_IMAGES } from '../config';
import ImagePicker from 'react-native-image-crop-picker';
import { Toast } from '@ant-design/react-native';

export default class NormalNameItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { icon = null, name = "" } = this.props;
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this.uploadImage.bind(this)}>
                    {icon == null ? <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_UN_LOGIN} />: <Image style={styles.headImage} source={{ uri: icon }} />}
                </TouchableOpacity>
                {/* <Image style={styles.headImage} source={ASSET_IMAGES.IMAGE_DEFAULT_UN_LOGIN} /> */}
                <TextInput style={styles.inputItem} placeholder="请输入任务名称" onChangeText={this.changeText.bind(this)} value={name} />
            </View>
        );
    }

    changeText(text) {
        const { changeText } = this.props;
        if (changeText) {
            changeText(text);
        }
    }

    uploadImage() {
        // uploadOssFile()
        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo'
        }).then(img => {
            let imageName = this.acquireImageName(img.path);
            uploadOssFile(imageName, img.path).then((e) => {
                let url = 'https://' + global.imageHost + '/' + imageName;
                Toast.info('上传图片成功');
                const { changeIcon } = this.props;
                changeIcon(url);
            });
        })
    }
    acquireImageName(path) {
        const filetype = path.substring(path.lastIndexOf('.')).toLowerCase();
        const currm = new Date().getTime() + '';
        const objectKey = `${global.dir}/${currm}${filetype}`;
        return objectKey
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        height: px(140),
        borderBottomColor: '#eaeaea',
        borderBottomWidth: px(1),
        alignItems: 'center',
        marginHorizontal: px(30)
    },
    headImage: {
        width: px(90),
        height: px(90),
        backgroundColor: '#999',
        marginRight: px(20),
        borderRadius: px(45)
    },
    inputItem: {
        fontSize: px(36),
        flex: 1,
        textAlign: 'right'
    }
})