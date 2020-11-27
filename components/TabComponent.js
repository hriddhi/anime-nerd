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
import LinearGradient from 'react-native-linear-gradient'

const Stack = createStackNavigator();

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

class Tab extends React.Component {

  state = {
    search: ''
  }

  componentDidMount() {
    //this.searchRef.focus()
  }

  searchRef = React.createRef();

  searchFocus = () => {
    (this.searchRef)
  }

  timer = null;

  updateSearch = (search) => {
    this.setState({search})
    if(search.length > 2){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.updateSearch(search, this.props.access_token)
      }, 250);
    }
  }


  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'HOME', headerTitleStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-Bold' } }}/>
            <Stack.Screen name="Search" component={Search} options={{headerStyle: { backgroundColor: 'rgba(255,255,255,0.7)' }, headerRight: null, headerLeft: null, headerTitle: () => <SearchBar ref={search => this.searchRef = search} round={true} onChangeText={this.updateSearch} value={this.state.search} placeholder='Search Anime' inputStyle={{ fontFamily: 'SpaceGrotesk-Medium' }} platform='android' leftIcon={{ color: '#fff' }} containerStyle={{ backgroundColor: 'transparent' }} showLoading={this.props.search.isLoading} loadingProps={{color: '#000'}} /> }} />
            <Stack.Screen name="Anime" component={Anime} options={{ headerTransparent: true, headerTitle: 'ANIME', headerTintColor: '#fff', headerTitleStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-Bold' } }} />
          </Stack.Navigator>
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);