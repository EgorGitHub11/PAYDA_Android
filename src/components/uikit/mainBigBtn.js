import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {w,h} from '../../constants'

const mainBigBtn = ({ onPress, children }) => {
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
      width:w,
      marginTop: 10,
      backgroundColor:'#F03C49',
      paddingVertical: 15,
    },
    buttonText:{
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
    },
  };
  
  export default mainBigBtn
