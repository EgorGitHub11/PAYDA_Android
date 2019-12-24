import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Act from './ui/act'
import Declar from './ui/declar'
import Dogovor from './ui/dogovor'
import Plateg from './ui/plateg'
import Prochee from './ui/prochee'

import Header from '../uikit/Header'

import {w,h} from '../../constants'

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {childMainContainer, mainContainer} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'АРХИВ'}/>
        <View style={childMainContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Contracts')}>
              <Dogovor navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Order') }> 
              <Plateg navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Docs') }>
              <Act navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Form') }>
              <Declar navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Checks') }>
              <Prochee navigation={this.props.navigation}/>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  childMainContainer:{
    flex:1,
    width:w,
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent: 'center',
    flexWrap:'wrap'
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
  }
});