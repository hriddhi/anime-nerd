import React from 'react';
import { FlatList, Dimensions, View, Text, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { ListItem, Image, Header, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime, updateSearch } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import Moment from 'moment'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token,
  anime: state.anime
})

const mapDispatchToProps = dispatch => ({
  fetchAnime: (id, token) => dispatch(fetchAnime(id, token)),
  updateSearch: (str, token) => dispatch(updateSearch(str, token)),
  
})

const placeholder = 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg'

class Search extends React.Component {

    viewAnime = (id) => {
      Keyboard.dismiss()
      this.props.navigation.navigate('Anime', { id })
    }

    state = {
      search: ''
    }

    searchRef = React.createRef

    componentDidMount() {
      //console.log('mounting')
      this.searchRef.focus()
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

    render() {
        Moment.locale('en')
        return (
          <LinearGradient style={{flex: 1}} colors={['#17009c','#5c007a']}>
            <Header
              leftContainerStyle={{ display: 'none' }}
              centerComponent={<SearchBar ref={search => this.searchRef = search} round={true} onChangeText={this.updateSearch} value={this.state.search} placeholder='Search Anime' inputStyle={{ fontFamily: 'SpaceGrotesk-Medium' }} platform='android' leftIcon={{ color: '#fff' }} containerStyle={{ backgroundColor: 'transparent' }} showLoading={this.props.search.isLoading} loadingProps={{color: '#000'}} />}
              centerContainerStyle={{ paddingHorizontal: 8 }}
              rightContainerStyle={{ display: 'none' }}
              containerStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderBottomWidth: 0 }}
            />
            <FlatList data={this.props.search.result} style={{ paddingVertical: 4 }} keyboardShouldPersistTaps='handled'
              renderItem={({ item }) => (
              <TouchableOpacity key={item.node.id} activeOpacity={0.7} onPress={()=>this.viewAnime(item.node.id)}>
                <ListItem key={item.node.id} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.6)', height: 130, overflow: 'hidden' }} bottomDivider>
                  <Image source={{ uri: item.node.main_picture ? item.node.main_picture.medium : placeholder }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 90, height: 130 }} />
                  <View style={{ flex: 1, height: '100%', paddingRight: 4, paddingVertical: 4 }}>
                    <Text numberOfLines={2} style={{ flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-SemiBold'}}>{item.node.title}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>{Moment(item.node.start_date).format('LL')} - {Moment(item.node.end_date).format('LL')}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold' }}>Score {item.node.mean} | {item.node.media_type.toUpperCase()} {item.node.num_episodes}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-Medium' }} numberOfLines={2}>{item.node.synopsis}</Text>
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