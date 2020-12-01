import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, Image as Image1 } from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeRelated } from '../../redux/ActionCreator'
import TextTicker from 'react-native-text-ticker'

const mapStateToProps = state => ({
    token: state.auth.access_token,
    related: state.related
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeRelated: (id, token) => dispatch(fetchAnimeRelated(id, token))
})

class Related extends React.PureComponent {

    state = {
        related_scroll_id: null
    };

    componentDidMount() {
        if(this.props.related[this.props.id] === undefined)
            this.props.fetchAnimeRelated(this.props.id, this.props.token)
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }

    render() {
        return (
            <View horizontal style={{flex: 1, height: 228, backgroundColor: 'rgba(255,255,255,0.8)', marginTop: 8, borderRadius: 10}}>
                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>Related</Text>
                {
                    (() => {
                        if(this.props.related[this.props.id] && this.props.related[this.props.id].err){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#000', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                                </View>
                            )
                        } else if(this.props.related[this.props.id] && this.props.related[this.props.id].isLoading){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#000', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Related Animes...</Text>
                                </View>
                            )
                        } else if(this.props.related[this.props.id]) {
                            if(this.props.related[this.props.id].related.length === 0){
                                return (
                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                        <Image1 resizeMode='contain' source={require('../game_boy_icon_black.png')} style={{ height: 110, alignSelf: 'center'}}/>
                                        <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#000', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No Related Animes found</Text>
                                    </View>
                                )
                            }
                            return (
                                <FlatList horizontal data={this.props.related[this.props.id].related} 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}
                                    renderItem={({ item, index }) => (
                                    <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>this.viewAnime(item.node.id)} onPressIn={()=>this.setState({ related_scroll_id: item.node.id })} onPressOut={()=>this.setState({ related_scroll_id: null })}>
                                        <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                            <Image source={{ uri: item.node.main_picture.medium }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 120, height: 180, flex: 1 }}/>
                                            <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', width: '100%', zIndex: 1 }}>
                                                <TextTicker
                                                    numberOfLines={1}
                                                    style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}
                                                    duration={3000}
                                                    loop
                                                    bounce
                                                    repeatSpacer={50}
                                                    marqueeDelay={200}
                                                    disabled={ this.state.related_scroll_id === item.node.id ? false : true }
                                                >
                                                    {item.node.title}
                                                </TextTicker>
                                                <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 10 }}>{item.relation_type_formatted}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()} 
                                />
                            )
                        }
                    })()
                }
                
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Related)