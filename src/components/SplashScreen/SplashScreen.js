import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {h,w} from '../../constants'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    };
  };
  

  UNSAFE_componentWillMount = () => {
    setTimeout(() => {
        this.props.navigation.navigate('SignIn')
    }, 3000)
  };
  

  render() {
      const {logo, mainC, logoBlock} = styles
    return (
      <View style={mainC}>
            <Image style={logo} source={require('../../logo/logo.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        margin: 'auto',
    },
    mainC:{
        flex:1,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems: 'center'
    },
    logoBlock:{
      width:w,
      height: h / 2
    }
});