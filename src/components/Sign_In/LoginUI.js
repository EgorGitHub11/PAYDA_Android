import React, { Component } from 'react';
import { 
  View, Text, 
  StyleSheet,Image,
  TouchableOpacity,
} from 'react-native';
import LoginLogic from './LoginLogic'
import {h,w} from '../../constants'

export class LoginLetter extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  };
  
  render(){
    const {container,formContainer,headerLogin, containerTitle, logo} = styles
    return (
      <View style={container}>

        <View style={headerLogin}>
          <View style={containerTitle}>
            <Image style={logo} source={require('../../logo/logo.png')}/>
          </View>
        </View>

        <View style={formContainer}>
          <LoginLogic newJWT={this.props.newJWT}/>
        </View>

      </View>
  );
  }
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
    },
    logo:{
      width: w,
      height: h / 7,
      resizeMode: 'contain',
      margin: 'auto',
  },
});

export default LoginLetter