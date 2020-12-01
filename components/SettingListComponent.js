import React from 'react';
import { Animated, Text, View, Pressable, Alert } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { logout } from '../redux/ActionCreator'

const mapStateToProps = (state) => ({
    access_token: state.auth.access_token,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

class List extends React.Component {

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
      }
    ]

    if(this.props.access_token)
      list.push({
        name: 'Logout',
        subtitle: 'Logout of MyAnimeList',
        func: this.createTwoButtonAlert
      })

    return (
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)