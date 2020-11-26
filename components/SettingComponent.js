import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Pressable } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'

const Stack = createStackNavigator();

const list = [
  {
    name: 'Theme',
    subtitle: 'Change theme'
  }
]

class Theme extends React.Component {
  render() {
    return (
      <View>
        <Text>Choose Theme</Text>
      </View>
    )
  }
}

class List extends React.Component {
  render() {
    return (
      list.map((l, i) => (
        <Pressable key={i} onPressOut={()=>this.props.navigation.navigate(l)} style={{ borderRadius: 20 }} android_ripple={{ color: 'rgba(168, 168, 168)' }}>
          <ListItem containerStyle={{ backgroundColor: 'transparent', borderColor: 'grey' }} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold' }}>{l.name}</ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: 'SpaceGrotesk-Regular' }}>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Pressable>
      ))
    )
  }
}

class Setting extends React.Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center' }}>
        <Icon name='cogs' size={80} type='font-awesome' color='#fff' containerStyle={{ paddingVertical: 8, backgroundColor: 'transparent' }}/>
        <Text style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 26, color: '#fff', marginVertical: 8 }}>SETTING</Text>

        <View style={{ flex: 1, height: 400, width: '95%', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 20, overflow: 'hidden' }}>
        <Stack.Navigator>
          <Stack.Screen name="List" component={List} options={{ headerShown: false  }}/>
          <Stack.Screen name="Theme" component={Theme} options={{ headerShown: true, headerTitleContainerStyle: { marginLeft: -16 }, headerTitleStyle: { fontFamily: 'SpaceGrotesk-Bold' }  }}/>
        </Stack.Navigator>
        
        </View>
      </View>
    )
  }
}

export default Setting