import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';

import axios from 'axios'

import Header from '../../components/uikit/Header'
import {Input,Button,Loading} from './ui'
import {w,h} from '../../constants'

export default class InvoiceForPayment extends Component {
  constructor(props) {
    super(props);
    this.postData = this.postData.bind(this)
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
      loading: false
    };
  }

  showData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
          const dataJson = JSON.parse(value)
          const {name,iin,iik,kbe,bank,bik,sender,pk} = dataJson
          this.setState(prevState => ({
            name: prevState.name + name,
            iin: prevState.iin + iin,
            iik: prevState.iik + iik,
            kbe: prevState.kbe + kbe,
            bank: prevState.bank + bank,
            bik: prevState.bik + bik,
            sender: prevState.iin + sender,
            pk: prevState.pk + pk,
          }))
          console.log( dataJson);
          return dataJson
      }
  } catch (error) {
      // Error retrieving data
      console.log(error)
  }
  }
  
  // increment(){
  //   console.log()
    // this.setState(prevState => ({
    //   name: prevState.name + 'sds'
    // }))
  // }
  componentDidMount(){
    this.showData()
  }

  postData(){
    this.setState({loading: true });
    const {pk} = this.state
    const url = `http://192.168.31.237:8000/api/createInvoicePayment/${pk}/`
    this.onFetchSubmit = async(toast) => {
      var data = {
          buyer: this.state.buyer,
          contract: this.state.contract
      };
      try {
          let response = await fetch(
              url,
                {
                  method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                }, 
                body: JSON.stringify(data)
                }
      );
      if (response.status >= 200 && response.status < 300) {
            //  setTimeout( () => {
            //   Toast.hide(toast)
            //   Toast.showSuccess("הפרטים נקלטו בהצלחה, נציג מהסוכנות יצור קשר תוך 24 שעות")
            //   this.props.navigation.navigate('Home')
            // },1000)
            console.log('DATA WAS SEND')
      }
      } catch (errors) {
          alert(errors);
        } 
     }
  }



  
  render() {
    const {buyer, contract, name, requisite, iik, iin, kbe, bank, bik, sender, loading} = this.state
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
                  />
                  <Input
                    placeholder='Единица измерения'
                  />
                  <Input
                    placeholder='Количество'
                  />
                  <Input
                    placeholder='Цена за единицу'
                  />
                  <Button>
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
    flexDirection:'column'
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