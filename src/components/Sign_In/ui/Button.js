import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {w,h} from '../../../constants'


const Button = ({ onPress, children }) => {
  const { button, buttonText } = styles;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onPress} style={button}>
        <Text style={buttonText}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button:{
    width:w / 2.5,
    height: h / 15,
    marginTop: 10,
    backgroundColor:'#2980b9',
    paddingVertical: 15,
    borderRadius: 30,
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
};

export {Button}