import React, { Component } from 'react';
import { 
  View, Text, 
  StyleSheet,Image,
  TouchableOpacity,
} from 'react-native';
import LoginLogic from './LoginLogic'
import {h,w} from '../../constants'

const LoginLetter = (props) => {
    const {container,formContainer,headerLogin} = styles
    return (
        <View style={container}>
          <View style={headerLogin}>
        
          </View>
          <View style={formContainer}>
            <LoginLogic/>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    formContainer:{
      flex: 4,
      justifyContent: 'center',
    },
    headerLogin:{
      width: w,
      flex:2,
      backgroundColor: 'green'
    }
});

export default LoginLetter