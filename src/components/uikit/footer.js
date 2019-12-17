import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const myBottomIcon1 = <Icon name="notifications" size={30} color="#fff" />;
const myBottomIcon2 = <Icon name="inbox" size={30} color="#fff" />;
const myBottomIcon3 = <Icon name="account-balance-wallet" size={30} color="#fff" />;


export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {bottomContainer,bottomIconTouchable,text} = styles
    return (
      <View style={bottomContainer}>
        <TouchableOpacity style={bottomIconTouchable} onPress={ () => this.props.navigation.navigate('Nofications') }>
          {myBottomIcon1}
          <Text style={text}>Уведомления</Text>
        </TouchableOpacity>

        <TouchableOpacity style={bottomIconTouchable} onPress={ () => this.props.navigation.navigate('Inbox') }>
          {myBottomIcon2}
          <Text style={text}>Архив</Text>
        </TouchableOpacity>

        <TouchableOpacity style={bottomIconTouchable} onPress={ () => this.props.navigation.navigate('Money') }>
          {myBottomIcon3}
          <Text style={text}>Платежи</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    bottomContainer:{
        backgroundColor: '#F03C49',
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingVertical:5,
        marginTop:5
      },
      bottomIconTouchable:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text:{
        color: '#fff',
        fontSize:10
      }
});