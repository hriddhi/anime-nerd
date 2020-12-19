import React from 'react';
import { FlatList, View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image as Image1 } from 'react-native';
import { Image, Header, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchTopAnime } from '../../redux/ActionCreator'

const mapStateToProps = state => ({
    theme: state.options.ui,
    top: state.top
})

const mapDispatchToProps = dispatch => ({
    fetchTopAnime: (type, page) => dispatch(fetchTopAnime(type, page))
})

const type = 'characters'

class List extends React.PureComponent {

    componentDidMount() {    
        if(!this.props.top[type].err)
            this.props.fetchTopAnime(type, this.props.top[type].page + 1) 
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }

    render() { 
        return (
            <React.Fragment>
                {
                    (() => {
                        if(this.props.top[type].data.length === 0 && this.props.top[type].loading) {
                            return (
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <ActivityIndicator size='large' color='#fff'/>
                                </View>
                            )    
                        } else {
                            return (
                                <FlatList data={this.props.top[type].data} 
                                    numColumns={3}
                                    contentContainerStyle={{ padding: 4 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity activeOpacity={0.9} key={item.mal_id} onPress={() => this.props.navigation.navigate('Web', { uri: item.url })}>
                                            <View key={item.mal_id} style={{ padding: 4, width: (Dimensions.get('screen').width - 8 ) / 3 }}>
                                                <View style={{ width: (Dimensions.get('screen').width - (8 * 3) ) / 3, backgroundColor: this.props.theme[this.props.theme.current].anime.card, borderRadius: 8, overflow: 'hidden' }}>
                                                    <Image source={{ uri: item.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ aspectRatio: 3/4, width: '100%' }} />
                                                    <View style={{ height: 40, padding: 6, width: '100%' }}>
                                                        <Text numberOfLines={1} style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11 }}>
                                                        {(item.title.split(', ')[1] ? item.title.split(', ')[1] + ' ' : '') + item.title.split(', ')[0]}
                                                        </Text>
                                                        <Text numberOfLines={1} style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11 }}>
                                                            {<Icon name="star" type='font-awesome' size={9} color={this.props.theme[this.props.theme.current].anime.text} />} {item.favorites}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => item.mal_id.toString()}
                                    onEndReached={() => {
                                            !this.props.top[type].err &&
                                            !this.props.top[type].loading
                                            ? this.props.fetchTopAnime(type, this.props.top[type].page + 1) 
                                            : null 
                                        }
                                    }
                                    ListFooterComponent={() =>
                                        this.props.top[type].loading ? <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', paddingVertical: 8 }}><ActivityIndicator color='#fff'/></View> : null
                                    }
                                />
                            )
                        }
                    })()
                }
                
            </React.Fragment>
        )
    }
}

Wrapper = (props) => <List {...props} navigation={useNavigation()} />

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)