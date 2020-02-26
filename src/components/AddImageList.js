import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { px } from '../utils';
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
        const { imageList = [], style } = this.props;
        console.log('list', imageList)
        return (
            <View style={[styles.content, style]}>
                <ScrollView horizontal={true}>
                    {imageList.map((item, index) => {
                        return <AddImageView removeAction={this._remove.bind(this,index)} imageUrl={item} />
                    })}
                    <TouchableOpacity onPress={this.onImagePick.bind(this)} style={styles.addButton}>
                        <Image source={ASSET_IMAGES.ICON_EMERGENCY_IMAGE_ADD} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    _remove(index) {
        let imgs = this.props.imageList.filter((value, idx) => idx != index);
        const { changeImageList } = this.props;
        console.log('imgs', imgs)
        if (changeImageList) {
            changeImageList(imgs);
        }
    }

    onImagePick() {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 4
        }).then(images => {
            console.log('images', images);
            const { changeImageList } = this.props;
            let imgs = [];
            for(let index in images) {
                console.log(index);
                imgs.push(images[index].path);
            }
            if (changeImageList) {
                changeImageList(imgs);
            }
        })
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