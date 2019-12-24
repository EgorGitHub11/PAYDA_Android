import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,AsyncStorage, TouchableOpacity} from 'react-native';
import {h,w} from '../../constants'
import Header from '../uikit/Header'
import Footer from '../uikit/footer'
import {Button,ButtonLookAll} from './ui'
import axios from 'axios'
import DatePicker from 'react-native-datepicker'

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="tune" size={30} color="#2980b9" />;

export default class Plategka extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jwt:'',
        arr: [],
        sum_spend:0,
        sum_earn:0,
        date1:"",
        date2:"",
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

        let a = 0
        let b = 0
        response.data.map(i => (
            console.log(i.money),
            i.flag ? a += i.money : b += i.money
        ))
        this.setState({sum_earn:a})
        this.setState({sum_spend:b})

      })
  }

  getFilteredData = () => {
    const {jwt,date1,date2} = this.state
    const url = `http://192.168.31.237:8000/api/finance?start=${date1}&stop=${date2}`
    console.log(url)

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
          console.log(response.data)
        this.setState({arr: response.data})

        let a = 0
        let b = 0
        response.data.map(i => (
            console.log(i.money),
            i.flag ? a += i.money : b += i.money
        ))
        this.setState({sum_earn:a})
        this.setState({sum_spend:b})
      })
  }


  

  render() {
    const {arr, jwt, sum_spend, sum_earn, date1, date2} =this.state

    const {childMainContainer, mainContainer, 
           blockEarn,blockFilter,blockSpend, notiffy, 
           notifyInside, notifyInsideInfText, notifyInsideBlock,
           notifyText,notifyDateAndFromWho,firstTitle,
           thecondTitle, btnsblock, scroll, textEarn, textSpend, 
           bigTextEarn, bigTextSpend,notifyDateAndFromWhoBlue} = styles

    return (
        <View style={mainContainer}>
        <Header navigation={this.props.navigation} name={'ПЛАТЕЖИ'}/>
       <View style={childMainContainer}>
{/* **************************************** */}
           <View style={blockSpend}>
           <View style={firstTitle}>
                <Text style={textSpend}>
                    К ОПЛАТЕ:
                </Text>
            </View>

            <ScrollView style={scroll}>
            {
                    arr.map(i => (
                        !i.flag
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
          
            <View style={btnsblock}>
            <Button onPress={ () => this.props.navigation.navigate('CreatePlateg') }>
                    <Text>Создать платеж</Text>
            </Button> 
            </View>
           </View>
{/* **************************************** */}
           <View style={blockEarn}>
           <View style={firstTitle}>
                <Text style={textSpend}>
                     АРХИВ
                </Text>
            </View>
            <View style={blockFilter}>
           <DatePicker
        style={{width: 150}}
        date={date1}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-12-01"
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date1) => {this.setState({date1: date1})}}
      />

      <TouchableOpacity onPress={this.getFilteredData}>
          {myIcon}
      </TouchableOpacity>

      <DatePicker
        style={{width: 150}}
        date={date2}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-12-01"
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date2) => {this.setState({date2: date2})}}
      />
           
           </View>

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

           <Footer navigation={this.props.navigation}/>
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
        flex:6,
        width:w,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    blockFilter:{
        flex:1,
        width:w,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        paddingHorizontal:20,
        borderTopWidth:1,
        borderColor:'#EEEFF3',
        marginBottom: 10,
    },
    blockEarn:{
        flex:6,
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
        alignItems:'center',
        margin:10
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
        height: h / 7,
    },
    bigTextEarn:{
        fontSize:20,
        color:'green'
    },
    bigTextSpend:{
        fontSize:20,
        color:'#2980b9'
    },
    textEarn:{
        color:'green',
        fontSize:22
    },
    textSpend:{
        color:'#2980b9',
        fontSize:22
    }
  });
