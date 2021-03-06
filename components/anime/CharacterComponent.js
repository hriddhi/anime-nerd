import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeCharacter, fetchCharacterDetail } from '../../redux/ActionCreator'

const mapStateToProps = (state, props) => ({
    character: state.character,
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeCharacter: (id) => dispatch(fetchAnimeCharacter(id)),
    fetchCharacterDetail: (url) => dispatch(fetchCharacterDetail(url))
})

class Character extends React.PureComponent {

    componentDidMount() {
        if(this.props.character[this.props.id] === undefined)
            this.props.fetchAnimeCharacter(this.props.id)
    }

    render() {
        return (
            <View style={{flex: 1, height: 198, backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginTop: 8, borderRadius: 10}}>
                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8, color: this.props.theme[this.props.theme.current].anime.text }}>Characters</Text>
                {
                    (() => {
                        if(this.props.character[this.props.id] && this.props.character[this.props.id].err){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: this.props.theme[this.props.theme.current].anime.text, fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                                </View>
                            )
                        } else if(this.props.character[this.props.id] && this.props.character[this.props.id].isLoading){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: this.props.theme[this.props.theme.current].anime.text, fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading Characters...</Text>
                                </View>
                            )
                        } else if(this.props.character[this.props.id]) {
                            return (
                                <FlatList horizontal data={this.props.character[this.props.id].character} 
                                    showsHorizontalScrollIndicator={false}
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>this.props.navigation.navigate('Web', { uri: item.url })} >
                                            <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                <Image source={{ uri: item.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 100, height: 150, flex: 1 }}/>
                                                <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: this.props.theme[this.props.theme.current].anime.card_overlay, width: '100%', zIndex: 1 }}>
                                                    <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12, color: this.props.theme[this.props.theme.current].anime.color }}>{(item.name.split(', ')[1] ? item.name.split(', ')[1] + ' ' : '') + item.name.split(', ')[0]}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListEmptyComponent={
                                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: this.props.theme[this.props.theme.current].anime.text, fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No Characters found</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Character)