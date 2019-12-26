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
      rec_bin_iin: '',
      rec_name:'',
      rec_bik:'',
      rec_iik:'',
      rec_bank:'',
      rec_adres:'',
      //Auto
      name: '',
      iin: '',
      iik: '',
      kbe: '',
      bank: '',
      bik: '',
      sender: '',
      buyer: '',
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
    const {name, iik, iin, kbe,
      bank, bik, leader, pk, jwt, addings,  rec_bin_iin, rec_adres, 
      rec_bank, rec_bik, rec_name, rec_iik} = this.state

    const url = `http://192.168.31.237:8000/api/sendInvoice/${pk}/`
    console.log('"""""""""""""""""""""')
    console.log(url)
    this.setState({ error: '', loading: true });
    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
          name: name,
          iin: iin,
          iik: iik,
          kbe: kbe,
          bank: bank,
          bik: bik,
          leader: leader,
          rec_bin_iin: rec_bin_iin,
          rec_bik: rec_bik,
          rec_bank: rec_bank,
          rec_name: rec_name,
          rec_adres: rec_adres,
          rec_iik: rec_iik,
          addings: addings
      })
      .then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
   }
      })
      .then(() => {
        this.props.navigation.navigate('Home')
        this.setState({ error: '', loading: false });
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }


  render() {
    const { name, iik, iin, kbe,
           bank, bik, loading, 
           leader,addings,
           services,unit,count,price, rec_bin_iin, rec_adres, 
           rec_bank, rec_bik, rec_name, rec_iik,} = this.state

    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
      <Header navigation={this.props.navigation} name={'СЧЕТ НА ФАКТУРА'}/>
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
           label="Получатель БИН/ИИН"
           value={rec_bin_iin}
           onChangeText = {rec_bin_iin => this.setState({rec_bin_iin})}
           />
           <Reinput
           label="Получатель название"
           value={rec_name}
           onChangeText = {rec_name => this.setState({rec_name})}
           />
           <Reinput
           label="Получатель БИК"
           value={rec_bik}
           onChangeText = {rec_bik => this.setState({rec_bik})}
           />
           <Reinput
           label="Получатель Банк"
           value={rec_bank}
           onChangeText = {rec_bank => this.setState({rec_bank})}
           />
           <Reinput
           label="Получатель Адрес"
           value={rec_adres}
           onChangeText = {rec_adres => this.setState({rec_adres})}
           />
            <Reinput
           label="Получатель ИИК"
           value={rec_iik}
           onChangeText = {rec_iik => this.setState({rec_iik})}
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