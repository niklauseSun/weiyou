import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageBackground, Modal } from 'react-native'
import { getTodayArticle } from '../requests';
import { formatDate, px } from '../utils';

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
    }

    render() {
        const { isShow = true } = this.props;
        let date = new Date()
        return (
            <Modal visible={isShow}>
                { this.state.pic == null? null:<ImageBackground imageStyle={styles.imageStyle} source={{ uri: this.state.pic }} style={styles.imageBg}>
                    <Text style={styles.day}>{date.getDay()}</Text>
                    <Text style={styles.month}>{date.getMonth() + 1}月 {date.getFullYear()}</Text>
                    <Text style={styles.content}>{this.state.content}</Text>
                    <Text style={styles.content_en} style={styles.content_en}>{this.state.content_en}</Text>
                </ImageBackground> }
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
            const { picture, content_cn, content_en } = data[0];
            this.setState({
                pic: picture,
                content: content_cn,
                content_en: content_en
            })
        }

    }
}

// #ED7539

const styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        // alignItems: 'center',
        // paddingHorizontal: px(60)
    },
    imageStyle: {
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_en: {
        marginBottom: px(120),
        fontSize: px(34),
        color: '#666',
        marginLeft: px(40)
    },
    content: {
        marginBottom: px(40),
        fontSize: px(34),
        color: '#666',
        marginLeft: px(40)
    },
    month: {
        marginBottom: px(30),
        fontSize: px(40),
        marginLeft: px(40)
    },
    day: {
        marginBottom: px(30),
        fontSize: px(80),
        marginLeft: px(40)
    }
})