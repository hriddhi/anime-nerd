import React from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { ListItem, Icon, SocialIcon, Tooltip } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeEpisodes } from '../../redux/ActionCreator'
import Moment from 'moment'

const mapStateToProps = (state, props) => ({
    anime: state.anime[props.route.params.id],
    theme: state.options.ui
})

class Songs extends React.PureComponent {

    state = {
        songs: []
    }

    componentDidMount(){
        var temp = []
        this.props.anime.anime.opening_themes.forEach(e => {
            var tag = e.substring(e.indexOf('#') + 1, e.indexOf(':'))
            temp.push({ 
                name: e.substring(e.indexOf('\"') + 1, e.lastIndexOf('\"')),
                ep: e.lastIndexOf('(ep') !== -1 ? e.substring(e.lastIndexOf('(ep') + 1, e.length - 1).toUpperCase() : null,
                tag: 'OPENING' + (tag !== '' ? ' ' + tag  : '')
            })
        });

        this.props.anime.anime.ending_themes.forEach(e => {
            var tag = e.substring(e.indexOf('#') + 1, e.indexOf(':'))
            temp.push({ 
                name: e.substring(e.indexOf('\"') + 1, e.lastIndexOf('\"')),
                ep: e.lastIndexOf('(ep') !== -1 ? e.substring(e.lastIndexOf('(ep') + 1, e.length - 1).toUpperCase() : null,
                tag: 'ENDING' + (tag !== '' ? ' ' + tag  : '')
            })
        });

        this.setState({ songs: temp })
    }

    render(){
        return (
            <React.Fragment>
            <View style={{ flexDirection: 'row', paddingVertical: 4, paddingRight: 8, height: 48, backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginHorizontal: 8, marginBottom: 4, borderRadius: 10 }}>
                <Icon name="exclamation-triangle" type='font-awesome' size={28} color="#b0a100" style={{ padding: 8 }} />
                <Text style={{ flex: 1, fontSize: 14, fontFamily: 'SpaceGrotesk-Medium', color: this.props.theme[this.props.theme.current].anime.text }}>Sometimes, songs might not work as intended. Gomen nasai!</Text>
            </View>
            <FlatList data={this.state.songs} 
                renderItem={({ item, index }) => (
                    <ListItem key={index} containerStyle={{height: 70, marginHorizontal: 8, marginVertical: 4, padding: 0, backgroundColor: this.props.theme[this.props.theme.current].anime.card, overflow: 'hidden', borderRadius: 10 }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: 70, height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 22, fontFamily: 'SpaceGrotesk-SemiBold', color: this.props.theme[this.props.theme.current].anime.text }}>#{index + 1}</Text>
                        </View>
                        <View style={{ height: '100%', paddingRight: 16, paddingVertical: 8, flex: 1 }}>
                            <Text numberOfLines={1} style={{ flexShrink: 1,  fontSize: 16, fontFamily: 'SpaceGrotesk-SemiBold', width: '100%', color: this.props.theme[this.props.theme.current].anime.text }}>{item.name}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 9 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].anime.card, color: this.props.theme[this.props.theme.current].anime.text, borderRadius: 50}}>{item.tag.toUpperCase()}</Text>
                                { item.ep ? <Text style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: this.props.theme[this.props.theme.current].anime.card, color: this.props.theme[this.props.theme.current].anime.text, borderRadius: 50}}>{item.ep}</Text> : null }
                            </View>
                        </View> 
                        <Tooltip popover={
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SocialIcon
                                    type='soundcloud'
                                    style={{ height: 50, width: 50 }}
                                    button
                                    onPress={()=>Linking.openURL('https://soundcloud.com/search/results?q=' + item.name.replace(' ', '%20'))}
                                />
                                <SocialIcon
                                    type='youtube'
                                    style={{ height: 50, width: 50 }}
                                    button
                                    onPress={()=>Linking.openURL('https://youtube.com/results?search_query=' + item.name.replace(' ', '%20'))}
                                />
                                <SocialIcon
                                    type='spotify'
                                    iconColor='#fff'
                                    iconType='font-awesome-5'
                                    style={{ backgroundColor: 'green', height: 50, width: 50, padding: 0 }}
                                    iconSize={26}
                                    button
                                    onPress={()=>Linking.openURL('https://open.spotify.com/search/' + item.name.replace(' ', '%20'))}

                                />
                                </View>
                            }
                            withPointer={false}
                            backgroundColor='#fff'
                            withOverlay={false}
                            width={194}
                            containerStyle={{ margin: 4, height: 64, padding: 0, borderRadius: 32 }}
                        >
                            <View style={{ borderRadius: 20, borderWidth: 4, backgroundColor: 'rgba(0,0,0,0.3)', borderColor: 'rgb(0,0,0)', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                <Icon name="play" type='font-awesome-5' size={16} color={this.props.theme[this.props.theme.current].anime.text} style={{ marginLeft: 2 }} />
                            </View>
                        </Tooltip>
                    </ListItem>
                    
                )}
                keyExtractor={(item, index) => index.toString()} 
                ListEmptyComponent={
                    (() => {
                        if(this.props.anime.isLoading){
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>*Nyan* Loading Songs</Text>
                                    <ActivityIndicator size='large' color='#fff' />
                                </View>
                            )
                        } else if(this.props.anime.err) {
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Senpai! There was an error. :(</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No songs found!</Text>
                                </View>
                            )
                        }
                    })()
                }
            />
            </React.Fragment>
        )
    }
}


export default connect(mapStateToProps)(Songs)