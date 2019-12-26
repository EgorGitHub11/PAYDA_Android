import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList, ToastAndroid } from 'react-native';

import Toast from 'react-native-tiny-toast'
import Reinput from 'reinput'
import axios from 'axios'

import Header from '../../components/uikit/Header'
import {Input,Button,Loading} from './ui'
import BButton from '../../components/uikit/mainBigBtn'
import {w,h} from '../../constants'
import UiDetails from './uiCreateDetails/UiDetails'

export default class InvoiceForPayment extends Component {
  constructor(props) {
    super(props);
    this.postData = this.postData.bind(this)
    this.state = {
      name: '',
      iin: '',
      iik: '',
      kbe: '',
      bank: '',
      bik: '',
      sender: '',
      buyer_bin_iin: '',
      buyer_name:'',
      pk:'',
      jwt: '',
      loading: false,
      // **
        items: [ ],
        services: '',
        unit: '',
        count: '',
        price: '',
      addings: [],
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
              jwt:prevState.jwt + access_token,
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
    const {pk,jwt, buyer_bin_iin,buyer_name,contract, name, iin, iik, kbe, bank, bik, sender, addings} = this.state
    const url = `http://192.168.31.237:8000/api/sendInvoicePayment/${pk}/`
    console.log('""""""""""""""""""""')
    console.log(url)
    this.setState({ error: '', loading: true });

    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
      buyer_bin_iin: buyer_bin_iin,
      buyer_name: buyer_name,
      name: name,
      iin: iin,
      iik: iik,
      kbe: kbe,
      bank: bank,
      bik: bik,
      sender: sender,
      addings: addings,
    })
    .then(function (response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        console.log('ura!')
      }
    })
    .then(() => {
      this.props.navigation.navigate('Home')
      this.setState({ error: '', loading: false });
    })
    .catch(function (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        'Ошибка!!!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      this.setState({ loading: '' });
    }); 
  }



  
  render() {
    const {buyer_bin_iin, buyer_name, name, iik, iin, kbe,
       bank, bik, sender, loading, services, unit, count, price,
      addings, text} = this.state
    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'СЧЕТ НА ОПЛАТУ'}/>
        <ScrollView>
            <View style={formBlock}>
              <Reinput
                label='Название' 
                value = {name}
              />
              <Reinput
                label='ИИН'
                value={iin}
                onChangeText = {iin => this.setState({iin})}
              />
              <Reinput
                label='ИИК'
                value={iik}
                onChangeText = {iik => this.setState({iik})}
              />
              <Reinput
                label='КБЕ'
                value={kbe}
                onChangeText = {kbe => this.setState({kbe})}
              />
              <Reinput
              label="Банк"
              value={bank}
              onChangeText = {bank => this.setState({bank})}
              />
              <Reinput
              label="БИК"
              value={bik}
              onChangeText = {bik => this.setState({bik})}
              />
              <Reinput
              label="Поставщик"
              value={sender}
              onChangeText = {sender => this.setState({sender})}
              />
               <View style={addBlock}>
                <Text style={titleText}>Заполните поля</Text>
              </View>
              <Reinput
              label="Покупатель БИН/ИИН"
              value={buyer_bin_iin}
              onChangeText={buyer_bin_iin => this.setState({ buyer_bin_iin })}
              />
              <Reinput
              label="Покупатель название"
              value={buyer_name}
              onChangeText = {buyer_name => this.setState({buyer_name})}
              />
            </View>

            <View style={addBlock}>
                <Text style={titleText}>Добавление услуги</Text>
            </View>

            <View style={formBlock}>
               <TodoList addings = {addings}/>
                  <Reinput
                    label='Наименование услуги'
                    value={services}
                    onChangeText = {services => this.setState({services})} 
                  />
                  <Reinput
                    label='Единица измерения'
                    value={unit}
                    onChangeText = {unit => this.setState({unit})}
                  />
                  <Reinput
                    label='Количество'
                    value={count}
                    onChangeText = {count => this.setState({count})}
                  />
                  <Reinput
                    label='Цена за единицу'
                    value={price}
                    onChangeText = {price => this.setState({price})}
                  />
                  {!this.loading ?
                    <Button onPress={() => this.handleSubmit()}>
                    <Text>Добавить</Text>
                  </Button> 
                  :
                    <Loading size={'large'}/>
                  }
              </View>
              <View style={mainBtn}>
              {!loading ?
                <BButton onPress={() => this.postData()}>
                  <Text style={{fontSize:30}}>Отправить</Text>
                </BButton>
                :
                <Loading size={'large'} />
              }
              </View>
        </ScrollView>                                                           
      </View>
    );
  }
  
  handleSubmit(e) {
    if (!this.state.services.length || !this.state.unit.length || !this.state.count.length || !this.state.price.length) {
      return(console.log('error'))
    }
      const {addings } = this.state
        addings.push({ 
            services: this.state.services,
            unit: this.state.unit,
            count: this.state.count,
            price: this.state.price,})
  
      this.setState(state => ({
      services: '',
      unit:'',
      count:'',
      price:'',
    }));
    console.log(this.state.addings)
  }
}




class TodoList extends React.Component {
  render() {
    const {itemsContainer,itemsText} = styles
    return (
      <View style={itemsContainer}>
        {this.props.addings.map(item => (
          <Text style={itemsText} key={item.id}> 
          <Text>  - Наименование услуги: {item.services.toUpperCase()}</Text>
          <Text> - Единица измерения: {item.unit.toUpperCase()}</Text>
          <Text> - Количество: {item.count.toUpperCase()}</Text>
          <Text> - Цена за еденицу: {item.price.toUpperCase()}</Text>
          </Text>
        ))}
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
  },
  titleText:{
    fontSize:24,
    paddingVertical:5
  },
  mainBtn:{
    justifyContent:'center',
    alignItems:'center',
  },
  itemsContainer:{
      maxWidth: w ,
      paddingVertical: 15,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      borderRadius: 16,
      elevation: 8,
      marginBottom: 10
  },

  itemsText:{
    fontSize: 20,
    color: 'grey',
    padding:10
  }
});