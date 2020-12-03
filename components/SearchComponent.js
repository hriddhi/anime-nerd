import React from 'react';
import { FlatList, Dimensions, View, Text, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { ListItem, Image, Header, SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime, updateSearch, updateSearchSuccess, addPreviousSearch, clearPreviousSearch } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import Moment from 'moment'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token,
  anime: state.anime
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
      search: '',
      show: false
    }

    searchRef = React.createRef

    componentDidMount() {
      this.searchRef.focus()
    }

    componentWillUnmount() {
      this.props.updateSearchSuccess([])
    }
  
    timer = null;
  
    updateSearch = (search) => {
      this.setState({ search, show: true })
      if(search.length > 2){
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.props.updateSearch(search)
        }, 500);
      }
    }

    render() {
        Moment.locale('en')
        return (
          <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
            <Header
              leftContainerStyle={{ display: 'none' }}
              centerComponent={<SearchBar ref={search => this.searchRef = search} round={true} onChangeText={this.updateSearch} value={this.state.search} placeholder='Search Anime' inputStyle={{ fontFamily: 'SpaceGrotesk-Medium' }} platform='android' leftIcon={{ color: '#fff' }} containerStyle={{ backgroundColor: 'transparent' }} showLoading={this.props.search.isLoading} loadingProps={{color: '#000'}} onClear={ () => this.props.updateSearchSuccess([]) } />}
              rightContainerStyle={{ display: 'none' }}
              containerStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderBottomWidth: 0 }}
            />
            <FlatList data={this.state.show ? this.props.search.result : []} contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 8 }} keyboardShouldPersistTaps='handled'
              keyboardDismissMode='on-drag' renderItem={({ item }) => (
              <TouchableOpacity key={item.mal_id} activeOpacity={0.7} onPress={()=>this.viewAnime(item.mal_id, item.title)}>
                <ListItem containerStyle={{ padding: 0, marginVertical: 4, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.8)', height: 120, overflow: 'hidden' }}>
                  <Image source={{ uri: item.image_url ? item.image_url : placeholder }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ flex: 1, width: 85 }} />
                  <View style={{ flex: 1, height: '100%', paddingRight: 4, paddingVertical: 4 }}>
                    <Text numberOfLines={2} style={{ flexShrink: 1, fontSize: 14, fontFamily: 'SpaceGrotesk-SemiBold'}}>{item.title}</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>  
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{item.episodes} EPS</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>SCORE {item.score}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{item.type.toUpperCase()}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{item.rated}</Text>
                      <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{Moment(item.start_date).format('ll').toUpperCase()} - {Moment(item.end_date).format('ll').toUpperCase()}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <Text numberOfLines={2} style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4 }}>{item.synopsis}</Text>
                    </View>
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()} 
            ListEmptyComponent={
              <FlatList data={this.props.search.previous_search} contentContainerStyle={{ paddingVertical: 4, paddingHorizontal: 4, marginHorizontal: 0 }}
                  renderItem={({ item }) => (
                  <TouchableOpacity key={item.mal_id} activeOpacity={0.4} onPress={() => this.updateSearch(item.title)}>
                    <ListItem containerStyle={{ paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'transparent' }} bottomDivider>
                      <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 14, fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)' }}>{item.title}</Text>
                    </ListItem>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()} 
                ListEmptyComponent={
                  <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: Math.round(Dimensions.get('window').height) - 150  }}>
                    <Icon name="search" type='font-awesome-5' size={60} color='rgba(255,255,255,0.7)' />
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.7)', fontSize: 16, paddingVertical: 8, alignSelf: 'center' }}>Type something to search</Text>
                  </View>
                }
              />
            }
              
          />
        </LinearGradient>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);