import React, { useRef, useEffect } from 'react';
import { Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Icon, Header, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'

import List from './HorizontalListComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const mapStateToProps = (state, props) => ({
    genre: state.genre,
    theme: state.options.ui,
})

const genre = {
    A: [{ id: 1, name: 'ACTION', image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.webp' }, 
        { id: 2, name: 'ADVENTURE', image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541.webp' }],
    C: [{ id: 3, name: 'CARS', image_url: 'https://cdn.myanimelist.net/images/anime/12/28553.webp' }, 
        { id: 4, name: 'COMEDY', image_url: 'https://cdn.myanimelist.net/images/anime/12/76049.webp' }],
    D: [{ id: 5, name: 'DEMANTAI', image_url: 'https://cdn.myanimelist.net/images/anime/1314/108941.webp' }, 
        { id: 6, name: 'DEMONS', image_url: 'https://cdn.myanimelist.net/images/anime/1286/99889.webp' }, 
        { id: 8, name: 'DRAMA', image_url: 'https://cdn.myanimelist.net/images/anime/12/74683.webp' }],
    E: [{ id: 9, name: 'ECCHI', image_url: 'https://cdn.myanimelist.net/images/anime/3/72943.webp' }],
    F: [{ id: 10, name: 'FANTACY', image_url: 'https://cdn.myanimelist.net/images/anime/6/86733.webp' }],
    G: [{ id: 11, name: 'GAME', image_url: 'https://cdn.myanimelist.net/images/anime/5/65187.webp' }],
    H: [//{ id: 12, name: 'HENTAI', image_url: '' }, 
        { id: 13, name: 'HISTORICAL', image_url: 'https://cdn.myanimelist.net/images/anime/2/73862.webp' }, 
        { id: 14, name: 'HORROR', image_url: 'https://cdn.myanimelist.net/images/anime/4/75509.webp' }, 
        { id: 35, name: 'HAREM', image_url: 'https://cdn.myanimelist.net/images/anime/13/75587.webp' }],
    J: [{ id: 42, name: 'JOSEI', image_url: 'https://cdn.myanimelist.net/images/anime/3/35749.webp' }],
    K: [{ id: 15, name: 'KIDS', image_url: 'https://cdn.myanimelist.net/images/anime/13/73834.webp' }],
    M: [{ id: 16, name: 'MAGIC', image_url: 'https://cdn.myanimelist.net/images/anime/8/77831.webp' }, 
        { id: 17, name: 'MARTIAL ARTS', image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.webp' }, 
        { id: 18, name: 'MECHA', image_url: 'https://cdn.myanimelist.net/images/anime/5/50331.webp' }, 
        { id: 38, name: 'MILITARY', image_url: 'https://cdn.myanimelist.net/images/anime/4/84177.webp' }, 
        { id: 19, name: 'MUSIC', image_url: 'https://cdn.myanimelist.net/images/anime/10/76120.webp' }, 
        { id: 7, name: 'MYSTERY', image_url: 'https://cdn.myanimelist.net/images/anime/9/9453.webp' }],
    P: [{ id: 20, name: 'PARODY', image_url: 'https://cdn.myanimelist.net/images/anime/8/77831.webp' }, 
        { id: 39, name: 'POLICE', image_url: 'https://cdn.myanimelist.net/images/anime/5/43399.webp' }, 
        { id: 40, name: 'PSYCHOLOGICAL', image_url: 'https://cdn.myanimelist.net/images/anime/11/79410.webp' }],
    R: [{ id: 22, name: 'ROMANCE', image_url: 'https://cdn.myanimelist.net/images/anime/5/87048.webp' }],
    S: [{ id: 21, name: 'SAMURAI', image_url: 'https://cdn.myanimelist.net/images/anime/11/29134.webp' }, 
        { id: 23, name: 'SCHOOL', image_url: 'https://cdn.myanimelist.net/images/anime/13/22128.webp' }, 
        { id: 24, name: 'SCI FI', image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.webp' }, 
        { id: 25, name: 'SHOUJO', image_url: 'https://cdn.myanimelist.net/images/anime/7/17890.webp' }, 
        { id: 26, name: 'SHOUJO AI', image_url: 'https://cdn.myanimelist.net/images/anime/11/89985.webp' }, 
        { id: 27, name: 'SHOUNEN', image_url: 'https://cdn.myanimelist.net/images/anime/10/78745.webp' }, 
        { id: 28, name: 'SHOUNEN AI', image_url: 'https://cdn.myanimelist.net/images/anime/1666/102238.webp' }, 
        { id: 29, name: 'SPACE', image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.webp' }, 
        { id: 30, name: 'SPORTS', image_url: 'https://cdn.myanimelist.net/images/anime/9/76662.webp' }, 
        { id: 31, name: 'SUPER POWER', image_url: 'https://cdn.myanimelist.net/images/anime/12/85221.webp' }, 
        { id: 36, name: 'SLICE OF LIFE', image_url: 'https://cdn.myanimelist.net/images/anime/1795/95088.webp' }, 
        { id: 42, name: 'SEINEN', image_url: 'https://cdn.myanimelist.net/images/anime/10/77957.webp' }, 
        { id: 37, name: 'SUPERNATURAL', image_url: 'https://cdn.myanimelist.net/images/anime/9/77809.webp' }],
    T: [{ id: 41, name: 'THRILLER', image_url: 'https://cdn.myanimelist.net/images/anime/1125/96929.webp' }],
    V: [{ id: 32, name: 'VAMPIRE', image_url: 'https://cdn.myanimelist.net/images/anime/11/75274.webp' }],
    //Y: [{ id: 33, name: 'YAOI', image_url: '' }, 
    //    { id: 34, name: 'YURI', image_url: '' }] 
}

class Top extends React.Component {

    render() {
        return (
            <FlatList
                data={Object.keys(genre)}
                contentContainerStyle={{ padding: 4 }}
                renderItem={({ item, index }) => (
                    <View key={item} style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 50, textAlign: 'center', color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-Bold', fontSize: 30 }}>{item}</Text>
                        <FlatList data={genre[item]} 
                            numColumns={3}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={item.id} activeOpacity={0.8} key={index} onPress={() => this.props.navigation.navigate('Genre', { type: item.id, title: item.name })}>
                                    <View key={item.id} style={{ margin: 4, width: (Dimensions.get('screen').width - 50 - (8 * 3) ) / 3, backgroundColor: this.props.theme[this.props.theme.current].anime.card, borderRadius: 10, overflow: 'hidden' }}>
                                        <Image source={{ uri: item.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ aspectRatio: 3/4, width: '100%' }} />
                                        <Text numberOfLines={1} style={{ padding: 2, textAlign: 'center', color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 12 }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => item}
            />
               
        )
    }
}

export default connect(mapStateToProps)(Top);