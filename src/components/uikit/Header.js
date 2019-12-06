import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import {h,w} from '../../constants'

import Inbox from '../Inbox/Inbox'

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="account-circle" size={45} color="#fff" />;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {headerTitle,container} = styles
    return (
        <View style={container}>
            <Text style={headerTitle}>{this.props.name}</Text>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Profile')}>
                {myIcon}
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        width:w,
        flexDirection:'row',
        backgroundColor: '#F03C49',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:5,
        paddingHorizontal:15,
    },
    headerTitle:{
        fontSize: 20,
        color:'#fff'
    },
    logo:{
        width: w / 2.4,
        height: 70,
        resizeMode: 'contain',
        margin: 20
    },
    backBtn:{
        alignSelf: 'flex-start', 
    }
});