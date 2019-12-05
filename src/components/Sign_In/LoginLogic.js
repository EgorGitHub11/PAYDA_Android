import React, { Component, Fragment } from 'react';
import { 
    Text, StyleSheet, TextInput, 
    TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, View, AsyncStorage
} from 'react-native';
import { Input, TextLink, Loading, Button } from './ui';

import axios from 'axios'


import {h,w} from '../../constants'


export default class LoginLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      jwt:'',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  showData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
          // We have data!!
          console.log( JSON.parse(value), 'I am here!!!!!');
          this.props.navigation.navigate('Home') 
          return value
      }
  } catch (error) {
      // Error retrieving data
      console.log(error)
  }
  }
 
  loginUser = () => {
      const { username, password } = this.state;
  
      this.setState({ error: '', loading: true });
  
      axios.post("http://192.168.31.237:8000/api/loginClient/",{
          username: username,
          password: password
      })
      .then((response) => {
        // console.log(response.data)
        // store.saveItem("id_token", response.data.access_token);
        // console.log(store.readData("id_token"))
        // this.props.navigation.navigate('Home')
        // console.log(response.data.access_token)
        // console.log(response.data.username)

        const data = response.data
        console.log(response.data)
        AsyncStorage.setItem('key',JSON.stringify(data), (err)=> {
          if(err){
              console.log("an error");
              throw err;
          }
          console.log("JWT success");
      }).catch((err)=> {
          console.log("error is: " + err);
      })
      .then(() => {
        this.showData('key')
      })
      }) .catch((error) => {
        console.log(error);
        this.onLoginFail();
      });  
      

    }

   


 
  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }


 
  render() {
    const {username,password, error, loading} = this.state
    const { form, section, errorTextStyle, containerTitle, title } = styles;

    return (
      <Fragment>
        <View style={containerTitle}>
          <Text style={title}>
            <Text style={{color:'red'}}>ПАЙДА</Text>
            <Text style={{color:'grey'}}>БУХГАЛТЕРИЯ</Text>
          </Text>
        </View>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder='Введите номер'
              value={username}
              onChangeText={username => this.setState({ username })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder='Введите пароль'
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.loginUser}>
              ВОЙТИ
            </Button>
            :
            <Loading size={'large'} />
          }

        </View>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: w,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    width:w,
    height: 40,
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    color: '#000',
    paddingHorizontal: 10,
  },
  containerTitle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize:35,
    paddingBottom: h / 15
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};