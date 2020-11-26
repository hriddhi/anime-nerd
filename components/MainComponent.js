import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Setting from './SettingComponent'
import Tab from './TabComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux';
import { updateSearch } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        search: state.search,
        access_token: state.auth.access_token,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSearch: (str, token) => dispatch(updateSearch(str, token))
})

const BottomTab = createMaterialBottomTabNavigator();

class Main extends React.Component {

  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
        <StatusBar backgroundColor='#17009c' />
        <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)', labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' } } }}>
          <BottomTab.Navigator activeColor='#fff' inactiveColor='grey' barStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
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
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);