import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeRecommendation } from '../../redux/ActionCreator'
import TextTicker from 'react-native-text-ticker'

const mapStateToProps = state => ({
    recommendation: state.recommendation
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeRecommendation: (id) => dispatch(fetchAnimeRecommendation(id))
})

class Recommendation extends React.PureComponent {

    state = {
        recom_scroll_id: null
    };

    componentDidMount() {
        if(this.props.recommendation[this.props.id] === undefined)
            this.props.fetchAnimeRecommendation(this.props.id)
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }

    render() {
        return (
            <View horizontal style={{flex: 1, height: 228, backgroundColor: 'rgba(255,255,255,0.8)', marginTop: 8, marginHorizontal: 8, borderRadius: 10}}>
                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>Recommendations</Text>
                {
                    (() => {
                        if(this.props.recommendation[this.props.id] && this.props.recommendation[this.props.id].err){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#000', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                                </View>
                            )
                        } else if(this.props.recommendation[this.props.id] && this.props.recommendation[this.props.id].isLoading){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#000', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Recommendations...</Text>
                                </View>
                            )
                        } else if(this.props.recommendation[this.props.id]) {
                            return (
                                <FlatList horizontal data={this.props.recommendation[this.props.id].recommendation} 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}
                                    renderItem={({ item, index }) => (
                                    <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>this.viewAnime(item.mal_id)} onPressIn={()=>this.setState({ recom_scroll_id: item.mal_id })} onPressOut={()=>this.setState({ recom_scroll_id: null })}>
                                        <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                            <Image source={{ uri: item.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 120, height: 180, flex: 1 }}/>
                                            <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', width: '100%', zIndex: 1 }}>
                                                <TextTicker
                                                    numberOfLines={1}
                                                    style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}
                                                    duration={3000}
                                                    loop
                                                    bounce
                                                    repeatSpacer={50}
                                                    marqueeDelay={200}
                                                    disabled={ this.state.recom_scroll_id === item.mal_id ? false : true }
                                                >
                                                    {item.title}
                                                </TextTicker>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()} 
                                    ListEmptyComponent={
                                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No Recommendations found</Text>
                                        </View>
                                    }
                                />
                            )
                        }
                    })()
                }
                
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation)