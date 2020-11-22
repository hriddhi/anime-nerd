import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import { SearchBar, Input, ThemeProvider, Icon } from 'react-native-elements';
import Home from './HomeComponent';
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Login from './LoginComponent'
import List from './ListComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'

const Stack = createStackNavigator();

import { connect } from 'react-redux';
import { updateSearch } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        search: state.search,
        access_token: state.auth.access_token
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSearch: (str, token) => dispatch(updateSearch(str, token))
})

class Main extends React.Component {

  state = {
    search: ''
  }

  searchRef = React.createRef();

  timer = null;

  componentDidMount() {
    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor('#17009c')
  }

  updateSearch = (search) => {
    this.setState({search})
    if(search.length > 2){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.updateSearch(search, this.props.access_token)
      }, 500);
    }
  }

  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
        <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)' } }}>
          <Stack.Navigator>
            { this.props.access_token ? <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'HOME', headerTitleStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-Bold' } }}/> : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> }
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Anime" component={Anime} options={{ headerTitle: 'ANIME', headerTitleStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-Bold' } }} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);