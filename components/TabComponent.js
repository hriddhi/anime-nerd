import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Home from './HomeComponent';
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Setting from './SettingComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import LinearGradient from 'react-native-linear-gradient'

enableScreens()
const Stack = createNativeStackNavigator();

import { connect } from 'react-redux';
import { updateSearch, updateSearchSuccess } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        search: state.search,
        access_token: state.auth.access_token,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSearch: (str, token) => dispatch(updateSearch(str, token)),
    updateSearchSuccess: (res) => dispatch(updateSearchSuccess(res))
})

class Tab extends React.Component {

  


  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
        
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false, stackAnimation: 'none' }}/>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false, stackAnimation: 'fade' }} />
            <Stack.Screen name="Anime" component={Anime} options={{ headerShown: false, stackAnimation: 'fade' }} />
          </Stack.Navigator>
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);