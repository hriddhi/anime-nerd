import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Pressable, Alert } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

class Setting extends React.Component {

  createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to logout of MAL?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Logout", onPress: () => this.props.logout() }
      ],
      { cancelable: false }
    );

  render() {

    var list = [
      {
        name: 'Theme',
        subtitle: 'Change theme',
        func: () => this.props.navigation.navigate('Theme')
      },
      {
        name: 'Version 0.0.8',
        subtitle: 'You are using an alpha version of Anime Nerd and may encounter some (un)expected issues',
        func: null
      }
    ]

    if(this.props.access_token)
      list.push({
        name: 'Logout',
        subtitle: 'Logout of MyAnimeList',
        func: this.createTwoButtonAlert
      })

    return (
      <View style={{flex: 1, alignItems: 'center' }}>
        <Header
          centerComponent={ <Text style={{ color: this.props.theme[this.props.theme.current].setting.header_text_color, fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>SETTINGS</Text> }
          centerContainerStyle={{ paddingHorizontal: 8 }}
          containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
          placement='left'
        />
        <View style={{ flex: 1, width: '95%', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, overflow: 'hidden', marginBottom: 4 }}>
          {
            list.map((l, i) => (
              <Pressable key={i} onPressOut={l.func} style={{ borderRadius: 20 }} android_ripple={{ color: 'rgba(168, 168, 168)' }}>
                <ListItem containerStyle={{ backgroundColor: 'transparent', borderColor: 'grey' }} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold' }}>{l.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontFamily: 'SpaceGrotesk-Regular' }}>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
            ))
          }
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)