import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { px, uploadOssFile, initAliyunOSS } from '../utils';
import { ASSET_IMAGES } from '../config';
import AddImageView from './AddImageView';
import ImagePicker from 'react-native-image-crop-picker';

export default class AddImageList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { pics = [], style } = this.props;
        console.log('list', pics)
        return (
            <View style={[styles.content, style]}>
                <ScrollView horizontal={true}>
                    {pics.map((item, index) => {
                        return <AddImageView key={index} removeAction={this._remove.bind(this,index)} imageUrl={item} />
                    })}
                    <TouchableOpacity onPress={this.onImagePick.bind(this)} style={styles.addButton}>
                        <Image source={ASSET_IMAGES.ICON_EMERGENCY_IMAGE_ADD} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    _remove(index) {
        console.log('remove')
        let localImages = this.props.pics.filter((value, idx) => idx != index);
        let remoteImages = this.props.uploadImages.filter((value, idx) => idx != index);
        const { changeImageList } = this.props;
        console.log('imgs', localImages)
        if (changeImageList) {
            changeImageList('remove',localImages, remoteImages);
        }
    }

    onImagePick() {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 4 - (this.props.uploadImages.length || 0),
            mediaType: 'photo'
        }).then(images => {
            // console.log('images', images);
            const { changeImageList } = this.props;
            let imgs = [];
            let showImages = []
            for(let index in images) {
                console.log(index);
                // imgs.push(images[index].path);
                if (global.dir == undefined) {
                    initAliyunOSS();
                } else {
                    let imageName = this.acquireImageName(images[index].path);
                    uploadOssFile(imageName, images[index].path);
                    let url = 'https://' + global.imageHost + '/' + imageName;
                    imgs.push(url)
                    showImages.push(images[index].path);
                }
                // uploadOssFile(images[index].path);
            }
            if (changeImageList) {
                console.log('fff')
                changeImageList('add', showImages, imgs);
            }
        })
    }

    acquireImageName(path) {
        const filetype = path.substring(path.lastIndexOf('.')).toLowerCase();
        const currm = new Date().getTime() + '';
        const objectKey = `${global.dir}/${currm}${filetype}`;
        return objectKey
    }
    async uploadImage(path) {
        let url = await uploadOssFile(path);
        return url;
    }
}

// #ED7539

const styles = StyleSheet.create({
    content: {
        height: px(180),
        marginHorizontal: px(30),
        backgroundColor: '#fff',
        marginTop: px(30),
        borderRadius: px(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    addButton: {
        marginLeft: px(30)
    }
})