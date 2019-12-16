import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage} from 'react-native';

import axios from 'axios'
import Reinput from 'reinput'
import Header from '../../components/uikit/Header'
import {Input,Button,Loading} from './ui'
import BButton from '../../components/uikit/mainBigBtn'
import {w,h} from '../../constants'

export default class invoice extends Component {
  constructor(props) {
    super(props);
    this.postData = this.postData.bind(this)
    this.state = {
      //Client
      recipient: '',
      iin_recipient: '',
      iik_recipient: '',
      bank_recipient: '',
      bik_recipient: '',
      contract :'',
      //Auto
      name: '',
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
      leader:'',
      loading: false,
      // **
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
            const {name,iin,iik,kbe,bank,bik,leader,pk,access_token,} = dataJson
            this.setState(prevState => ({
              name: prevState.name + name,
              iin: prevState.iin + iin,
              iik: prevState.iik + iik,
              kbe: prevState.kbe + kbe,
              bank: prevState.bank + bank,
              bik: prevState.bik + bik,
              leader: prevState.leader + leader,
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
    const {contract, name, iik, iin, kbe,
      bank, bik, leader, recipient,iik_recipient,iin_recipient,
      bank_recipient,bik_recipient, pk, jwt, addings} = this.state

    const url = `http://192.168.31.237:8000/api/sendInvoice/${pk}/`
    console.log('"""""""""""""""""""""')
    console.log(url)

    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
          contract: contract,
          name: name,
          iin: iin,
          iik: iik,
          kbe: kbe,
          bank: bank,
          bik: bik,
          leader: leader,
          recipient: recipient,
          iik_recipient: iik_recipient,
          iin_recipient: iin_recipient,
          bank_recipient: bank_recipient,
          bik_recipient: bik_recipient,
          addings: addings
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


  render() {
    const {contract, name, iik, iin, kbe,
           bank, bik, loading, 
           leader, recipient,iik_recipient,
           iin_recipient,bank_recipient,bik_recipient,addings,
           services,unit,count,price} = this.state

    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
      <Header name={'СЧЕТ НА ФАКТУРА'}/>
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
           label="Ответственное лицо"
           value={leader}
           onChangeText = {leader => this.setState({leader})}
           />
            <View style={addBlock}>
             <Text style={titleText}>Заполните поля</Text>
           </View>
           <Reinput
           label="Договор"
           value={contract}
           onChangeText = {contract => this.setState({contract})}
           />
            <Reinput
           label="Получатель"
           value={recipient}
           onChangeText = {recipient => this.setState({recipient})}
           />
            <Reinput
           label="ИИК (Получателя)"
           value={iik_recipient}
           onChangeText = {iik_recipient => this.setState({iik_recipient})}
           />
            <Reinput
           label="ИИН (Получателя)"
           value={iin_recipient}
           onChangeText = {iin_recipient => this.setState({iin_recipient})}
           />
            <Reinput
           label="БИК (Получателя)"
           value={bik_recipient}
           onChangeText = {bik_recipient => this.setState({bik_recipient})}
           />
            <Reinput
           label="Банк"
           value={bank_recipient}
           onChangeText = {bank_recipient => this.setState({bank_recipient})}
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
               <Text style={{fontStyle: 'italic', fontSize:30}}>Отправить</Text>
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
      const { addings } = this.state
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
    fontSize:20,
    paddingVertical:5
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