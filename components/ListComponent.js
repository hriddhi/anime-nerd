import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, Image as Image1 } from 'react-native';
import { Avatar, ListItem, Image, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getToken, fetchUserAnime, fetchAnime } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    token: state.auth.access_token,
    anime: state.anime
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchUserAnime: (type, token) => dispatch(fetchUserAnime(type, token)),
    fetchAnime: (id, token) => dispatch(fetchAnime(id, token))
})

class List extends React.Component {

    state = {
      refreshing: false
    }

    componentDidMount() {
        switch(this.props.type){
          case 'watching':
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            break

          case 'plan_to_watch':
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            break

          case 'on_hold':
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            break

          case 'dropped':
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            break

          case 'completed':
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            break
      }
    }

    onRefresh = () => {
      this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
    }

    viewAnime = (id) => {
      if(id !== this.props.anime.id)
        this.props.fetchAnime(id, this.props.token)
      this.props.navigation.navigate('Anime')
    }

    render() {
        var data = this.props.list[this.props.type]
        if(!this.props.list[this.props.type] && this.props.list.isLoading[this.props.type])
          return (
              <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
          );
        else if(data && data.data.length === 0){
          return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Image1 resizeMode='contain' source={require('./Cat_icon_white.png')} style={{width: 180, height: 180, alignSelf: 'center'}}/>
                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>*Nyan* Your list is empty</Text>
              </View>
            </View>
          )
        }
        else
          return (
            <ScrollView style={{paddingVertical: 4, backgroundColor: 'transparent'}} refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={ (Boolean)(this.props.list.isLoading[this.props.type] && this.props.list[this.props.type]) } />}>
              { this.props.list.visible[this.props.type] ? 
                data.data.map((l, i) => (
                  <TouchableOpacity activeOpacity={0.7} key={i} onPress={()=>this.viewAnime(l.node.id)}>
                    <ListItem key={i} containerStyle={{height:120, padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.6)' }} bottomDivider>
                      <Image source={{ uri: l.node.main_picture.medium }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 80, height: 120, borderRadius: 10 }} />
                      <View style={{ height: '100%', paddingRight: 16, paddingVertical: 8, flex: 1 }}>
                        <Text style={{ flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-SemiBold', width: '100%'}}>{l.node.title}</Text>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                          <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', paddingBottom: 4, fontSize: 12}}>{l.node.my_list_status.num_episodes_watched +  ' / ' + l.node.num_episodes}</Text>
                              </View>
                              <View style={{flexDirection: 'column-reverse'}}>
                                <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', paddingBottom: 4, fontSize: 12}}>{l.node.my_list_status.score} <Icon name='star' type='font-awesome' color='#000' size={10}/></Text>
                              </View>
                            </View>

                              <Progress.Bar width={null} progress={l.node.my_list_status.num_episodes_watched / l.node.num_episodes} borderColor='rgba(0,0,0,0.6)' color='rgba(0,0,0,0.4)' />

                          </View>
                        </View>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                )) 
                : null
              }
            </ScrollView>
          
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'transparent'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);