import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import Toast from 'react-native-tiny-toast'

import axios from 'axios'

import Header from '../../components/uikit/Header'
import {Input,Button,Loading} from './ui'
import {w,h} from '../../constants'
import UiDetails from './uiCreateDetails/UiDetails'

export default class InvoiceForPayment extends Component {
  constructor(props) {
    super(props);
    this.postData = this.postData.bind(this)
    this.createDetails = this.createDetails.bind(this)
    this.state = {
      name: '',
      requisite: '', 
      iin: '',
      iik: '',
      kbe: '',
      bank: '',
      bik: '',
      sender: '',
      buyer: '',
      contract:'',
      pk:'',
      jwt: '',
      loading: false,
      detailsName: '',
      unit: '',
      count: '',
      priceUnit: '',
    };
  }


  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {name,iin,iik,kbe,bank,bik,sender,pk,access_token} = dataJson
            this.setState(prevState => ({
              name: prevState.name + name,
              iin: prevState.iin + iin,
              iik: prevState.iik + iik,
              kbe: prevState.kbe + kbe,
              bank: prevState.bank + bank,
              bik: prevState.bik + bik,
              sender: prevState.iin + sender,
              pk: prevState.pk + pk,
              jwt:prevState.jwt + access_token
            }))
            console.log( dataJson);
            return dataJson
        }
    } catch (error) {
        // Error retrieving data
        console.log(error)
    }
    }
    this.showData()
  }

 

  postData(){
    
    const {pk,jwt, buyer,contract, name, iin, iik, kbe, bank, bik, sender, loading} = this.state
    const url = `http://192.168.31.237:8000/api/createInvoicePayment/${pk}/`
    console.log('"""""""""""""""""""""')
    console.log(url)

    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
          buyer: buyer,
          contract: contract,
          name: name,
          iin: iin,
          iik: iik,
          kbe: kbe,
          bank: bank,
          bik: bik,
          sender: sender
      })
      .then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
        console.log('DONE!,DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!')
        Toast.showSuccess('Post success')
   }
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  


  createDetails(){
    console.log('tap-tap!')
  // this.setState(prevState => ({
  //   detailsName: prevState.detailsName + 'sds',
  //   unit: prevState.unit + 'asas',
  //   count: prevState.count + 'asas',
  //   priceUnit: prevState.priceUnit + 'asas'
  // }))
  return <UiDetails/>
  }



  
  render() {
    const {buyer, contract, name, requisite, iik, iin, kbe, bank, bik, sender, loading, detailsName, unit, count, priceUnit} = this.state
    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
         <Header name={'СЧЕТ НА ОПЛАТУ'}/>
         <View style={titleBlock}>
            <Text style={titleText}>Счет на оплату</Text>
            </View>
        <ScrollView>
            <View style={formBlock}>
              <Input
                placeholder='Название' 
                value = {name}
              />
              <Input
                placeholder='ИИН'
                value={iin}
                onChangeText = {iin => this.setState({iin})}
              />
              <Input
                placeholder='ИИК'
                value={iik}
                onChangeText = {iik => this.setState({iik})}
              />
              <Input
                placeholder='КБЕ'
                value={kbe}
                onChangeText = {kbe => this.setState({kbe})}
              />
              <Input
              placeholder="Банк"
              value={bank}
              onChangeText = {bank => this.setState({bank})}
              />
              <Input
              placeholder="БИК"
              value={bik}
              onChangeText = {bik => this.setState({bik})}
              />
              <Input
              placeholder="Поставщик"
              value={sender}
              onChangeText = {sender => this.setState({sender})}
              />
               <View style={addBlock}>
                <Text style={titleText}>Заполните поля</Text>
              </View>
              <Input
              placeholder="Покупатель"
              value={buyer}
              onChangeText={buyer => this.setState({ buyer })}
              />
              <Input
              placeholder="Договор"
              value={contract}
              onChangeText = {contract => this.setState({contract})}
              />
            </View>
        
            <View style={addBlock}>
                <Text style={titleText}>Добавление услуги</Text>
            </View>

            <View style={formBlock}>
                  <Input
                    placeholder='Наименование услуги'
                    value={detailsName}
                    onChangeText = {detailsName => this.setState({detailsName})} 
                  />
                  <Input
                    placeholder='Единица измерения'
                    value={unit}
                    onChangeText = {unit => this.setState({unit})}
                  />
                  <Input
                    placeholder='Количество'
                    value={count}
                    onChangeText = {count => this.setState({count})}
                  />
                  <Input
                    placeholder='Цена за единицу'
                    value={priceUnit}
                    onChangeText = {priceUnit => this.setState({priceUnit})}
                  />

                  {/* <View>
                    <Text>{detailsName}</Text>
                    <Text>{unit}</Text>
                    <Text>{count}</Text>
                    <Text>{priceUnit}</Text>
                  </View> */}

                  <Button onPress={() => {this.createDetails()}}>
                    <Text>Сохранить</Text>
                  </Button>
              </View>
              <View style={mainBtn}>
              {!loading ?
                <Button onPress={() => this.postData()}>
                  <Text style={{fontStyle: 'italic', fontSize:30, color:'green'}}>Отправить</Text>
                </Button>
                :
                <Loading size={'large'} />
              }
              </View>
        </ScrollView>                                                           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: '#fff',
  },
  titleBlock:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor: '#F03C49'
  }, 
  formBlock:{
    backgroundColor:'#fff',
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'column',
    padding: 20
  },
  addBlock:{
    width:w,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderColor: '#F03C49'
  },
  titleText:{
    fontSize:20,
    paddingVertical:5
  },
  mainBtn:{
    justifyContent:'center',
    alignItems:'center',
  }
});