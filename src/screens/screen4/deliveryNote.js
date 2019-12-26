import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage,} from 'react-native';

import Header from '../../components/uikit/Header'

import {w,h} from '../../constants'
import BButton from '../../components/uikit/mainBigBtn'
import axios from 'axios'
import {Input,Button,Loading} from './ui'
import Reinput from 'reinput'
import {List,ListItem} from 'react-native-elements'


export default class deliveryNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Client
      recipient: '',
      resbonsible: '',
      //Auto
      name: '',
      iin: '',
      //Addings
      services: '',
      unit: '',
      count: '',
      price: '',
      addings: [],
      //Login
      pk:'',
      jwt: '',
      //Loading
      loading: false
  };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {name,iin,pk,access_token,} = dataJson
            this.setState(prevState => ({
              name: prevState.name + name,
              iin: prevState.iin + iin,
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
    const {recipient,resbonsible, 
           name,iin,
           addings,
           pk,jwt} = this.state

    const url = `http://192.168.31.237:8000/api/sendNote/${pk}/`
    console.log('"""""""""""""""""""""')
    console.log(url)
    this.setState({ error: '', loading: true });
    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
          name: name,
          iin: iin,
          addings: addings
      })
      .then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
        console.log('DONE!,DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!DONE!')
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
    const {recipient,resbonsible, 
      name,iin,
      addings,
      services,unit,count,price,
      loading,
      pk,jwt} = this.state
      const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
      <Header navigation={this.props.navigation} name={'НАКЛАДНАЯ НА ОТПУСК ТОВАРА'}/>
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
          </View>
         <View style={addBlock}>
                <Text style={titleText}>Добавление товара</Text>
            </View>

            <View style={formBlock}>
               <TodoList addings = {addings}/>
                  <Reinput
                    label='Наименование товара'
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
      const { addings} = this. state
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
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

class TodoList extends React.Component {
  
  render() {
    const {itemsContainer,itemsText, itemsTextEnd} = styles
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
},

itemsTextEnd:{
  fontSize: 20,
  color: 'grey',
  padding:10,
  marginBottom:20
}
});