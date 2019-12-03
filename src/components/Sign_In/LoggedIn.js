import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from './ui';
import axios from 'axios';

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      username: '',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'Authorization': 'Token ' + this.props.jwt
    };
    axios({
      method: 'GET',
      url: 'http://192.168.31.237:8000/api/loginClient/',
      headers: headers,
    }).then((response) => {
      console.log('Data: ' + response.data)
      alert('DATA: ' + response.da)
      this.setState({
        username: response.data.username,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  
  render() {
    const { container, usernameText, errorText } = styles;
    const { loading, username, error } = this.state;

    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(
          <View style={container}>
            <View>
              {username ?
                <Text style={usernameText}>
                  Your username: {username}
                </Text>
                :
                <Text style={errorText}>
                  {error}
                </Text>}
            </View>
            <Button onPress={this.props.deleteJWT}>
              Log Out
            </Button>
          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  usernameText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};