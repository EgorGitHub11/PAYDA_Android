import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import axios from 'axios'

import Header from '../../components/uikit/Header'
import {Input,Button} from './ui'
import {w,h} from '../../constants'

export default class invoice extends Component {
  constructor(props) {
    super(props);
    this.invoicePost = this.invoicePost.bind(this)
    this.state = {
      docNumber : "№1224329492142",
      docDate : "11/01/2019",
      loading: false,
      unn: '',
      uuk: ''
    };
  }

    invoicePost() {
      const { username, password } = this.state;
  
      this.setState({ error: '', loading: true });
  
      axios.post("",{
          username: username,
          password: password
      })
      .then((response) => {
        console.log(response.data)
        this.props.navigation.navigate('Home')
        deviceStorage.saveItem("id_token", response.data.access_token);
        console.log(response.data.access_token)
        console.log(response.data.username)
      })
      .catch((error) => {
        console.log(error);
        this.onLoginFail();
      });
    }

  render() {
    const {docDate, docNumber, col, price} = this.state
    const {mainContainer, titleBlock, formBlock, titleText, addBlock} = styles
    return (
      <View style={mainContainer}>
         <Header name={'Счет фактура'}/>
         <View style={titleBlock}>
            <Text style={titleText}>
                {docNumber}
            </Text>
            <Text style={titleText}>Счет фактура</Text>
            <Text style={titleText}>
                {docDate}
            </Text>
            </View>
        <ScrollView>
            <View style={formBlock}>
  <Input
      placeholder='Поставщик авт' 
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
    <Input
      placeholder='Реквизиты поставщика авт'
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
     <Input
      placeholder='Договор'
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
     <Input
      placeholder='ИИН '
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
     <Input
      placeholder='ИИК'
      // value={username}
      // onChangeText={username => this.setState({ username })}
    /> 
    <Input
    placeholder="Банк"
    />
    <Input
    placeholder="БИК"
    />
    <Input
    placeholder="Банк"
    />
</View>

            <View style={addBlock}>
<Text style={titleText}>Добавление услуги</Text>
</View>

            <View style={formBlock}>
  <Input
      placeholder='Наименование услуги' 
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
    <Input
      placeholder='Единица измерения'
      // value={username}
      // onChangeText={username => this.setState({ username })}
    />
     <Input
      placeholder='Количество'
      value={col}
      onChangeText={col => this.setState({ col })}
    />
     <Input
      placeholder='Цена за единицу'
      value={price}
      onChangeText={price => this.setState({ price })}
    />
    <Button onPress={() => this.handleCalc()}>
      <Text>Отправить</Text>
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
  }
});