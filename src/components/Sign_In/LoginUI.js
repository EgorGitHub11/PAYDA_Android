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
            <Image style={logo} source={require('../../logo/logo.png')}/>
        </View>

        <View style={formContainer}>
          <LoginLogic navigation={this.props.navigation}/>
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
      flex:1,
      justifyContent: 'center',
    },
    headerLogin:{
      width: w,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#fff'
    },
    containerTitle:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize:w/4,
      paddingBottom: h / 20
    },
    logo:{
      width:w/2,
      height:h/2,
      resizeMode: 'contain',
  },
});

export default LoginLetter