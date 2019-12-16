import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Header from '../uikit/Header'

import {w,h} from '../../constants'

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {childMainContainer, mainContainer, notify, 
           notifyInside, notifyInsideInfText, notifyInsideBlock,
           notifyText,notifyDateAndFromWho} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'УВЕДОМЛЕНИЯ'}/>
        <View style={childMainContainer}>

            <View style={notify}>
                <View style={notifyInsideBlock}>
                    <View style={notifyInside}>
                      <Text style={notifyDateAndFromWho}>22:45 11.08</Text>
                    </View>
                    <View style={notifyInside}>
                      <Text style={notifyDateAndFromWho}>ЕРДОС</Text>
                    </View>
                </View>

                <View style={notifyInsideInfText}>
                  <Text style={notifyText}>Вам необходимо пополнить счет</Text>
                </View>
            </View>

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
  },
  notify:{
    width: w,
    height: 'auto',
    backgroundColor: '#EEEFF3',
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  notifyInside:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  notifyInsideBlock:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10
  },
  notifyInsideInfText:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:10,
    marginTop:20,
    marginBottom:20
  },
  notifyText:{
    fontSize:20,
    color:'black'
  },
  notifyDateAndFromWho:{
    fontSize:17,
    color:'grey'
  }
});