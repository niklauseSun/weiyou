import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground, Modal, AsyncStorage } from 'react-native'
import { getTodayArticle } from '../requests';
import { formatDate, px } from '../utils';
import FastImage from 'react-native-fast-image'


export default class BeginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: null,
            content: null,
            content_en: null
        }
    }

    componentDidMount() {
        this.loadArticle();
        AsyncStorage.getItem('launchImage').then(res => {
            console.log('storage',res);
            if (res) {
                if (!this.state.pic) {
                    this.setState({
                        pic: res
                    })
                }
            }
        })
    }

    render() {
        console.log('begin Modal', this.props);
        console.log('image', this.state.pic);
        const { isShow = true, sign_total = null } = this.props;
        let date = new Date()
        return (
            <Modal visible={isShow}>
                {
                    this.state.pic == null ?null: <FastImage
                        imageStyle={styles.imageStyle}
                        source={{ uri: this.state.pic }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.imageBg}>
                        <Text style={styles.day}>{date.getDate()}</Text>
                        <Text style={styles.month}>{date.getMonth() + 1}月 {date.getFullYear()}</Text>
                        <Text style={styles.content}>{sign_total == null || sign_total == 0 ? this.state.content : `您已${sign_total}天被唯友关爱`}</Text>
                        <Text style={styles.content_en} style={styles.content_en}>{this.state.content_en}</Text>
                </FastImage>
                }
            </Modal>
        )
    }

    loadArticle() {
        const data = {
            callback: this.loadArticleCallback.bind(this)
        }
        getTodayArticle(data);
    }

    loadArticleCallback(res) {
        console.log('res loadArticle', res);
        const { success, data } = res;
        if (success) {
            console.log('load', res);
            const { picture, content_cn, content_en } = data[0];
            this.setState({
                pic: picture,
                content: content_cn,
                content_en: content_en
            })
            AsyncStorage.setItem("launchImage", picture)
        }

    }
}

// #ED7539

const styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        // paddingHorizontal: px(60)
    },
    imageStyle: {
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_en: {
        marginBottom: px(120),
        fontSize: px(34),
        color: '#fff',
        marginLeft: px(40)
    },
    content: {
        marginBottom: px(40),
        fontSize: px(34),
        color: '#fff',
        marginLeft: px(40)
    },
    month: {
        marginBottom: px(30),
        fontSize: px(40),
        marginLeft: px(40),
        color: '#fff'
    },
    day: {
        marginBottom: px(30),
        fontSize: px(80),
        marginLeft: px(40),
        color: '#fff'
    }
})