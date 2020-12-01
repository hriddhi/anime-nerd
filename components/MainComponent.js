import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Setting from './SettingComponent'
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Web from './WebViewComponent'
import Tab from './TabComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'

enableScreens()
const Stack = createNativeStackNavigator();

class Main extends React.Component {

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      
      <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
        <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)', labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' } } }}>
          <Stack.Navigator>
            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false, stackAnimation: 'none' }}/>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false, stackAnimation: 'fade' }} />
            <Stack.Screen name="Anime" component={Anime} options={{ headerShown: false, stackAnimation: 'fade' }} />
            <Stack.Screen name="Web" component={Web} options={{ headerShown: false, stackAnimation: 'fade' }} />
          </Stack.Navigator>
      </NavigationContainer>
      </LinearGradient>
        
      
   
    );
  }
}

export default Main;