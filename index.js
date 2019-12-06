import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/components/SplashScreen/index'
// import App from './src/screens/screen1/uiCreateDetails/UiDetails'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
