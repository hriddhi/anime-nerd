import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { changeTheme } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = (state) => ({
  theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    changeTheme: (theme) => dispatch(changeTheme(theme)),
})

const themes = ['default', 'dark', 'sparkle', 'night_sky', 'old_autumn']

class Theme extends React.Component {
  render() {
    return (
      <View>
        <ListItem containerStyle={{ backgroundColor: 'transparent', borderColor: 'grey', height: 124, padding: 0 }} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold', paddingHorizontal: 16, paddingBottom: 8 }}>Choose Theme</ListItem.Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                themes.map(val => (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{ padding: 2, borderRadius: 33, borderWidth: 3, borderColor: this.props.theme.current === val ? '#000' : 'transparent' }}>
                        <TouchableOpacity onPress={() => this.props.changeTheme(val)} style={{ borderRadius: 25, overflow: 'hidden' }}>
                          <LinearGradient colors={this.props.theme[val].home.linear_background}>
                            <View style={{ width: 50, height: 50, backgroundColor: 'transparent' }}></View>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                      <Text style={{ fontSize: 12, color: '#000', fontFamily: 'SpaceGrotesk-SemiBold', backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 8, paddingVertical: 0, borderRadius: 10, marginVertical: 8 }}>{val.replace('_',' ').toUpperCase()}</Text>
                    </View>
                  </View>  
                ))
              }
              
            </ScrollView>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={{ backgroundColor: 'transparent', borderColor: 'grey' }} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold' }}>Anime Image background</ListItem.Title>
            <ListItem.Subtitle style={{ fontFamily: 'SpaceGrotesk-Regular' }}>Toggle Anime Image background</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)