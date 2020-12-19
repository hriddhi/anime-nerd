import React from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, Image as Image1 } from 'react-native';
import { Image, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchTopAnime } from '../../redux/ActionCreator'
import TextTicker from 'react-native-text-ticker'

const mapStateToProps = state => ({
    theme: state.options.ui,
    top: state.top
})

const mapDispatchToProps = dispatch => ({
    fetchTopAnime: (type, page) => dispatch(fetchTopAnime(type, page))
})

class List extends React.PureComponent {

    state = {
        recom_scroll_id: null
    };

    componentDidMount() {
        setTimeout(() => {
            if(this.props.type === 'all' && this.props.top['all'].data.length !== 50)
                this.props.fetchTopAnime(this.props.type)
            else if(this.props.top[this.props.type].page === 0)
                this.props.fetchTopAnime(this.props.type, 1)
        }, this.props.delay)
        
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }

    render() {
        

        return (
            <View horizontal style={{flex: 1, height: 228, backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginTop: 8, borderRadius: 10}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style ={{ flexGrow: 1 }}>
                        <Text style={{ color: this.props.theme[this.props.theme.current].anime.text, fontSize: 16, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>{this.props.title}</Text>    
                    </View>
                    {
                        this.props.top[this.props.type].data.length <= 20 ? null : (
                            <View style ={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 8 }}>
                                <Button
                                    title='SHOW MORE'
                                    titleStyle={{
                                        color: this.props.theme[this.props.theme.current].anime.text,
                                        fontSize: 9,
                                        fontFamily: 'SpaceGrotesk-SemiBold'
                                    }}
                                    buttonStyle={{
                                        backgroundColor: this.props.theme[this.props.theme.current].anime.card,
                                        borderRadius: 20,
                                        width: 74,
                                        height: 20
                                    }}
                                    onPress={() => this.props.navigation.push('VerticalList', { type: this.props.type, title: this.props.title })}
                                />                    
                            </View>
                        )
                    }
                </View>
                {
                    this.props.top[this.props.type].data.length === 0 && this.props.top[this.props.type].loading ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size='large' color='#fff'/>
                        </View>
                    ) : (
                        <FlatList horizontal data={this.props.top[this.props.type].data.slice(0,20)} 
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                            contentContainerStyle={{ paddingHorizontal: 18 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>this.viewAnime(item.mal_id)}>
                                    <View style={{ backgroundColor: this.props.theme[this.props.theme.current].anime.card, marginHorizontal: 4, borderRadius: 8, overflow: 'hidden', width: 105 }}>
                                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, right: 0, zIndex: 1, padding: 4 }}>
                                            <Text style={{ paddingVertical: 1, paddingHorizontal: 5, backgroundColor: '#000', borderRadius: 10, fontFamily: 'SpaceGrotesk-Bold', fontSize: 10, color: '#fff' }}>{item.type.toUpperCase()}</Text>
                                            { item.score !== 0 ? <Text style={{ marginLeft: 2, paddingVertical: 1, paddingHorizontal: 5, backgroundColor: '#000', color: '#fff', borderRadius: 10, fontFamily: 'SpaceGrotesk-Bold', fontSize: 10 }}>{item.score}</Text> : null }
                                        </View>
                                        <Image source={{ uri: item.image_url }} 
                                            PlaceholderContent={<ActivityIndicator color='#000'/>} 
                                            style={{ width: '100%', height: 140 }}
                                        />
                                        <View style={{ height: 40, padding: 6, width: '100%' }}>
                                            <Text numberOfLines={2} style={{ color: this.props.theme[this.props.theme.current].anime.text, fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11 }}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />  
                    )
                }
            </View>
        )
    }
}

Wrapper = (props) => <List {...props} navigation={useNavigation()} />

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)