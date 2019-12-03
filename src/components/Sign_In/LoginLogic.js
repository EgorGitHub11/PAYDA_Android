import React, { Component, Fragment } from 'react';
import { 
    Text, StyleSheet, TextInput, 
    TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, View,
} from 'react-native';
import { Input, TextLink, Loading, Button } from './ui';

import axios from 'axios'
import deviceStorage from '../../service'

import Toast from 'react-native-tiny-toast'
import {h,w} from '../../constants'


export default class LoginLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  loginUser() {
    const { username, password, password_confirmation } = this.state;

    this.setState({ error: '', loading: true });

    axios.post("http://192.168.31.237:8000/api/loginClient/",{
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