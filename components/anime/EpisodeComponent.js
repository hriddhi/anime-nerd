import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeEpisodes } from '../../redux/ActionCreator'
import Moment from 'moment'

const mapStateToProps = state => ({
    episode: state.episode
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeEpisodes: (id, token) => dispatch(fetchAnimeEpisodes(id, token))
})

class Episode extends React.PureComponent {

    componentDidMount(){
        if(this.props.episode[this.props.id] === undefined)
            this.props.fetchAnimeEpisodes(this.props.id)
    }

    render(){
        
        Moment.locale('en') 
                
        if(this.props.episode[this.props.id] && this.props.episode[this.props.id].err){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                </View>
            )
        } else if(this.props.episode[this.props.id] && this.props.episode[this.props.id].isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Episodes...</Text>
                </View>
            )
        } else if(this.props.episode[this.props.id]) {
            return (
                <FlatList data={this.props.episode[this.props.id].episodes} 
                    renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('Web', { uri: item.forum_url })}>
                    <ListItem key={index} containerStyle={{height: 80, padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: 70, height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 22, fontFamily: 'SpaceGrotesk-SemiBold' }}>#{item.episode_id}</Text>
                        </View>
                        <View style={{ height: '100%', paddingRight: 16, paddingVertical: 8, flex: 1 }}>
                            <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-SemiBold', width: '100%'}}>{item.title}</Text>
                            <Text style={{ flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', width: '100%'}}>{item.title_japanese}</Text>
                            <Text style={{ marginTop: 8, flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', width: '100%'}}>{ 'Aired On: ' + (item.aired ? Moment(item.aired).format('LLL') : 'Not Available') }</Text>
                        </View>
                    </ListItem>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()} 
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No episodes found</Text>
                        </View>
                    }
                />
            )
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episode)