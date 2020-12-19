import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, ImageBackground, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnime } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Episode from './anime/EpisodeComponent'
import Info from './anime/InfoComponent'
import Stats from './anime/StatsComponent'
import Review from './anime/ReviewComponent'
import Picture from './anime/PictureComponent'
import Songs from './anime/SongComponent'

const mapStateToProps = (state, props) => ({
    anime: state.anime[props.route.params.id],
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnime: (type, token) => dispatch(fetchAnime(type, token))
})

const Tab = createMaterialTopTabNavigator()


function MyTabBar({ state, descriptors, navigation }) {

    const scrollViewRef = useRef(null)

    useEffect(() => {
        scrollViewRef.current.scrollToIndex({ index: state.index, viewPosition: 0.5 })
    }, [state.index])

    return (
    <View style={{ marginVertical: 8 }}>
        <FlatList
            ref={list => scrollViewRef.current = list}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            data={state.routes}
            renderItem={({ item, index }) => {
                const { options } = descriptors[item.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : item.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                    type: 'tabPress',
                    target: item.key,
                    canPreventDefault: true,
                    });
        
                    if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(item.name);
                    }
                };

                return (
                    <TouchableOpacity key={index} testID={options.tabBarTestID} onPress={onPress} style={{ flex: 1 }}>
                        <View style={{ opacity: state.index === index ? 0.9 : 0.5, marginHorizontal: 4, paddingHorizontal: 12, paddingVertical: 2, backgroundColor: '#fff', borderRadius: 20 }}>
                            <Text style={{ color: '#000', fontFamily: 'SpaceGrotesk-Medium', fontSize: 12 }} >{label}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
            keyExtractor={(item, index) => index.toString()} 
        />
      </View>
    );
}

class Anime extends React.Component {

    state = {
        didFinishInitialAnimation: false
    }

    componentDidMount() {
        Keyboard.dismiss(0)
        this.props.navigation.addListener('transitionEnd', e => {
            if(!e.data.closing){
                this.setState({ didFinishInitialAnimation: true })
                if(this.props.anime === undefined)
                    this.props.fetchAnime(this.props.route.params.id, this.props.access_token)
            }
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('transitionEnd')
    }

    render() {

        const comp = (
            <React.Fragment>
                <Header
                    leftComponent={<Icon name="arrow-left" type='font-awesome-5' size={20} color={this.props.theme[this.props.theme.current].anime.header_text_color} style={{ padding: 16 }} onPress={()=>this.props.navigation.pop()} />}
                    leftContainerStyle={{ paddingHorizontal: 8 }}
                    centerComponent={<Text style={{ color: this.props.theme[this.props.theme.current].anime.header_text_color, textAlign: 'left', fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>ANIME</Text>}
                    centerContainerStyle={{ padding: 0, margin: 0 }}
                    containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
                    placement='left'
                />
                <Tab.Navigator backBehavior="none" lazy tabBar={props => <MyTabBar {...props} /> } lazyPreloadDistance={1} >
                    <Tab.Screen name='details' component={Info} initialParams={{ id: this.props.route.params.id }} options={{ title: 'DETAILS' }} />
                    <Tab.Screen name='stats' component={Stats} initialParams={{ id: this.props.route.params.id }} options={{ title: 'STATS' }} />
                    <Tab.Screen name='episodes' component={Episode} initialParams={{ id: this.props.route.params.id }} options={{ title: 'EPISODES' }} />
                    <Tab.Screen name='songs' component={Songs} initialParams={{ id: this.props.route.params.id }} options={{ title: 'SONGS' }} />
                    <Tab.Screen name="pictures" component={Picture} initialParams={{ id: this.props.route.params.id }} options={{ title: 'PICTURES' }} />
                    <Tab.Screen name='reviews' component={Review} initialParams={{ id: this.props.route.params.id }} options={{ title: 'REVIEWS' }} />
                </Tab.Navigator> 
            </React.Fragment>
        )

        if(!this.state.didFinishInitialAnimation) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                </View>
            )
        } else {
            if(this.props.theme.image_background) {
                return (
                    <ImageBackground source={{ uri: this.props.anime && this.props.anime.anime !== null ? this.props.anime.anime.image_url.replace('.jpg','l.jpg') ? this.props.anime.anime.image_url.replace('.jpg','l.jpg') : null : null }} imageStyle={{ resizeMode: 'cover', height: Dimensions.get('screen').height * (2/3) }} style={{ flex: 1 }}>
                        <LinearGradient style={{flex: 1}} colors={['rgba(0,0,0,0.1)'].concat(this.props.theme[this.props.theme.current].anime.linear_background)}>
                            { comp }
                        </LinearGradient>
                    </ImageBackground>
                )
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        { comp }
                    </View>
                    
                )
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Anime);