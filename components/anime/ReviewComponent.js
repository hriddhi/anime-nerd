import React from 'react';
import { LayoutAnimation, Platform, UIManager, FlatList, View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeReviews } from '../../redux/ActionCreator'
import Moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = (state,props) => ({
    reviews: state.reviews[props.id],
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeReviews: (id) => dispatch(fetchAnimeReviews(id))
})

class reviews extends React.PureComponent {

    state = {
        expanded: null
    }

    flatListRef = React.createRef

    componentDidMount(){
        if(this.props.reviews === undefined)
            this.props.fetchAnimeReviews(this.props.id)
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    expandReview = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(this.state.expanded === index)
            this.setState({ expanded: null });
        else
            this.setState({ expanded: index });
        setTimeout(() => this.flatListRef.scrollToIndex({ animated: true, index }), 200)
            
    }

    render(){
        
        Moment.locale('en') 
                
        if(this.props.reviews && this.props.reviews.err){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                </View>
            )
        } else if(this.props.reviews && this.props.reviews.isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Reviews...</Text>
                </View>
            )
        } else if(this.props.reviews) {
            return (
                <FlatList data={this.props.reviews.reviews} 
                    ref={(ref) => { this.flatListRef = ref }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => this.expandReview(index) }>
                            <View key={index} style={{ flex: 1, padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: this.props.theme[this.props.theme.current].anime.card }}>
                                <View style={{ flex: 1, paddingVertical: 2, paddingHorizontal: 4, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                    <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flex: 1, flexGrow: 1, fontSize: 10, fontFamily: 'SpaceGrotesk-SemiBold', marginVertical: 2, paddingVertical: 2, textAlign: 'center' }}>ANIMATION {item.reviewer.scores.animation}</Text>
                                    <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flex: 1, flexGrow: 1, fontSize: 10, fontFamily: 'SpaceGrotesk-SemiBold', marginVertical: 2, paddingVertical: 2, textAlign: 'center' }}>STORY {item.reviewer.scores.story}</Text>
                                    <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flex: 1, flexGrow: 1, fontSize: 10, fontFamily: 'SpaceGrotesk-SemiBold', marginVertical: 2, paddingVertical: 2, textAlign: 'center' }}>CHARACTER {item.reviewer.scores.character}</Text>
                                    <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flex: 1, flexGrow: 1, fontSize: 10, fontFamily: 'SpaceGrotesk-SemiBold', marginVertical: 2, paddingVertical: 2, textAlign: 'center' }}>SOUND {item.reviewer.scores.sound}</Text>
                                    <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, flex: 1, flexGrow: 1, fontSize: 10, fontFamily: 'SpaceGrotesk-SemiBold', marginVertical: 2, paddingVertical: 2, textAlign: 'center' }}>ENJOYED {item.reviewer.scores.enjoyment}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', paddingVertical: 8 }}>
                                        <Text style={{ fontSize: 22, color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold' }}>{item.reviewer.scores.overall}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexGrow: 5, paddingHorizontal: 8, paddingTop: 4, paddingBottom: 8 }}>
                                        <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', color: this.props.theme[this.props.theme.current].anime.text, width: '100%' }}>{item.reviewer.username}</Text>
                                        <Text numberOfLines={ this.state.expanded === index ? null : 3 } style={{ marginTop: 4, flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', color: this.props.theme[this.props.theme.current].anime.text, width: '100%'}}>{item.content}</Text>
                                    </View>
                                </View>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(reviews)

/*
<TouchableOpacity key={index} activeOpacity={0.7} onPress={() => this.expandReview(index) }>
    <View key={index} style={{ flex: 1, flexDirection: 'row', padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', paddingVertical: 8 }}>
            <Text style={{ fontSize: 22, fontFamily: 'SpaceGrotesk-SemiBold' }}>#{index}</Text>
        </View>
        <View style={{ flex: 1, flexGrow: 5, padding: 8 }}>
            <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', width: '100%'}}>{item.reviewer.username}</Text>
            <Text numberOfLines={ this.state.expanded === index ? null : 3 } style={{ marginTop: 4, flexShrink: 1, fontSize: 12, fontFamily: 'SpaceGrotesk-Medium', width: '100%'}}>{item.content}</Text>
        </View>
    </View>
</TouchableOpacity>
*/