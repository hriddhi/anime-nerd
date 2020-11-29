import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Setting from './SettingComponent'
import Tab from './TabComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from 'react-native-splash-screen'

const BottomTab = createMaterialBottomTabNavigator();

class Main extends React.Component {

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
     
      
        
        <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)', labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' } } }}>
          <BottomTab.Navigator activeColor='#fff' inactiveColor='grey' barStyle={{ backgroundColor: '#5c007a' }}>
            <BottomTab.Screen name="Home" 
              component={Tab}
              options={{ 
                tabBarLabel: <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>HOME</Text>,
                tabBarIcon: ({focused}) => <Icon name='home' size={ focused ? 24 : 22 } type='font-awesome' color={ focused ? '#fff' : 'grey' }/>
              }}
            />
            <BottomTab.Screen name="Settings" 
              component={Setting}
              options={{ 
                tabBarLabel: <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>SETTINGS</Text>,
                tabBarIcon: ({focused}) => <Icon name='gear' size={ focused ? 24 : 22 } type='font-awesome' color={ focused ? '#fff' : 'grey' }/>
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      
   
    );
  }
}

export default Main;