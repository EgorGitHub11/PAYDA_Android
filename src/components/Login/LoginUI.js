import React, { Component } from 'react';
import { 
  View, Text, 
  StyleSheet,Image,
  TouchableOpacity,
} from 'react-native';
import LoginLogic from './LoginLogic'
import {h,w} from '../../constants'

const LoginLetter = (props) => {
    const {container,formContainer,headerLogin, containerTitle, title} = styles
    return (
        <View style={container}>
          <View style={headerLogin}>
            <View style={containerTitle}>
              
            </View>

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
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#000'
    },
    containerTitle:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize:35,
      paddingBottom: h / 20
    }
});

export default LoginLetter