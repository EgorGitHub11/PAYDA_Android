import React, { Component } from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';
import {w,h,stylesText} from '../../constants'

export default class LoginUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
      const {containerMain,containerLogo,containerLogin} = styles
    return (
      <View style={containerMain}>

        <View style={containerLogo}>
            <Image/>
        </View>

        <View style={containerLogin}>
            <Text style={stylesText.h1_L}>
                <Text style={{color:'red'}}>ПАЙДА</Text>
                <Text style={{color:'grey'}}>БУХГАЛТЕРИЯ</Text>
            </Text>
            <Text>Input</Text>
            <Text>Input</Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        backgroundColor: 'skyblue',
        width: w,
        height: h
    },
    containerLogo:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        width: w,
    },
    containerLogin:{
        flex:3,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#fff'
    }
});
