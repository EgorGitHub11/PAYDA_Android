import React, { Component } from 'react';
import { View, Text, AsyncStorage,StyleSheet, ScrollView} from 'react-native';

import {h,w} from '../../constants'
import Header from '../uikit/Header'
import Footer from '../uikit/footer'
import {Button} from './ui'
import axios from 'axios'


export default class AllEarn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[],
      jwt:''
    };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {access_token} = dataJson
            this.setState(prevState => ({
              jwt: prevState.jwt + access_token
            }))
            return dataJson
        }
    } catch (error) {
        console.log(error)
    }
    }
    this.showData().then(() => this.getData())
  }

  getData(){
    const {jwt} = this.state
    const url = `http://192.168.31.237:8000/api/finance/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
          console.log(response.data)
        this.setState({arr: response.data})
      })
  }


  render() {
    const {arr} = this.state

    const {notiffy, mainContainer, childMainContainer,
      notifyInside, notifyInsideInfText, notifyInsideBlock,
      notifyText,notifyDateAndFromWho,scroll,notifyDateAndFromWhoBlue} = styles
  return (
      <View style={mainContainer}>
      <Header navigation={this.props.navigation} name={'ДОХОДЫ'}/>
      <View style={childMainContainer}>
      <ScrollView style={scroll}>
          {
                  arr.map(i => (
                      i.flag
                      ? 
                  <View style={notiffy}>
                          <View style={notifyInsideBlock}>
                              <View style={notifyInside}>
                              <Text style={notifyDateAndFromWho}>{i.money} тг</Text>
                              <Text style={notifyDateAndFromWhoBlue}>{i.date}</Text>
                              </View>
                          </View>

                          <View style={notifyInsideInfText}>
                          <Text style={notifyText}>{i.name}</Text>
                          </View>
                  </View>
                  :
                  null
                ))}
          </ScrollView>
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
    justifyContent:'center',
    alignContent: 'center',
    flexWrap:'wrap'
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  blockSpend:{
      flex:8,
      width:w,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
  },
  blockEarn:{
      flex:8,
      width:w,
      backgroundColor:'#fff',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
  },
  // notify
  notiffy:{
      width: w,
      height: 'auto',
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EEEFF3',
    },
    notifyBlockk:{
      height: h / 6,
      flexDirection: 'column-reverse',
      justifyContent:'center',
      alignItems: 'center'
    },
    notifyInside:{
      flexDirection: 'column',
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    notifyInsideBlock:{
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:10,
    },
    notifyInsideInfText:{
      flexDirection: 'row',
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:20,
      marginBottom:20,
      marginRight:20,
    },
    notifyText:{
      fontSize:20,
      color:'black'
    },
    notifyDateAndFromWho:{
      fontSize:17,
      color:'grey'
    },
    notifyDateAndFromWhoBlue:{
      fontSize:17,
      color:'blue'
    },
  //   
  firstTitle:{
      width:w,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  },
  thecondTitle:{
      width:w,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding: 15,
  },
  btnsblock:{
      width:w,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  },
  scroll:{
      flex:1
  },
  bigTextEarn:{
      fontSize:20,
      color:'green'
  },
  bigTextSpend:{
      fontSize:20,
      color:'red'
  },
  textEarn:{
      color:'green',
      fontSize:20
  },
  textSpend:{
      color:'red',
      fontSize:20
  }
});
