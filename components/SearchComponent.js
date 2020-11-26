import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, ListItem, Image, SearchBar, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime, updateSearch } from '../redux/ActionCreator'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token,
  anime: state.anime
})

const mapDispatchToProps = dispatch => ({
  fetchAnime: (id, token) => dispatch(fetchAnime(id, token)),
  updateSearch: (str, token) => dispatch(updateSearch(str, token))
})

class Search extends React.Component {

  state = {
    search: ''
  }

  timer = null;

  updateSearch = (search) => {
    this.setState({search})
    if(search.length > 2){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.updateSearch(search, this.props.token)
      }, 250);
    }
  }

    viewAnime = (id) => {
      this.props.navigation.navigate('Anime', { id })
    }

    render() {
        return (
            <ScrollView style={{ paddingVertical: 4 }}>
              { this.props.search.visible ? 
                this.props.search.result.map((l, i) => (
                  <TouchableOpacity activeOpacity={0.7} key={i} onPress={()=>this.viewAnime(l.node.id)}>
                    <ListItem key={i} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.6)', height: 150 }} bottomDivider>
                      <Image source={{ uri: l.node.main_picture.medium }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 100, height: 150, borderRadius: 10 }} />
                      <View style={{ height: '100%', paddingHorizontal: 0, paddingVertical: 4, width: '65%'}}>
                        <Text style={{ flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-Bold'}}>{l.node.title}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>{l.node.start_date} - {l.node.end_date}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>Score {l.node.mean} | {l.node.media_type.toUpperCase()} {l.node.num_episodes}</Text>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                          <Text style={{ fontSize: 14, fontFamily: 'SpaceGrotesk-SemiBold' }} numberOfLines={2}>{l.node.synopsis}</Text>
                        </View>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                )) 
                : null
              }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);