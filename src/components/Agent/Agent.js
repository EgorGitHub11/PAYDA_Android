import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, Image} from 'react-native';

import Header from '../uikit/Header'

import {w,h} from '../../constants'

import axios from 'axios'

export default class Agent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pk:'',
        name:'',
        jwt:'',
        nameAgent: '',
        phoneAgent: '',
        emailAgent: '',
    };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {pk,name,access_token} = dataJson
            this.setState(prevState => ({
              pk: prevState.pk + pk,
              name: prevState.name + name,
              jwt: prevState.jwt + access_token
            }))
            console.log('I am in showData' + ' ' + this.state.pk)
            return dataJson
        }
    } catch (error) {
        console.log(error)
    }
    }
    this.showData().then(() => this.getData())
  }

  getData(){
    const {pk,jwt,arrAgent} = this.state
    const url = `http://192.168.31.237:8000/api/myAgent/${pk}/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
          console.log(response.data)
          this.setState({nameAgent: response.data.full_name})
          this.setState({emailAgent: response.data.email})
          this.setState({phoneAgent: response.data.phone})
          console.log(arr + ' ' + 'cool')
      })
  }

  render() {
    const {childMainContainer, mainContainer,notiffy, 
        notifyInside, notifyInsideInfText, notifyInsideBlock,
        notifyText,notifyDateAndFromWho, logo, imgBlock,textBlock,text} = styles

        const {nameAgent,phoneAgent,emailAgent} = this.state
    return (
        <View style={mainContainer}>
        <Header navigation={this.props.navigation} name={'МОЙ АГЕНТ'}/>
       <View style={childMainContainer}>
           <View style={imgBlock}>
                <Image style={logo} source={require('../../logo/agent.png')}/>
           </View>
           <View style={textBlock}>
                <Text style={text}>Имя: {nameAgent}</Text>
                <Text style={text}>Email: {emailAgent}</Text>
                <Text style={text}>Телефон: {phoneAgent}</Text>
           </View>
       </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  childMainContainer:{
    flex:1,
    width:w,
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent: 'center',
    flexWrap:'wrap'
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  logo:{
    width: w,
    height: h / 7,
    resizeMode: 'contain',
    margin: 'auto',
},
imgBlock:{
flex:5,
backgroundColor:'#fff',
justifyContent:'center',
alignItems:'center',
borderBottomWidth: 1,
borderColor:'grey'
},
textBlock:{
flex:3,
justifyContent:'center',
alignItems:'flex-start',
fontSize:24
},
text:{
    fontSize:24,
    margin:10
}
});