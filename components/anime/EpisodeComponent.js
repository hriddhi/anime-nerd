import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeEpisodes } from '../../redux/ActionCreator'
import Moment from 'moment'

const mapStateToProps = (state, props) => ({
    episode: state.episode[props.route.params.id],
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeEpisodes: (id, page) => dispatch(fetchAnimeEpisodes(id, page))
})

class Episode extends React.PureComponent {

    state = {
        page: 1
    }

    componentDidMount(){
        if(this.props.episode === undefined)
            this.props.fetchAnimeEpisodes(this.props.route.params.id, this.state.page)
    }

    componentDidUpdate(){
        if(this.props.episode && this.props.episode.current_page !== this.state.page)
            this.setState({ page: this.props.episode.current_page })
    }
    
    render(){
        
        Moment.locale('en') 
                
        if(this.props.episode && this.props.episode.err){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                </View>
            )
        } else if(this.props.episode && this.props.episode.episodes === null && this.props.episode.isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Episodes...</Text>
                </View>
            )
        } else if(this.props.episode && this.props.episode.episodes) {
            return (
                <FlatList data={this.props.episode.episodes} 
                    renderItem={({ item }) => (
                    <TouchableOpacity key={item.episode_id} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('Web', { uri: item.forum_url })}>
                        <ListItem key={item.episode_id} containerStyle={{height: 80, padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: this.props.theme[this.props.theme.current].anime.card, overflow: 'hidden' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: 70, height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 22, fontFamily: 'SpaceGrotesk-SemiBold' }}>#{item.episode_id}</Text>
                                { item.filler ? <Text style={{ fontSize: 9, fontFamily: 'SpaceGrotesk-Medium', marginVertical: 2, paddingHorizontal: 8, paddingVertical: 1, backgroundColor: this.props.theme[this.props.theme.current].anime.card, color: this.props.theme[this.props.theme.current].anime.text, borderRadius: 50}}>FILLER</Text>: null }
                                { item.recap ? <Text style={{ fontSize: 9, fontFamily: 'SpaceGrotesk-Medium', marginVertical: 2, paddingHorizontal: 8, paddingVertical: 1, backgroundColor: this.props.theme[this.props.theme.current].anime.card, color: this.props.theme[this.props.theme.current].anime.text, borderRadius: 50}}>RECAP</Text>: null }
                            </View>
                            <View style={{ height: '100%', paddingRight: 16, paddingVertical: 8, flex: 1 }}>
                                <Text numberOfLines={1} style={{ color: this.props.theme[this.props.theme.current].anime.text, flexShrink: 1, fontSize: 16, fontFamily: 'SpaceGrotesk-SemiBold', width: '100%'}}>{item.title}</Text>
                                <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', width: '100%'}}>{item.title_japanese}</Text>
                                <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, marginTop: 8, flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', width: '100%'}}>{ 'Aired On: ' + (item.aired ? Moment(item.aired).format('lll') : 'Not Available') }</Text>
                            </View>
                        </ListItem>
                    </TouchableOpacity>
                    )}
                    keyExtractor={item => item.episode_id.toString()} 
                    getItemLayout={(data, index) => (
                        {length: 88, offset: 88 * index, index}
                    )}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No episodes found</Text>
                        </View>
                    }
                    onEndReached={() => { 
                            !this.props.episode.isLoading 
                            && this.props.episode.episodes_last_page 
                            && this.props.episode.episodes_last_page !== this.state.page 
                            ? this.props.fetchAnimeEpisodes(this.props.route.params.id, this.state.page + 1) 
                            : null 
                        }
                    }
                    ListFooterComponent={
                        () => {
                            if(this.props.episode && this.props.episode.episodes && this.props.episode.episodes_last_page !== this.state.page)
                                return (
                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', padding: 16 }}>
                                        <ActivityIndicator color='#fff'/>
                                    </View>
                                )
                            else if(this.props.episode && this.props.episode.episodes && this.props.episode.episodes_last_page === this.state.page)
                                return (
                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                        <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>That's All!</Text>
                                    </View>
                                )
                            else
                                return null
                        }
                    }
                />
            )
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episode)