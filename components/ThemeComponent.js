import React, { useRef, useEffect } from 'react';
import { Switch, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { changeTheme, toggleImageBackground } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = (state) => ({
  theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    changeTheme: (theme) => dispatch(changeTheme(theme)),
    toggleImageBackground: () => dispatch(toggleImageBackground())
})

const themes = ['default', 'dark', 'sparkle', 'night_sky', 'old_autumn']

class Theme extends React.Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    this.props.navigation.addListener('transitionEnd', e => {
      if(!e.data.closing)
        this.setState({ loaded: true })
    })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center' }}>
        <Header
          leftComponent={<Icon name="arrow-left" type='font-awesome-5' size={18} color={this.props.theme[this.props.theme.current].anime.header_text_color} style={{ padding: 24 }} onPress={()=>this.props.navigation.pop()} />}
          leftContainerStyle={{ paddingHorizontal: 8 }}
          centerComponent={<Text style={{ color: this.props.theme[this.props.theme.current].anime.header_text_color, textAlign: 'left', fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 20 }}>THEME</Text>}
          centerContainerStyle={{ padding: 0, margin: 0 }}
          containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
          placement='left'
        />
        <View style={{ flex: 1, width: '95%', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, overflow: 'hidden', marginBottom: 4 }}>
          {
            (() => {
              if(!this.state.loaded)
                return (
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                      <ActivityIndicator size='large' color='#000'/>
                  </View>
                )
              
              return (
                <React.Fragment>
                  <ListItem containerStyle={{ backgroundColor: 'transparent', borderColor: 'grey', height: 160, marginHorizontal: -16 }} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold', paddingHorizontal: 16 }}>Choose Theme</ListItem.Title>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                          themes.map((val,i) => (
                            <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
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
                    <ListItem.Content style={{ flexGrow: 6 }}>
                      <ListItem.Title style={{ fontFamily: 'SpaceGrotesk-Bold' }}>Anime Image background</ListItem.Title>
                      <ListItem.Subtitle style={{ fontFamily: 'SpaceGrotesk-Regular' }}>Toggle Anime Image background</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content style={{ flexGrow: 1 }}>
                      <Switch
                        trackColor={{ false: "#767577", true: "#143591" }}
                        thumbColor={ this.props.theme.image_background ? "#1f5aff" : "#f4f3f4" }
                        onValueChange={() => this.props.toggleImageBackground() }
                        value={ this.props.theme.image_background }
                      />
                    </ListItem.Content>
                  </ListItem>
                </React.Fragment>
              )
            })()
          }
        
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)