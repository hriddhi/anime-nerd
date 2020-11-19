import 'react-native-gesture-handler';
import React from 'react';
import { SearchBar, Input, ThemeProvider } from 'react-native-elements';
import Home from './HomeComponent';
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Login from './LoginComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { connect } from 'react-redux';
import { updateSearch } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        search: state.search.search,
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

  timer = null;

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
        <NavigationContainer>
          <Stack.Navigator>
            { this.props.access_token ? <Stack.Screen name="Home" component={Home} /> : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> }
            <Stack.Screen name="Search" component={Search} options={{ headerLeft: null, headerTitle: () => <SearchBar round={true} onChangeText={this.updateSearch} value={this.state.search} placeholder='Search Anime' platform='android' containerStyle={{backgroundColor: 'transparent'}} /> }} />
            <Stack.Screen name="Anime" component={Anime} />
          </Stack.Navigator>
        </NavigationContainer>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);