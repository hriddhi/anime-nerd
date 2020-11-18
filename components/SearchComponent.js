import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime } from '../redux/ActionCreator'

const mapStateToProps = state => ({
  search: state.search,
  token: state.auth.access_token
})

const mapDispatchToProps = dispatch => ({
  fetchAnime: (id, token) => dispatch(fetchAnime(id, token))
})

class Search extends React.Component {

    viewAnime = (id) => {
      this.props.fetchAnime(id, this.props.token)
      this.props.navigation.navigate('Anime')
    }

    render() {
        return (  
            <ScrollView>
              { this.props.search.visible ? 
                this.props.search.result.map((l, i) => (
                  <TouchableOpacity key={i} onPress={()=>this.viewAnime(l.node.id)}>
                    <ListItem key={i} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10 }} bottomDivider>
                      <Image source={{ uri: l.node.main_picture.medium }} style={{ width: 100, height: 150, borderRadius: 10 }} />
                      <View style={{ height: '100%', padding: 8, width: '70%', flex: 1 }}>
                        <Text style={{ flexShrink: 1, fontWeight: 'bold', fontSize: 18}}>{l.node.title}</Text>
                        <Text>{l.node.start_date} - {l.node.end_date}</Text>
                        <Text>Score {l.node.mean} | {l.node.media_type.toUpperCase()} {l.node.num_episodes}</Text>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                          <Text numberOfLines={2}>{l.node.synopsis}</Text>
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