//dogovora
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, Image, TouchableOpacity} from 'react-native';

// const FileDownload = require('react-native-file-download')

import Header from '../../uikit/Header'

import {w,h} from '../../../constants'

import axios from 'axios'

import {mainUrl} from '../../../config'

import RNFetchBlob from 'rn-fetch-blob'

export default class contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[],
      jwt:'',
      pk:'',
      name:'',
      docUrl:''
    };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {pk,name,access_token} = dataJson
            this.setState(prevState => ({
              pk: prevState.pk + pk,
              name: prevState.name + name,
              jwt: prevState.jwt + access_token
            }))
            console.log('I am in showData' + ' ' + this.state.pk)
            return dataJson
        }
    } catch (error) {
        console.log(error)
    }
    }
    this.showData().then(() => this.getData())
  }

  getData(){
    const {jwt,pk,} = this.state
    const url = mainUrl+`/api/archive/${pk}/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
        // console.log(response.data.contract[0].file)
        this.setState({arr: response.data.contract})
        this.setState({docUrl: response.data.contract[0].file})
        console.log(this.state.docUrl)
        console.log(this.state.arr)
      })
  }

  download(){
    const {docUrl,jwt} = this.state
    console.log(docUrl + ' ' + 'DOC')
    let newUrl = docUrl.split('.').pop().toString();
    console.log(newUrl)
    RNFetchBlob
    .config({
      fileCache: true,
      appendExt: `${newUrl}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        description: 'Powel nahui'
      }
    })
    .fetch('GET', `${docUrl}`, {
      Authorization : 'Token ' + jwt,
      // more headers  ..
    })
    .then((res) => {
      let status = res.info().status;
  
      if(status == 200) {
        // the conversion is done in native code
        //let base64Str = res.base64()
        // the following conversions are done in js, it's SYNC
        //let text = res.text()
        //let json = res.json()
        // console.log(res)
        android.actionViewIntent(res.path())
      } else {
        // handle other status codes
      }
    })
    // Something went wrong:
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log(errorMessage, statusCode);
    })
}


  render() {
    const {arr} = this.state

    const {notiffy, mainContainer, childMainContainer,
      notifyInside, notifyInsideInfText, notifyInsideBlock,
      notifyText,notifyDateAndFromWho,scroll,notifyDateAndFromWhoBlue,empty,textEmpty} = styles
    return (
      <View style={mainContainer}>
      <Header navigation={this.props.navigation} name={'ДОГОВОРА'}/>
      <View style={childMainContainer}>
      <ScrollView style={scroll}>
          {
                  arr.reverse(),
                  arr.length != 0
                        ?
                  arr.map(i => (
                  <TouchableOpacity style={notiffy} onPress={() => this.download()}>
                          <View style={notifyInsideBlock}>
                              <View style={notifyInside}>
                                  <Text style={notifyDateAndFromWho}>DOC</Text>
                                  <Text style={notifyDateAndFromWho}>{i.category}</Text>
                                  <Text style={notifyDateAndFromWhoBlue}>{i.created}</Text>
                              </View>
                          </View>
                  </TouchableOpacity>
                ))
                        :
                      <View style={empty}>
                        <Text style={textEmpty}>Нет документов</Text>
                      </View>
              }
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
  },
    //Empty
    empty:{
      width:w,
      height:h,
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    textEmpty:{
      fontSize:24,
      color:'grey'
    }
});

