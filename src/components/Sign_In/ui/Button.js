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
    width:w / 2,
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 15,
  },
  buttonText:{
    textAlign: 'center',
    color: 'grey',
    fontSize: 20,
  },
};

export {Button}