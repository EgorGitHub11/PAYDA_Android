import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import Reinput from 'reinput'
import Header from '../../components/uikit/Header'
import {w,h} from '../../constants'
import BButton from '../../components/uikit/mainBigBtn'
import axios from 'axios'
import {Input,Button,Loading} from './ui'



export default class certificateOfCompletion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //Client
        customer: '',
        customer_iin: '',
        contract: '',
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
    const {customer,customer_iin,contract,
           name,iin,
           services,unit,count,price,addings,
           pk,jwt} = this.state

    const url = `http://192.168.31.237:8000/api/sendInvoicePayment/${pk}/`
    console.log('"""""""""""""""""""""')
    console.log(url)

    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
          contract: contract,
          name: name,
          iin: iin,
          customer_iin: customer_iin,
          customer: customer,
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
    const {customer,customer_iin,contract,
      name,iin,
      services,unit,count,price,addings,
      pk,jwt,loading} = this.state
      const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
      <Header name={'АКТ ВЫПОЛНЕНЫХ РАБОТ'}/>
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
            <View style={addBlock}>
             <Text style={titleText}>Заполните поля</Text>
           </View>
           <Reinput
           label="Договор"
           value={contract}
           onChangeText = {contract => this.setState({contract})}
           />
          <Reinput
           label="ИИН(Заказчика)"
           value={customer_iin}
           onChangeText = {customer_iin => this.setState({customer_iin})}
           />
            <Reinput
           label="Заказчик"
           value={customer}
           onChangeText = {customer => this.setState({customer})}
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