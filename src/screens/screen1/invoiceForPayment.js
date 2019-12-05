import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';

import axios from 'axios'

import Header from '../../components/uikit/Header'
import {Input,Button} from './ui'
import {w,h} from '../../constants'

export default class InvoiceForPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      requisite: '', 
      iin: '',
      iik: '',
      kbe: '',
      bank: '',
      bik: '',
      sender: '',
      data:''
    };
  }

  showData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
          // We have data!!
          const dataJson = JSON.parse(value)
          console.log( dataJson);
          return dataJson
      }
  } catch (error) {
      // Error retrieving data
      console.log(error)
  }
  }

  increment(){
    console.log()
    this.setState(prevState => ({
      name: prevState.name + 'sds'
    }))
  }
  componentDidMount(){
    this.increment()
  }



  
  render() {
    const {buyer, contract, name, requisite, iik, iin, kbe, bank, bik, sender} = this.state
    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
         <Header name={'Счет на оплату'}/>
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
              <Button onPress={() => this.showData()}>
                    <Text style={{fontStyle: 'italic', fontSize:30, color:'green'}}>Отправить</Text>
              </Button>
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
    borderBottomWidth:2,
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