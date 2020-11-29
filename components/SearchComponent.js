import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ScrollView, View, Text, StatusBar, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, ListItem, Image, SearchBar, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime, updateSearch, updateSearchSuccess } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token,
  anime: state.anime
})

const mapDispatchToProps = dispatch => ({
  fetchAnime: (id, token) => dispatch(fetchAnime(id, token)),
  updateSearch: (str, token) => dispatch(updateSearch(str, token)),
  
})

class Search extends React.Component {

    viewAnime = (id) => {
      this.props.navigation.navigate('Anime', { id })
    }

    render() {
        return (
          <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
            <FlatList data={this.props.search.result} style={{ paddingVertical: 4 }}
              renderItem={({ item }) => (
              <TouchableOpacity key={item.node.id} activeOpacity={0.7} onPress={()=>this.viewAnime(item.node.id)}>
                <ListItem key={item.node.id} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.6)', height: 150, overflow: 'hidden' }} bottomDivider>
                  <Image source={{ uri: item.node.main_picture.medium }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 100, height: 150 }} />
                  <View style={{ height: '100%', paddingHorizontal: 0, paddingVertical: 4, width: '65%'}}>
                    <Text style={{ flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-Bold'}}>{item.node.title}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>{l.node.start_date} - {item.node.end_date}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>Score {l.node.mean} | {item.node.media_type.toUpperCase()} {item.node.num_episodes}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <Text style={{ fontSize: 14, fontFamily: 'SpaceGrotesk-Medium' }} numberOfLines={2}>{item.node.synopsis}</Text>
                    </View>
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()} 
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: Math.round(Dimensions.get('window').height) - 150  }}>
                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Type something to search</Text>
              </View>
            }/>
          </LinearGradient>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);