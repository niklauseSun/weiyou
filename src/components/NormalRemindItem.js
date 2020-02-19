import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';

export default class NormalRemindItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View>
            <Image />
            <Text>提醒</Text>
            <TouchableOpacity>
                <Text>切换</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity>
                <Text>添加</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
