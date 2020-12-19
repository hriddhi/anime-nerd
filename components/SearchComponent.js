import React from 'react';
import { FlatList, Dimensions, TextInput, View, StatusBar, Text, TouchableOpacity, ActivityIndicator, Keyboard, ToastAndroid } from 'react-native';
import { ListItem, Image, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime, updateSearch, updateSearchSuccess, addPreviousSearch, clearPreviousSearch } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import Moment from 'moment'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token,
  anime: state.anime,
  theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
  fetchAnime: (id, token) => dispatch(fetchAnime(id, token)),
  updateSearch: (str) => dispatch(updateSearch(str)),
  updateSearchSuccess: (res) => dispatch(updateSearchSuccess(res)),
  addPreviousSearch: (str) => dispatch(addPreviousSearch(str))
})

const placeholder = 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg'

class Search extends React.Component {

    viewAnime = (id,title) => {
      Keyboard.dismiss()
      this.props.navigation.navigate('Anime', { id })
      this.props.addPreviousSearch({ id, title })
    }

    state = {
      search: null
    }

    componentWillUnmount() {
      this.props.updateSearchSuccess([])
    }
  
    timer = null;
  
    updateSearch = (search) => {
      this.setState({ search })
      search.length === 0 ? this.props.updateSearchSuccess([]) : null
    }

    render() {
        Moment.locale('en')
        return (
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: this.props.theme[this.props.theme.current].home.card, paddingTop: StatusBar.currentHeight }}>
              <View style={{ flexGrow: 1, justifyContent: 'center', padding: 4 }} >
                <Icon 
                  name="arrow-left" 
                  type='font-awesome-5' 
                  size={18} 
                  color={this.props.theme[this.props.theme.current].home.text}
                  onPress={()=>this.props.navigation.pop()} 
                />
              </View>
              <View style={{ flexDirection: 'row', width: '75%', backgroundColor: this.props.theme[this.props.theme.current].home.card, margin: 6, borderRadius: 4 }} >
                <TextInput
                  autoFocus
                  placeholder='Search Anime' 
                  placeholderTextColor='grey'
                  defaultValue={this.state.search}
                  returnKeyType='search'
                  onChangeText={this.updateSearch}
                  onSubmitEditing={(e) => this.props.updateSearch(e.nativeEvent.text)}
                  style={{ width: '90%', height: 34, padding: 8, textAlignVertical: 'center', color: this.props.theme[this.props.theme.current].home.text, fontFamily: 'SpaceGrotesk-Medium' }}
                />
                <View style={{ flexGrow: 1, justifyContent: 'center', display: this.props.search.isLoading ? 'flex' : 'none' }}>
                  <ActivityIndicator size='small' color={this.props.theme[this.props.theme.current].home.text}  />
                </View>
              </View>
              <View style={{ flexGrow: 1, justifyContent: 'center', padding: 4 }}>
                <Icon 
                  name="filter" 
                  type='font-awesome-5' 
                  size={16} 
                  color={this.props.theme[this.props.theme.current].home.text}
                  onPress={()=> console.log('pressed')} 
                />
              </View>
            </View>
            <FlatList data={this.props.search.result.filter((val) => val.rated !== 'Rx' )} contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 8 }} keyboardShouldPersistTaps='handled'
              keyboardDismissMode='on-drag' renderItem={({ item }) => (
              <TouchableOpacity key={item.mal_id} activeOpacity={0.7} onPress={()=>this.viewAnime(item.mal_id, item.title)}>
                <ListItem containerStyle={{ padding: 0, marginVertical: 4, borderRadius: 10, backgroundColor: this.props.theme[this.props.theme.current].home.card, height: 120, overflow: 'hidden' }}>
                  <Image source={{ uri: item.image_url ? item.image_url : placeholder }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ flex: 1, width: 85 }} />
                  <View style={{ flex: 1, height: '100%', paddingRight: 4, paddingVertical: 4 }}>
                    <Text numberOfLines={2} style={{ flexShrink: 1, fontSize: 14, color: this.props.theme[this.props.theme.current].home.text, fontFamily: 'SpaceGrotesk-SemiBold'}}>{item.title}</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>  
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].home.card, color: this.props.theme[this.props.theme.current].home.text, borderRadius: 50}}>{item.episodes} EPS</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].home.card, color: this.props.theme[this.props.theme.current].home.text, borderRadius: 50}}>SCORE {item.score}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].home.card, color: this.props.theme[this.props.theme.current].home.text, borderRadius: 50}}>{item.type.toUpperCase()}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].home.card, color: this.props.theme[this.props.theme.current].home.text, borderRadius: 50}}>{item.rated}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].home.card, color: this.props.theme[this.props.theme.current].home.text, borderRadius: 50}}>{Moment(item.start_date).format('ll').toUpperCase()} - {Moment(item.end_date).format('ll').toUpperCase()}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <Text numberOfLines={2} style={{ color: this.props.theme[this.props.theme.current].home.text, fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4 }}>{item.synopsis}</Text>
                    </View>
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()} 
            ListEmptyComponent={
              <FlatList data={this.props.search.previous_search} contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 0, marginHorizontal: 0 }}
                  renderItem={({ item }) => {
                    if(this.state.search === null || this.state.search.length === 0 || item.title.toLowerCase().includes(this.state.search.toLowerCase())){
                      return (
                        <View style={{ flexDirection: 'row', height: 42, backgroundColor: 'transparent' }}>
                          <View style={{ paddingRight: 4, flexGrow: 1, justifyContent: 'center' }} >
                            <Icon 
                              name="history" 
                              type='font-awesome-5' 
                              size={18} 
                              color={this.props.theme[this.props.theme.current].home.top_tab_text_color}
                            />
                          </View>
                          <View style={{ height: '100%', width: '80%', paddingHorizontal: 8, justifyContent: 'center' }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.push('Anime', { id: item.id })}>
                              <Text numberOfLines={1} style={{ textAlignVertical: 'center', height: '100%', fontSize: 14, fontFamily: 'SpaceGrotesk-SemiBold', color: this.props.theme[this.props.theme.current].home.top_tab_text_color }} >{item.title}</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexGrow: 1, justifyContent: 'center' }} >
                            <Button icon={<Icon name="pencil-alt" type='font-awesome-5' size={16} color={this.props.theme[this.props.theme.current].home.top_tab_text_color}/>} 
                              type='outline' 
                              titleStyle={{color: this.props.theme[this.props.theme.current].home.top_tab_text_color }}
                              buttonStyle={{ borderWidth: 0, borderRadius: 20, paddingHorizontal: 1 }}
                              onPress={() => this.setState({ search: item.title })}
                            />
                          </View>
                        </View>
                      )
                    } else {
                      return null
                    }
                  }
                }
                keyExtractor={(item, index) => index.toString()} 
                ListEmptyComponent={
                  <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: Math.round(Dimensions.get('window').height) - 150  }}>
                    <Icon name="search" type='font-awesome-5' size={60} color='rgba(255,255,255,0.7)' />
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.7)', fontSize: 16, paddingVertical: 8, alignSelf: 'center' }}>Your search history will appear here</Text>
                  </View>
                }
              />
            }
              
          />
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);