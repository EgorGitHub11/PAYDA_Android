import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,AsyncStorage} from 'react-native';
import {h,w} from '../../constants'
import Header from '../uikit/Header'
import Footer from '../uikit/footer'
import {Button} from './ui'
import axios from 'axios'

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="tune" size={30} color="#528156" />;

export default class Money extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jwt:'',
        arr: [],
        sum_spend:0,
        sum_earn:0,
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

        // console.log(this.state.sum_spend + ' ' + 'расход' + ' ' + this.state.sum_earn + ' ' + 'доход')
        // console.log(this.state.arr + ' ' + 'cool')
      })
  }

  

  render() {
    const {arr, jwt, sum_spend, sum_earn} =this.state

    const {childMainContainer, mainContainer, 
           blockEarn,blockFilter,blockSpend, notiffy, 
           notifyInside, notifyInsideInfText, notifyInsideBlock,
           notifyText,notifyDateAndFromWho,firstTitle,
           thecondTitle, btnsblock, scroll, textEarn, textSpend, 
           bigTextEarn, bigTextSpend,notifyDateAndFromWhoBlue} = styles

    return (
        <View style={mainContainer}>
        <Header navigation={this.props.navigation} name={'ФИНАНСЫ'}/>
       <View style={childMainContainer}>

           <View style={blockFilter}>
            <Text>a</Text>
            {myIcon}
           </View>
{/* **************************************** */}
           <View style={blockSpend}>
           <View style={firstTitle}>
                <Text>
                    Доход
                </Text>
                <Text> / </Text>
                <Text>
                    Расход
                </Text>
            </View>

           <View style={firstTitle}>
                <Text style={textEarn}>
                    {sum_earn}
                </Text>
                <Text> / </Text>
                <Text style={textSpend}>
                    {sum_spend} 
                </Text>
            </View>

            <View style={thecondTitle}>
                <Text style={bigTextSpend}>
                    Расходы
                </Text>
                <Text  style={bigTextSpend}>
                    {sum_spend} тг
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
            <Button  onPress={ () => this.props.navigation.navigate('AllSpend') }>
                    <Text>Показать все</Text>
            </Button> 

            <Button onPress={ () => this.props.navigation.navigate('Create') }>
                    <Text>Создать расход</Text>
            </Button> 
            </View>
           </View>
{/* **************************************** */}
           <View style={blockEarn}>
           <View style={firstTitle}>
                <Text>
                    
                </Text>
                <Text>  </Text>
                <Text>
                    
                </Text>
            </View>

           <View style={firstTitle}>
                <Text style={textEarn}>
                    
                </Text>
                <Text> </Text>
                <Text style={textSpend}>
                    
                </Text>
            </View>
            <View style={thecondTitle}>
                <Text style={bigTextEarn}>
                    Доход
                </Text>
                <Text  style={bigTextEarn}>
                    {sum_earn} тг
                </Text>
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
          
            <View style={btnsblock}>
            <Button onPress={ () => this.props.navigation.navigate('AllEarn') }>
                    <Text>Показать все</Text>
            </Button> 

            <Button onPress={ () => this.props.navigation.navigate('CreateEarn')}>
                    <Text>Создать чек</Text>
            </Button> 
            </View>
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
        flex:5,
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
        paddingHorizontal:20,
        borderBottomWidth:1,
        borderColor:'grey',
        marginBottom: 10,
    },
    blockEarn:{
        flex:5,
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
        height: h / 7,
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
        fontSize:22
    },
    textSpend:{
        color:'red',
        fontSize:22
    }
  });
