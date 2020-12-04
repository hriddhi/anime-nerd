import React, { useRef, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, View, Text, ActivityIndicator, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';
import { Avatar, ListItem, Icon, Tooltip, Header, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateAnime, fetchAnime, deleteListAnime, fetchAnimeSongs } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Animated from 'react-native-reanimated';

import Episode from './anime/EpisodeComponent'
import Info from './anime/InfoComponent'
import Stats from './anime/StatsComponent'
import Review from './anime/ReviewComponent'

const mapStateToProps = (state, props) => ({
    anime: state.anime[props.route.params.id],
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnime: (type, token) => dispatch(fetchAnime(type, token)),
    fetchAnimeSongs: (id,name) => dispatch(fetchAnimeSongs(id, name))
})

const placeholder = 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg'

const Tab = createMaterialTopTabNavigator()

function MyTabBar({ state, descriptors, navigation, position }) {

    const scrollViewRef = useRef(null)

    useEffect(() => {
        scrollViewRef.current.scrollTo({ x: state.index * 50, y: 0, animated: true })
    }, [state.index])

    return (
    <View style={{ margin: 8 }}>
    <ScrollView ref={list => scrollViewRef.current = list} horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
                key={index}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1 }}
            >
                <Animated.View style={{ opacity, marginRight: 8, paddingHorizontal: 12, paddingVertical: 2, backgroundColor: `rgba(255,255,255,0.8)`, borderRadius: 20 }}>
                    <Animated.Text style={{ color: '#000', fontFamily: 'SpaceGrotesk-Medium', fontSize: 12 }} >
                        {label}
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
      </ScrollView>
      </View>
    );
}

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

class Anime extends React.PureComponent {

    state = {
        didFinishInitialAnimation: false
    }

    componentDidMount() {
        setTimeout(()=>{
            if(this.props.anime === undefined)
                this.props.fetchAnime(this.props.route.params.id, this.props.access_token)
            else
                setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 0) 
        }, 0)
    }

    componentDidUpdate() {
        this.setState({ didFinishInitialAnimation: true })
    }

    render() {
            return (
                <ImageBackground source={{ uri: this.props.anime && this.props.anime.anime !== null ? this.props.anime.anime.image_url ? this.props.anime.anime.image_url : null : null }} style={styles.image}>
                    <LinearGradient style={{flex: 1}} colors={['rgba(0,0,0,0.1)'].concat(this.props.theme[this.props.theme.current].anime.linear_background)}>
                        <Header
                            leftComponent={<Icon name="arrow-left" type='font-awesome' size={20} color={this.props.theme[this.props.theme.current].anime.header_text_color} style={{ padding: 16 }} onPress={()=>this.props.navigation.pop()} />}
                            leftContainerStyle={{ paddingHorizontal: 8 }}
                            centerComponent={<Text style={{ color: this.props.theme[this.props.theme.current].anime.header_text_color, textAlign: 'left', fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>ANIME</Text>}
                            centerContainerStyle={{ padding: 0, margin: 0 }}
                            containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
                            placement='left'
                        />
                        <Tab.Navigator backBehavior="none" lazy tabBar={props => <MyTabBar {...props} />} >
                            <Tab.Screen name='details' options={{ title: 'DETAILS' }}>
                                {() => {
                                    
                                    if(!this.state.didFinishInitialAnimation || (this.props.anime === undefined || this.props.anime.isLoading)){
                                        return (
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <ActivityIndicator size='large' color='#fff'/>
                                            </View>
                                        )
                                    } else {
                                        return <Info id={this.props.route.params.id} navigation={this.props.navigation}/>
                                    }
                                } 
                            }
                            </Tab.Screen>
                            <Tab.Screen name='episodes' options={{ title: 'EPISODES' }}>
                                {() => <Episode id={this.props.route.params.id} navigation={this.props.navigation} />}
                            </Tab.Screen>
                            <Tab.Screen name='songs' options={{ title: 'SONGS' }}>
                                {() => <Songs {...this.props} />}
                            </Tab.Screen>
                            <Tab.Screen name='pictures' options={{ title: 'PICTURES' }}>
                                {() => <Text>hjgjh</Text>}
                            </Tab.Screen>
                            <Tab.Screen name='stats' options={{ title: 'STATS' }}>
                                {() => <Stats id={this.props.route.params.id} />}
                            </Tab.Screen>
                            <Tab.Screen name='reviews' options={{ title: 'REVIEWS' }}>
                                {() => <Review id={this.props.route.params.id} navigation={this.props.navigation} />}
                            </Tab.Screen>
                        </Tab.Navigator> 
                    </LinearGradient>
                </ImageBackground>
            )
        }
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Anime);

const styles = StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    buttonText: {
        color: '#000',
        fontFamily: 'SpaceGrotesk-Bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});