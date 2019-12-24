import React, { Component, Fragment } from 'react';
import { 
    Text, StyleSheet, TextInput, 
    TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, View, AsyncStorage
} from 'react-native';
import { Input, TextLink, Loading, Button } from './ui';


// import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios'
import {mainUrl} from '../../config'
import Reinput from 'reinput'
import {h,w} from '../../constants'
import { SimpleAnimation } from 'react-native-simple-animations';



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
          console.log( JSON.parse(value), '******I am in async storage!*******');
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
      const url = mainUrl+'/api/loginClient/'
      console.log(url)
      this.setState({ error: '', loading: true });
  
      axios.post(url,{
          username: username,
          password: password
      })
      .then((response) => {
        const data = response.data
        console.log(response.data)

        AsyncStorage.setItem('key',JSON.stringify(data), (err)=> {
          if(err){
              console.log("an error");
              throw err;
          }
          console.log("******JWT success saved******");
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
      <ScrollView>
        <View style={form}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={title}>
            <Text style={{color:'blue', fontSize:18,}}>
                ПАЙДА
                <Text style={{color:'skyblue',}}>БУХГАЛТЕРИЯ</Text>
            </Text>
          </View>
        </SimpleAnimation>
            <Reinput
              label='Логин' 
              value = {username}
              onChangeText={username => this.setState({ username })}
            />
   
            <Reinput
              secureTextEntry
              label='Введите пароль'
              value={password}
              onChangeText={password => this.setState({ password })}
            />
       

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
      </ScrollView>
    );
  }
}

const styles = {
  form: {
    backgroundColor:'#fff',
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'column',
    padding: 20
  },
  containerTitle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    width:w,
    justifyContent:'center',
    alignItems: 'center',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};