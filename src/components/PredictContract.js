import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { recommendContractList } from '../requests';
import { NoneData } from '.';

export default class PredictContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList: []
        }
    }

    componentDidMount() {
        this.loadPredictList();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.recommendList}
                    renderItem={({item}) => <Text>test</Text>}
                    ListEmptyComponent={() => <NoneData title="暂无推荐联系人" />}
                />
            </View>
        )
    }

    loadPredictList() {
        // recommendContractList
        const data = {
            pageNum: 0,
            pageSize: 10,
            callback: this.loadPredictListCallback.bind(this)
        }
        recommendContractList(data);
    }

    loadPredictListCallback(res) {
        console.log('ree', res);
        const { success, data } = res;
        if (success) {
            this.setState({
                recommendList: data
            })
        }
    }
}

// #ED7539

const styles = StyleSheet.create({

})