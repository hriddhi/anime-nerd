import React from 'react';
import { LayoutAnimation, Platform, UIManager, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { fetchAnime } from '../../redux/ActionCreator'
import Moment from 'moment'

import Character from './CharacterComponent'
import Related from './RelatedContainer'
import Recommendation from './RecommendationComponent'
import MAL from './MALComponent'

const mapStateToProps = (state, props) => ({
    anime: state.anime[props.route.params.id],
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnime: (type, token) => dispatch(fetchAnime(type, token)),
})

class Info extends React.PureComponent {

    state = {
        show_more_info: false,
        show_more_synopsis: false,
        set_show_more_synopsis: false,
        related_scroll_id: null,
        didFinishInitialAnimation: false,
    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    expandInfoLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ show_more_info: !this.state.show_more_info });
    }

    expandSynopsisLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ show_more_synopsis: !this.state.show_more_synopsis });
    }

    render() {
        Moment.locale('en')

        if(this.props.anime === undefined || this.props.anime.isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                </View>
            )
        } else {
            const anime = this.props.anime.anime

            var info = {
                'Episodes': anime.num_episodes ? anime.num_episodes : 'NA',
                'Rank': anime.rank ? `#${anime.rank}` : 'NA',
                'Popularity': `#${anime.popularity}`,
                'Score': anime.mean,
                'Type': anime.media_type,
                'Episode duration': anime.duration,
                'Rating': anime.rating,
                'Status': anime.status,
                'Start date': anime.aired.split(' to ')[0],
                'End date': anime.aired.split(' to ')[1],
                'Source': anime.source,
                'Studio': anime.studios.length !== 0 ? anime.studios[0].name + (anime.studios[1] ? ', ' + anime.studios[1].name : '' ) : ' - ',
                'Season': anime.premiered
            }

            return (  
                <ScrollView contentContainerStyle={{ paddingBottom: 8, paddingHorizontal: 8 }}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginBottom: 8, borderRadius: 10}}>
                        <Image source={{ uri: anime.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 115, height: 170, flex: 1, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}/>
                        <View style={{flex: 1, paddingHorizontal: 8, paddingVertical: 4}}>
                            <Text numberOfLines={2} style={{color: this.props.theme[this.props.theme.current].anime.title,  fontFamily: 'SpaceGrotesk-Bold', fontSize: 18 }}>{anime.title}</Text>
                            <Text numberOfLines={1} style={{color: this.props.theme[this.props.theme.current].anime.text,  fontFamily: 'SpaceGrotesk-Medium', fontSize: 10, marginTop: 0 }}>{anime.title_japanese}</Text>
                            { anime.title_english ? <Text numberOfLines={1} style={{color: this.props.theme[this.props.theme.current].anime.text,  fontFamily: 'SpaceGrotesk-Medium', fontSize: 10, marginTop: 0 }}>{anime.title_english}</Text> : null}
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 4}}>
                                {
                                    anime.genres.map((val,i) => <Text key={i} style={{ color: this.props.theme[this.props.theme.current].anime.title, fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].anime.card, borderRadius: 50}}>{val.name}</Text> )
                                }
                            </View>
                        </View>
                    </View>
                    
                    { <MAL id={this.props.route.params.id} navigation={this.props.navigation}/> }

                    <View style={{flex: 1, backgroundColor: this.props.theme[this.props.theme.current].anime.card, padding: 12, borderRadius: 10}}>
                        <Text style={{color: this.props.theme[this.props.theme.current].anime.text, fontSize: 18, fontFamily: 'SpaceGrotesk-Bold'}}>Info</Text>
                        {
                            Object.keys(info).map((val,i)=> {
                                if(i < 8 || this.state.show_more_info){
                                    return (
                                        <View key={i} style={{ paddingHorizontal: 4}}>
                                            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', paddingVertical: 4 }}>
                                                <View style={{ flex: 1, flexGrow: 1 }}>
                                                    <Text style={{color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14}}>{val}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexGrow: 1 }}>
                                                    <Text style={{color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14, textAlign: 'right'}}>{info[val]}</Text>
                                                </View>
                                            </View>
                                            <Divider style={{ backgroundColor: 'grey'}} />
                                        </View>
                                    )
                                }
                            })
                        }
                        <Text onPress={() => this.expandInfoLayout() } style={{color: this.props.theme[this.props.theme.current].anime.text, fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', marginBottom: -8, padding: 8}}>Show { this.state.show_more_info ? 'less' : 'more' }</Text>
                    </View>

                    <View style={{flex: 1, backgroundColor: this.props.theme[this.props.theme.current].anime.card, paddingHorizontal: 12, paddingVertical: 12, marginVertical: 8, marginBottom: 0, borderRadius: 10}}>
                        <Text style={{fontSize: 18, color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-Bold', paddingBottom: 8}}>Synopsis</Text>
                        <Text numberOfLines={this.state.show_more_synopsis ? null : 4 } onTextLayout={(e) => e.nativeEvent.lines.length > 4 ? this.setState({ set_show_more_synopsis: true }) : null } style={{ color: this.props.theme[this.props.theme.current].anime.text, textAlign: 'justify', fontSize: 14, fontFamily: 'SpaceGrotesk-Medium', paddingHorizontal: 4}}>{anime.synopsis}</Text>
                        { this.state.set_show_more_synopsis ? <Text onPress={() => this.expandSynopsisLayout()} style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', paddingTop: 4}}>Show { this.state.show_more_synopsis ? 'less' : 'more' }</Text> : null }
                    </View>

                    <Character id={this.props.route.params.id} navigation={this.props.navigation} />

                    <Related id={this.props.route.params.id} navigation={this.props.navigation} />
                            
                    <Recommendation id={this.props.route.params.id} navigation={this.props.navigation} />
                </ScrollView>
            );
        }
    }
}

Wrapper = (props) => <Info {...props} navigation={useNavigation()} />

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)