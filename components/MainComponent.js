import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import Search from './SearchComponent';
import Anime from './AnimeComponent'
import Web from './WebViewComponent'
import Tab from './TabComponent'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens'
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  theme: state.options.ui
})

const Stack = createStackNavigator();

class Main extends React.Component {

  componentDidMount(){
    SplashScreen.hide();
    if(this.props.theme.current === 'sparkle')
      StatusBar.setBarStyle('dark-content')
    else
      StatusBar.setBarStyle('light-content')
  }

  componentDidUpdate(){
    if(this.props.theme.current === 'sparkle')
      StatusBar.setBarStyle('dark-content')
    else
      StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={this.props.theme[this.props.theme.current].home.linear_background}>
        <NavigationContainer theme={{ colors: { background: 'rgba(0,0,0,0)', labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' } } }}>
          <Stack.Navigator>
            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }}/>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Anime" component={Anime} options={{ headerShown: false }} />
            <Stack.Screen name="Web" component={Web} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps)(Main)