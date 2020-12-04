import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Pressable, Alert } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import List from './SettingListComponent'
import Theme from './ThemeComponent'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    theme: state.options.ui
})

const Stack = createStackNavigator();

class Setting extends React.Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center' }}>
        <Header
          centerComponent={ <Text style={{ color: this.props.theme[this.props.theme.current].setting.header_text_color, fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>SETTINGS</Text> }
          centerContainerStyle={{ paddingHorizontal: 8 }}
          containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
          placement='left'
        />
        <View style={{ flex: 1, width: '95%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, overflow: 'hidden', marginBottom: 4 }}>
          <Stack.Navigator>
            <Stack.Screen name="List" component={List} options={{ headerShown: false  }}/>
            <Stack.Screen name="Theme" component={Theme} options={{ headerShown: true, headerTitleContainerStyle: { marginLeft: -16 }, headerTitleStyle: { fontFamily: 'SpaceGrotesk-Bold' } }}/>
          </Stack.Navigator>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Setting)