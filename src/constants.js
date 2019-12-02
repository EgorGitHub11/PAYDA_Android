import {Dimensions,StyleSheet} from 'react-native'

const win = Dimensions.get('window')
export const w = win.width;
export const h = win.height;

export const stylesItemInbox = StyleSheet.create({
    mainContainer:{
        width:w,
        height: 70,
        marginBottom:3,
        paddingHorizontal: 10,
        backgroundColor: '#EEEFF3',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
      },
      text:{
        fontSize: 20,
        paddingLeft:5
      }
});
