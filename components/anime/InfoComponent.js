import React, { useRef, useEffect } from 'react';
import { StyleSheet, FlatList, InteractionManager, ScrollView, View, Text, ActivityIndicator, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';
import { Avatar, ListItem, Image, Badge, Button, Icon, Divider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime } from '../../redux/ActionCreator'
import TextTicker from 'react-native-text-ticker'
import Moment from 'moment'

import Character from './CharacterComponent'
import Related from './RelatedContainer'
import Recommendation from './RecommendationComponent'
import MAL from './MALComponent'

const mapStateToProps = (state, props) => ({
    anime: state.anime[props.id],
    access_token: state.auth.access_token,
})

const mapDispatchToProps = dispatch => ({
    fetchAnime: (type, token) => dispatch(fetchAnime(type, token)),
})

const placeholder = 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg'

class Info extends React.PureComponent {

    state = {
        show_more_info: false,
        show_more_synopsis: false,
        set_show_more_synopsis: false,
        related_scroll_id: null,
        didFinishInitialAnimation: false
    };

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }
 
    render() {
        Moment.locale('en')
        const anime = this.props.anime.anime

        var info = {
            'Episodes': anime.num_episodes,
            'Rank': `#${anime.rank}`,
            'Popularity': `#${anime.popularity}`,
            'Score': anime.mean,
            'Type': anime.media_type,
            'Episode duration': anime.duration,
            'Rating': anime.rating,
            'Status': anime.status,
            'Start date': anime.aired.split(' to ')[0],
            'End date': anime.aired.split(' to ')[1],
            'Source': anime.source,
            'Studio': anime.studios ? anime.studios[0].name + (anime.studios[1] ? ', ' + anime.studios[1].name : null ) : ' - ',
            'Season': anime.premiered
        }

        return (  
            <ScrollView contentContainerStyle={{ paddingBottom: 8, paddingHorizontal: 8 }}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.8)', marginBottom: 8, borderRadius: 10}}>
                    <Image source={{ uri: anime.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 115, height: 170, flex: 1, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}/>
                    <View style={{flex: 1, paddingHorizontal: 8, paddingVertical: 4}}>
                        <Text numberOfLines={2} style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 18 }}>{anime.title}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 10, marginTop: 0 }}>{anime.title_japanese}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 10, marginTop: 0 }}>{anime.title_english}</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 4}}>
                            {
                                anime.genres.map((val,i) => <Text key={i} style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{val.name}</Text> )
                            }
                        </View>
                    </View>
                </View>
                
                { <MAL id={this.props.id} /> }

                <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', padding: 12, borderRadius: 10}}>
                    <Text style={{fontSize: 18, fontFamily: 'SpaceGrotesk-Bold'}}>Info</Text>
                    {
                        Object.keys(info).map((val,i)=> {
                            if(i < 8 || this.state.show_more_info){
                                return (
                                    <View key={i} style={{ paddingHorizontal: 4}}>
                                        <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', paddingVertical: 4 }}>
                                            <View style={{ flex: 1, flexGrow: 1 }}>
                                                <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14}}>{val}</Text>
                                            </View>
                                            <View style={{ flex: 1, flexGrow: 1 }}>
                                                <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14, textAlign: 'right'}}>{info[val]}</Text>
                                            </View>
                                        </View>
                                        <Divider style={{ backgroundColor: 'grey'}} />
                                    </View>
                                )
                            }
                        })
                    }
                    <Text onPress={() => this.setState({ show_more_info: !this.state.show_more_info })} style={{fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', marginBottom: -8, padding: 8}}>Show { this.state.show_more_info ? 'less' : 'more' }</Text>
                </View>

                <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 12, paddingTop: 12, marginVertical: 8, marginBottom: 0, borderRadius: 10}}>
                    <Text style={{fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingBottom: 8}}>Synopsis</Text>
                    <Text numberOfLines={this.state.show_more_synopsis ? null : 4 } onTextLayout={(e) => e.nativeEvent.lines.length > 4 ? this.setState({ set_show_more_synopsis: true }) : null } style={{ textAlign: 'justify', fontSize: 14, fontFamily: 'SpaceGrotesk-Medium', paddingHorizontal: 4}}>{anime.synopsis}</Text>
                    { this.state.set_show_more_synopsis ? <Text onPress={() => this.setState({ show_more_synopsis: !this.state.show_more_synopsis })} style={{fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', marginBottom: 4, padding: 8}}>Show { this.state.show_more_synopsis ? 'less' : 'more' }</Text> : null }
                </View>

                <Character id={this.props.id} navigation={this.props.navigation} />

                <Related id={this.props.id} navigation={this.props.navigation} />
                        
                <Recommendation id={this.props.id} navigation={this.props.navigation} />
            </ScrollView>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)