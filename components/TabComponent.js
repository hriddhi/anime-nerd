import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Text } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Home from './HomeComponent';
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Web from './WebViewComponent'
import Setting from './SettingComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const BottomTab = createMaterialBottomTabNavigator();

import { connect } from 'react-redux';
import { updateSearch, updateSearchSuccess } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        search: state.search,
        access_token: state.auth.access_token,
        list: state.list,
        theme: state.options.ui
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSearch: (str, token) => dispatch(updateSearch(str, token)),
    updateSearchSuccess: (res) => dispatch(updateSearchSuccess(res))
})

class Tab extends React.Component {
  render() {
    return (
      //bottom_tab_color
          <BottomTab.Navigator activeColor={this.props.theme[this.props.theme.current].home.bottom_tab_color} inactiveColor='grey' barStyle={{ backgroundColor: this.props.theme[this.props.theme.current].home.bottom_tab_background }} >
            <BottomTab.Screen name="Home" 
              component={Home}
              options={{ 
                tabBarLabel: <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>HOME</Text>,
                tabBarIcon: ({focused}) => <Icon name='home' size={ focused ? 24 : 22 } type='font-awesome' color={ focused ? this.props.theme[this.props.theme.current].home.bottom_tab_color : 'grey' }/>,
              }}
            />
            <BottomTab.Screen name="Settings" 
              component={Setting}
              options={{ 
                tabBarLabel: <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>SETTINGS</Text>,
                tabBarIcon: ({focused}) => <Icon name='gear' size={ focused ? 24 : 22 } type='font-awesome' color={ focused ? this.props.theme[this.props.theme.current].home.bottom_tab_color : 'grey' }/>
              }}
            />
          </BottomTab.Navigator>
        
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);