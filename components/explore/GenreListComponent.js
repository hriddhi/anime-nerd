import React from 'react';
import { FlatList, View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image as Image1 } from 'react-native';
import { Image, Header, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchGenre } from '../../redux/ActionCreator'

const mapStateToProps = state => ({
    theme: state.options.ui,
    genre: state.genre
})

const mapDispatchToProps = dispatch => ({
    fetchGenre: (type, page) => dispatch(fetchGenre(type, page))
})

class List extends React.PureComponent {

    state = {
        didFinishInitialAnimation: false
    };

    componentDidMount() {
        this.props.navigation.addListener('transitionEnd', e => {
            if(!e.data.closing){
                this.setState({ didFinishInitialAnimation: true })
                if(!this.props.genre[this.props.route.params.type].err)
                    this.props.fetchGenre(this.props.route.params.type, this.props.genre[this.props.route.params.type].page + 1)
            }
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('transitionEnd')
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }

    render() {
        if(!this.state.didFinishInitialAnimation) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                </View>
            )
        } else 
        return (
            <React.Fragment>
                <Header
                    leftComponent={<Icon name="arrow-left" type='font-awesome-5' size={20} color={this.props.theme[this.props.theme.current].anime.header_text_color} style={{ padding: 16 }} onPress={()=>this.props.navigation.pop()} />}
                    leftContainerStyle={{ paddingHorizontal: 8 }}
                    centerComponent={
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: this.props.theme[this.props.theme.current].anime.header_text_color, textAlign: 'left', fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>{this.props.route.params.title}</Text>
                        </View>
                    }
                    centerContainerStyle={{ padding: 0, margin: 0 }}
                    containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
                    placement='left'
                />
                {
                    (() => {
                        if(this.props.genre[this.props.route.params.type].data.length === 0 && this.props.genre[this.props.route.params.type].loading) {
                            return (
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <ActivityIndicator size='large' color='#fff'/>
                                </View>
                            )    
                        } else {
                            return (
                                <FlatList data={this.props.genre[this.props.route.params.type].data} 
                                    numColumns={3}
                                    contentContainerStyle={{ padding: 4 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity activeOpacity={0.9} key={item.mal_id} onPress={()=>this.viewAnime(item.mal_id)}>
                                            <View style={{ padding: 4, width: (Dimensions.get('screen').width - 8 ) / 3 }}>
                                                <View style={{ width: (Dimensions.get('screen').width - (8 * 3) ) / 3, backgroundColor: this.props.theme[this.props.theme.current].anime.card, borderRadius: 8, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, right: 0, zIndex: 1, padding: 4 }}>
                                                        <Text style={{ paddingVertical: 1, paddingHorizontal: 5, backgroundColor: '#000', borderRadius: 10, fontFamily: 'SpaceGrotesk-Bold', fontSize: 10, color: '#fff' }}>{item.type}</Text>
                                                        { item.score !== 0 ? <Text style={{ marginLeft: 2, paddingVertical: 1, paddingHorizontal: 5, backgroundColor: '#000', color: '#fff', borderRadius: 10, fontFamily: 'SpaceGrotesk-Bold', fontSize: 10 }}>{item.score}</Text> : null }
                                                    </View>
                                                    <Image source={{ uri: item.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ aspectRatio: 3/4, width: '100%' }} />
                                                    <View style={{ height: 40, padding: 6, width: '100%' }}>
                                                        <Text numberOfLines={2} style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11 }}>
                                                            {item.title}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.mal_id.toString()}
                                    onEndReached={() => {
                                            !this.props.genre[this.props.route.params.type].err &&
                                            !this.props.genre[this.props.route.params.type].loading
                                            ? this.props.fetchGenre(this.props.route.params.type, this.props.genre[this.props.route.params.type].page + 1)
                                            : null 
                                        }
                                    }
                                    ListFooterComponent={() =>
                                        this.props.genre[this.props.route.params.type].loading ? <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', paddingVertical }}><ActivityIndicator color='#fff'/></View> : null
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