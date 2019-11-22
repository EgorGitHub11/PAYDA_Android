import {Dimensions,StyleSheet} from 'react-native'

const win = Dimensions.get('window')
export const w = win.width;
export const h = win.height;

export const stylesText = StyleSheet.create({
    h1_L:{
       fontSize:30,
       color: '#000',
    },
    h1:{
        fontSize:20,
        color:'#000'
    }
});