import React from 'react';
import { View, TextInput, Text } from 'react-native';
import {w,h} from '../../../constants'

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines }) => {
  const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={inputStyle}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    width:w,
    height: 40,
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    direction: 'rtl',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    color: '#000',
    paddingHorizontal: 10,
  }
};

export { Input };