import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Image, FlatList } from 'react-native'
import { getPersonScoreList } from '../requests';
import { Header, ScoreListItem } from '../components';
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';
import { commonStyles } from '../commonStyles';

export default class AccountView extends Component {
    constructor(props) {
        super(props);
        const { id, score } = props.navigation.state.params || {}
        this.state = {
            id: id,
            score: score,
            scoreList: []
        }
    }

    componentDidMount() {
        console.log('id', this.state.id);
        this.loadScoreList();
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header title="积分" navigation={this.props.navigation} />
                <View style={commonStyles.body}>
                    <ImageBackground source={ASSET_IMAGES.ICON_SCORE_BG_VIEW} style={styles.scoreBgView}>
                        <Text style={styles.title}>有效总积分</Text>
                        <Text style={styles.scoreText}>{this.state.score}</Text>
                        <View style={styles.lineView}>
                            <Image style={styles.leftLine} source={ASSET_IMAGES.ICON_LEFT_LINE} />
                            <Text style={styles.moreText}>更多权益敬请期待</Text>
                            <Image style={styles.rightLine} source={ASSET_IMAGES.ICON_RIGHT_LINE} />
                        </View>
                    </ImageBackground>
                    <View style={styles.header}>
                        {/* <View style={styles.dotView}></View> */}
                        <Image style={styles.dotIcon} source={ASSET_IMAGES.ICON_SCORE_DOT} />
                        <Text>积分明细</Text>
                    </View>
                    <FlatList
                        data={this.state.scoreList}
                        renderItem={({item}) => <ScoreListItem data={item} />}
                    />
                </View>
            </SafeAreaView>
        )
    }

    loadScoreList() {
        // getPersonScoreList
        getPersonScoreList({
            pageNum: 0,
            pageSize: 20,
            callback: this.loadScoreCallback.bind(this),
            isAsc: false
        })
    }

    loadScoreCallback(res) {
        console.log('score', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                scoreList: data,
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({
    scoreBgView: {
        marginHorizontal: px(30),
        height: px(354),
        borderTopLeftRadius: px(30),
        borderTopRightRadius: px(30),
        overflow: "hidden",
        alignItems: 'center',
        marginTop: px(30)
    },
    title: {
        color: '#FFDD91',
        marginTop: px(60)
    },
    scoreText: {
        color: '#FFDD91',
        fontSize: px(50),
        marginTop: px(30),
        marginBottom: px(40)
    },
    moreText: {
        color: '#FFDD91',
        marginHorizontal: px(30)
    },
    lineView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: px(30),
        alignItems: 'center',
        height: px(120)
    },
    dotView: {
        width: px(20),
        height: px(20),
        backgroundColor: '#333',
        borderRadius: px(10),
        marginRight: px(20)
    },
    dotIcon: {
        width: px(40),
        height: px(40),
        marginLeft: px(-10),
        marginRight: px(20)
    }
})