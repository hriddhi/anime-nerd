import React from 'react';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar, ListItem, Image, Badge, Button, Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateAnime, fetchAnime, deleteListAnime } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'
import { WheelPicker } from 'react-native-wheel-picker-android'
import TextTicker from 'react-native-text-ticker'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const mapStateToProps = state => ({
    anime: state.anime,
    access_token: state.auth.access_token
})

const mapDispatchToProps = dispatch => ({
    updateAnime: (id, status, token) => dispatch(updateAnime(id, status, token)),
    fetchAnime: (type, token) => dispatch(fetchAnime(type, token)),
    deleteListAnime: (id, status, token) => dispatch(deleteListAnime(id, status, token))
})

class Detail extends React.Component {

    state = {
        modal_status: false,
        modal_episode: false,
        modal_rating: false,
        num_episodes_watched_changed: false,
        rating_changed: false,
        show_more_info: false,
        show_more_synopsis: false,
        related_scroll_id: null,
        recom_scroll_id: null
    };

    componentDidMount() {
        this.props.fetchAnime(this.props.route.params.id, this.props.access_token)
    }

    viewAnime = (id) => {
        this.props.navigation.push('Anime', { id })
    }
    
    setmodal_status = () => {
        this.setState({ modal_status: !this.state.modal_status });
    }

    setmodal_episode = () => {
        this.setState({ modal_episode: !this.state.modal_episode });
        if(this.props.anime[this.props.route.params.id].anime.my_list_status && this.state.num_episodes_watched_changed !== false)
            this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.props.anime[this.props.route.params.id].anime.my_list_status && this.state.num_episodes_watched_changed !== false && this.props.anime[this.props.route.params.id].anime.my_list_status.num_episodes_watched === 0)
            this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `watching-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}`, episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.props.anime[this.props.route.params.id].anime.my_list_status && this.state.num_episodes_watched_changed !== false && this.state.num_episodes_watched_changed === this.props.anime[this.props.route.params.id].anime.num_episodes)
            this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `completed-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}`, episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.state.num_episodes_watched_changed !== false)
            this.setState({ num_episodes_watched_changed: false })
    }

    setmodal_rating = () => {
        this.setState({ modal_rating: !this.state.modal_rating });
        if(this.props.anime[this.props.route.params.id].anime.my_list_status && this.state.rating_changed !== false)
            this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { rating: this.state.rating_changed }, this.props.access_token)
        if(this.state.rating_changed !== false)
            this.setState({ rating_changed: false })
    }

    getStatus = () => {
        var status = this.props.anime[this.props.route.params.id].anime.my_list_status.status
        if(status === 'watching')
            return 'Watching'
        else if(status === 'plan_to_watch')
            return 'Planned'
        else if(status === 'on_hold')
            return 'On Hold'
        else if(status === 'dropped')
            return 'Dropped'
        else if(status === 'completed')
            return 'Completed'
    }

    render() {
        
        if(this.props.anime[this.props.route.params.id] === undefined || this.props.anime[this.props.route.params.id].isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                </View>
            )
        } else {
            const anime = this.props.anime[this.props.route.params.id].anime

            var info = {
                'Episodes': anime.num_episodes,
                'Rank': `#${anime.rank}`,
                'Popularity': `#${anime.popularity}`,
                'Score': anime.mean,
                'Type': anime.media_type,
                'Episode duration': `${Math.floor(anime.average_episode_duration / 60)} min per ep`,
                'Rating': anime.rating,
                'Status': anime.status,
                'Start date': anime.start_date,
                'End date': anime.end_date,
                'Source': anime.source,
                'Studio': anime.studio ? anime.studios[0].name : ' - ',
                'Season': anime.start_season ? `${anime.start_season.season}, ${anime.start_season.year}` : '???',
                'NSFW': anime.nsfw

            }

            return (  
                <ImageBackground source={{ uri: anime.main_picture.large }} style={styles.image}>
                    <LinearGradient style={{flex: 1}} colors={['#17009c', 'rgba(173,173,173,0.8)','#5c007a']}>
                        <ScrollView>
                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.7)', margin: 8, borderRadius: 10}}>
                                <Image source={{ uri: anime.main_picture.large }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 115, height: 170, flex: 1, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}/>
                                <View style={{flex: 1, paddingHorizontal: 8, paddingVertical: 4}}>
                                    <Text numberOfLines={2} style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 18 }}>{anime.title}</Text>
                                    <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 10, marginTop: -2 }}>{anime.alternative_titles.ja}</Text>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 4}}>
                                        {
                                            anime.genres.map((val,i) => {
                                                return (
                                                    <Text key={i} style={{ fontSize: 10, fontFamily: 'SpaceGrotesk-Medium', marginRight: 4, marginVertical: 2, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>{val.name}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                            {
                                (() => {
                                    if(this.props.anime[this.props.route.params.id].anime.my_list_status){
                                        return (
                                            <View>
                                                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.7)', marginHorizontal: 8, marginBottom: 8, borderRadius: 36 }}>
                                                    <View style={{margin: 8, flex: 1, flexGrow: 2}}>
                                                        <Button title={ this.getStatus() } 
                                                            type='outline' 
                                                            titleStyle={styles.buttonText} 
                                                            buttonStyle={styles.buttonStyle} 
                                                            onPress={this.setmodal_status}
                                                            icon={ <Icon name="angle-down"  type='font-awesome' size={18} color="black" style={{ paddingLeft: 8 }}  /> } 
                                                            iconRight={true}
                                                            loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status ? true : false} 
                                                            loadingProps={{color: '#000'}}
                                                        />
                                                    </View>
                                                    <View style={{marginVertical: 8, marginRight: 8, flex: 1}}>
                                                        <Button 
                                                            title={anime.my_list_status.num_episodes_watched === 0 ? '-' : `${anime.my_list_status.num_episodes_watched}`} 
                                                            type='outline' 
                                                            titleStyle={styles.buttonText} 
                                                            buttonStyle={styles.buttonStyleSeen}
                                                            onPress={this.setmodal_episode}
                                                            icon={ <Icon name="eye" type='font-awesome' size={18} color="black" style={{ paddingLeft: 10 }} /> } 
                                                            iconRight={true}
                                                            loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.episode !== null ? true : false} 
                                                            loadingProps={{color: '#000'}}
                                                        />
                                                    </View>
                                                    <View style={{marginVertical: 8, marginRight: 8, flex: 1}}>
                                                        <Button title={anime.my_list_status.score === 0 ? '-' : `${anime.my_list_status.score}`} 
                                                            type='outline' 
                                                            titleStyle={styles.buttonText} 
                                                            buttonStyle={styles.buttonStyleRating}
                                                            icon={ <Icon name="thumbs-up" type='font-awesome' size={18} color="black" style={{ paddingLeft: 10 }} /> } 
                                                            iconRight={true}
                                                            loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.rating !== null ? true : false} 
                                                            loadingProps={{color: '#000'}}
                                                            onPress={this.setmodal_rating}
                                                        />
                                                    </View>
                                                </View>
                                                <Modal animationType="fade" transparent={true} visible={this.state.modal_status} onRequestClose={this.setmodal_status}>
                                                    <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={this.setmodal_status}>
                                                    <TouchableWithoutFeedback>
                                                        <View style={styles.modalView}>
                                                            <Text style={styles.modalHeading}>Set your status</Text>
                                                            <View style={{margin: 4}}>
                                                            <Button title='Watching' 
                                                                type={ anime.my_list_status.status === 'watching' ? 'solid' : 'outline' } 
                                                                titleStyle={styles.buttonText} 
                                                                buttonStyle={ anime.my_list_status.status === 'watching' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                                                onPress={() => this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status : `watching-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}` }, this.props.access_token)} 
                                                                loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status === 'watching' ? true : false} 
                                                                loadingProps={{color: '#000'}}
                                                            />
                                                            </View>
                                                            <View style={{margin: 4}}>
                                                            <Button title='Plan to Watch' 
                                                                type={ anime.my_list_status.status === 'plan_to_watch' ? 'solid' : 'outline' } 
                                                                titleStyle={styles.buttonText} 
                                                                buttonStyle={ anime.my_list_status.status === 'plan_to_watch' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                                                onPress={() => this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `plan_to_watch-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}` }, this.props.access_token)}
                                                                loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status === 'plan_to_watch' ? true : false} 
                                                                loadingProps={{color: '#000'}}
                                                            />
                                                            </View>
                                                            <View style={{margin: 4}}>
                                                            <Button title='On Hold' 
                                                                type={ anime.my_list_status.status === 'on_hold' ? 'solid' : 'outline' } 
                                                                titleStyle={styles.buttonText} 
                                                                buttonStyle={ anime.my_list_status.status === 'on_hold' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                                                onPress={()=>this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `on_hold-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}`}, this.props.access_token)} 
                                                                loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status === 'on_hold' ? true : false} 
                                                                loadingProps={{color: '#000'}}
                                                            />
                                                            </View>
                                                            <View style={{margin: 4}}>
                                                            <Button title='Dropped' 
                                                                type={ anime.my_list_status.status === 'dropped' ? 'solid' : 'outline' } 
                                                                titleStyle={styles.buttonText} 
                                                                buttonStyle={ anime.my_list_status.status === 'dropped' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                                                onPress={()=>this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `dropped-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}`}, this.props.access_token)} 
                                                                loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status === 'dropped' ? true : false} 
                                                                loadingProps={{color: '#000'}}
                                                            />
                                                            </View>
                                                            <View style={{margin: 4}}>
                                                            <Button title='Completed' 
                                                                type={ anime.my_list_status.status === 'completed' ? 'solid' : 'outline' } 
                                                                titleStyle={styles.buttonText} 
                                                                buttonStyle={ anime.my_list_status.status === 'completed' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                                                onPress={()=>this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status: `completed-${this.props.anime[this.props.route.params.id].anime.my_list_status.status}`}, this.props.access_token)} 
                                                                loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime.id && this.props.anime[this.props.route.params.id].isUpdating.status === 'completed' ? true : false} 
                                                                loadingProps={{color: '#000'}}
                                                            />
                                                            </View>
                                                        </View>
                                                        </TouchableWithoutFeedback>
                                                    </TouchableOpacity>
                                                </Modal>
                                                <Modal animationType="fade" transparent={true} visible={this.state.modal_episode} onRequestClose={this.setmodal_episode}>
                                                    <TouchableOpacity style={styles.centeredView} onPressOut={this.setmodal_episode} activeOpacity={1}>
                                                        <TouchableWithoutFeedback>
                                                            <View style={styles.modalViewEpisodes}>
                                                                <Text style={styles.modalHeading}>Set Ep Watched</Text>
                                                                <View>
                                                                    <WheelPicker 
                                                                        selectedItemTextFontFamily='SpaceGrotesk-Bold' 
                                                                        itemTextFontFamily='SpaceGrotesk-SemiBold' 
                                                                        selectedItem={anime.my_list_status.num_episodes_watched} 
                                                                        data={ [...Array(anime ? anime.num_episodes + 1 : 1).keys()].map(String) } 
                                                                        onItemSelected={ (val) => { if(anime.my_list_status.num_episodes_watched !== val) this.setState({ num_episodes_watched_changed: val }) }} 
                                                                    />
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </TouchableOpacity>
                                                </Modal>
                                                <Modal animationType="fade" transparent={true} visible={this.state.modal_rating} onRequestClose={this.setmodal_rating}>
                                                    <TouchableOpacity style={styles.centeredView} onPressOut={this.setmodal_rating} activeOpacity={1}>
                                                        <TouchableWithoutFeedback>
                                                            <View style={styles.modalViewEpisodes}>
                                                                <Text style={styles.modalHeading}>Set Rating</Text>
                                                                <View>
                                                                    <WheelPicker
                                                                        selectedItemTextFontFamily='SpaceGrotesk-Bold' 
                                                                        itemTextFontFamily='SpaceGrotesk-SemiBold' 
                                                                        selectedItem={anime.my_list_status.score} 
                                                                        data={ ['0 Not Rated', '1 Appalling', '2 Horrible', '3 Very Bad', '4 Bad', '5 Average', '6 Fine', '7 Good', '8 Very Good', '9 Great', '10 Masterpiece'] } 
                                                                        onItemSelected={ (val) => { if(anime.my_list_status.score !== val) this.setState({ rating_changed : val }) } } 
                                                                    />
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </TouchableOpacity>
                                                </Modal>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.6)', marginHorizontal: 8, marginBottom: 8, borderRadius: 36 }}>
                                                <View style={{margin: 8, flex: 1, flexGrow: 2}}>
                                                    <Button title='Add to Profile' 
                                                        type='outline' 
                                                        titleStyle={styles.buttonText} 
                                                        buttonStyle={styles.buttonStyleAddProfile} 
                                                        icon={ <Icon name="plus"  type='font-awesome' size={18} color="black" style={{ paddingRight: 16 }}  /> } 
                                                        loading={this.props.anime[this.props.route.params.id].isUpdating.id === this.props.anime[this.props.route.params.id].id && this.props.anime[this.props.route.params.id].isUpdating.status ? true : false} 
                                                        loadingProps={{color: '#000'}}
                                                        onPress={()=>this.props.updateAnime(this.props.anime[this.props.route.params.id].id, { status : `plan_to_watch` }, this.props.access_token)} 
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }
                                })()
                            }

                            <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.7)', padding: 12, marginHorizontal: 8, borderRadius: 10}}>
                                <Text style={{fontSize: 18, fontFamily: 'SpaceGrotesk-Bold'}}>Info</Text>
                                {
                                    Object.keys(info).map((val,i)=> {
                                        if(i < 8 || this.state.show_more_info){
                                            return (
                                                <View key={i} style={{ paddingHorizontal: 4}}>
                                                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', paddingVertical: 4 }}>
                                                        <View style={{ flex: 1, flexGrow: 1 }}>
                                                            <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14}}>{val}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, flexGrow: 1 }}>
                                                            <Text style={{fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14, textAlign: 'right'}}>{info[val]}</Text>
                                                        </View>
                                                    </View>
                                                    <Divider style={{ backgroundColor: 'grey'}} />
                                                </View>
                                            )
                                        }
                                    })
                                }
                                <Text onPress={() => this.setState({ show_more_info: !this.state.show_more_info })} style={{fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', marginBottom: -8, padding: 8}}>Show { this.state.show_more_info ? 'less' : 'more' }</Text>
                            </View>

                            <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.7)', padding: 12, margin: 8, marginBottom: 0, borderRadius: 10}}>
                                <Text style={{fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingBottom: 8}}>Synopsis</Text>
                                <Text numberOfLines={this.state.show_more_synopsis ? null : 4 } style={{ textAlign: 'justify', fontSize: 14, fontFamily: 'SpaceGrotesk-Medium', paddingHorizontal: 4}}>{anime.synopsis}</Text>
                                <Text onPress={() => this.setState({ show_more_synopsis: !this.state.show_more_synopsis })} style={{fontSize: 14, fontFamily: 'SpaceGrotesk-Bold', textAlign: 'center', textDecorationLine: 'underline', marginBottom: -8, padding: 8}}>Show { this.state.show_more_synopsis ? 'less' : 'more' }</Text>
                            </View>

                            <View horizontal style={{flex: 1, height: 198, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 8, marginHorizontal: 8, borderRadius: 10}}>
                                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>Characters</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal 
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}    
                                >
                                {
                                    anime.characters.map((l,i) => (
                                        <TouchableOpacity activeOpacity={0.9} key={i} >
                                            <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                <Image source={{ uri: l.image_url }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 100, height: 150, flex: 1 }}/>
                                                <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', width: '100%', zIndex: 1 }}>
                                                    <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}>{l.name.split(', ')[1] + ' ' + l.name.split(', ')[0]}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                            </View>

                            <View horizontal style={{flex: 1, height: 228, backgroundColor: 'rgba(255,255,255,0.7)', margin: 8, marginBottom: 0, borderRadius: 10}}>
                                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>Related Anime</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal 
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}    
                                >
                                {
                                    anime.related_anime.map((l,i) => (
                                        <TouchableOpacity activeOpacity={0.9} key={i} onPress={()=>this.viewAnime(l.node.id)} onPressIn={()=>this.setState({ related_scroll_id: l.node.id })} onPressOut={()=>this.setState({ related_scroll_id: null })}>
                                            <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                <Image source={{ uri: l.node.main_picture.large }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 120, height: 180, flex: 1 }}/>
                                                <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', width: '100%', zIndex: 1 }}>
                                                    <TextTicker
                                                        numberOfLines={1}
                                                        style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}
                                                        duration={3000}
                                                        loop
                                                        bounce
                                                        repeatSpacer={50}
                                                        marqueeDelay={200}
                                                        disabled={ this.state.related_scroll_id === l.node.id ? false : true }
                                                    >
                                                        {l.node.title}
                                                    </TextTicker>
                                                    <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Medium', fontSize: 10 }}>{l.relation_type_formatted}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                            </View>
                                 
                            <View horizontal style={{flex: 1, height: 228, backgroundColor: 'rgba(255,255,255,0.7)', margin: 8, borderRadius: 10}}>
                                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', paddingLeft: 12, padding: 8 }}>Recommendations</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal 
                                    style={{ left: 0, bottom: 8, position: 'absolute', marginHorizontal: -12 }}
                                    contentContainerStyle={{ paddingHorizontal: 18 }}    
                                >
                                {
                                    anime.recommendations.map((l,i) => (
                                        <TouchableOpacity activeOpacity={0.9} key={i} onPress={()=>this.viewAnime(l.node.id)} onPressIn={()=>this.setState({ recom_scroll_id: l.node.id })} onPressOut={()=>this.setState({ recom_scroll_id: null })}>
                                            <View style={{ marginHorizontal: 4, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                <Image source={{ uri: l.node.main_picture.large }} PlaceholderContent={<ActivityIndicator color='#000'/>} style={{ width: 120, height: 180, flex: 1 }}/>
                                                <View style={{ padding: 4, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', width: '100%', zIndex: 1 }}>
                                                    {/* <Text numberOfLines={1} style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}>{l.node.title}</Text> */}
                                                    <TextTicker
                                                        numberOfLines={1}
                                                        style={{ fontFamily: 'SpaceGrotesk-Bold', fontSize: 12 }}
                                                        duration={3000}
                                                        loop
                                                        bounce
                                                        repeatSpacer={50}
                                                        marqueeDelay={200}
                                                        disabled={ this.state.recom_scroll_id === l.node.id ? false : true }
                                                    >
                                                        {l.node.title}
                                                    </TextTicker>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                            </View>

                            {
                                (() => {
                                    if(this.props.anime[this.props.route.params.id].anime.my_list_status)
                                        return (
                                            <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.7)', marginHorizontal: 8, marginBottom: 8, borderRadius: 36 }}>
                                                <View style={{margin: 8, flex: 1, flexGrow: 1}}>
                                                    <Button title='Delete from Profile' 
                                                        type='outline' 
                                                        titleStyle={styles.buttonText} 
                                                        buttonStyle={styles.buttonStyleAddProfile} 
                                                        icon={ <Icon name="trash" type='font-awesome' size={18} color="black" style={{ paddingRight: 16 }}  /> } 
                                                        loading={this.props.anime[this.props.route.params.id].isDeleting ? true : false} 
                                                        loadingProps={{color: '#000'}}
                                                        onPress={()=>this.props.deleteListAnime(this.props.anime[this.props.route.params.id].id, this.props.anime[this.props.route.params.id].anime.my_list_status.status, this.props.access_token)} 
                                                    />
                                                </View>
                                            </View>
                                        )
                                })()
                            }
                            
                        </ScrollView>
                    </LinearGradient>
                </ImageBackground>
            );
        }
    }
}

const Tab = createMaterialTopTabNavigator()

class Anime extends React.Component {

    render() {
        <Tab.Navigator backBehavior="none" lazy 
            sceneContainerStyle={{backgroundColor: 'transparent'}} 
            style={{ backgroundColor: 'transparent' }} 
            tabBarOptions={{ indicatorStyle: { borderBottomWidth: 5, borderColor: '#fff' }, scrollEnabled: true, labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' }, style: { backgroundColor: 'transparent' } }} 
        >
            <Tab.Screen name='details' options={{ title: 'Details' }}>
                {() => <List type='watching' {...this.props} />}
            </Tab.Screen>
            <Tab.Screen name='episodes' options={{ title: 'Episodes' }}>
                {() => <List type='watching' {...this.props} />}
            </Tab.Screen>
            
        </Tab.Navigator> 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    },
    buttonText: {
        color: '#000',
        fontFamily: 'SpaceGrotesk-Bold'
    },
    buttonStyle: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20
    },
    buttonStyleSeen: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20
    },
    buttonStyleRating: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20
    },
    buttonStyleAddProfile: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewEpisodes: {
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalHeading: {
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 16,
        fontSize: 18
    },
    modalStatusButtons: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20,
        width: 180,
    },
    modalStatusButtonsActive: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 20,
        width: 180,
        backgroundColor: '#a1a1a1'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

/*
{
    "id": 31964,
    "title": "Boku no Hero Academia",
    "main_picture": {
        "medium": "https://api-cdn.myanimelist.net/images/anime/10/78745.jpg",
        "large": "https://api-cdn.myanimelist.net/images/anime/10/78745l.jpg"
    },
    "alternative_titles": {
        "synonyms": [],
        "en": "My Hero Academia",
        "ja": "僕のヒーローアカデミア"
    },
    "start_date": "2016-04-03",
    "end_date": "2016-06-26",
    "synopsis": "The appearance of \"quirks,\" newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.\n\nSince he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might's quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor!\n\nEnduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year's freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.\n\n[Written by MAL Rewrite]",
    "mean": 8.16,
    "rank": 342,
    "popularity": 7,
    "num_list_users": 1688723,
    "num_scoring_users": 1123942,
    "nsfw": "white",
    "created_at": "2015-10-27T08:31:53+00:00",
    "updated_at": "2020-11-18T14:28:46+00:00",
    "media_type": "tv",
    "status": "finished_airing",
    "genres": [
        {
            "id": 1,
            "name": "Action"
        },
        {
            "id": 4,
            "name": "Comedy"
        },
        {
            "id": 23,
            "name": "School"
        },
        {
            "id": 27,
            "name": "Shounen"
        },
        {
            "id": 31,
            "name": "Super Power"
        }
    ],
    "my_list_status": {
        "status": "completed",
        "score": 9,
        "num_episodes_watched": 13,
        "is_rewatching": false,
        "updated_at": "2020-11-04T21:09:56+00:00"
    },
    "num_episodes": 13,
    "start_season": {
        "year": 2016,
        "season": "spring"
    },
    "broadcast": {
        "day_of_the_week": "sunday",
        "start_time": "17:00"
    },
    "source": "manga",
    "average_episode_duration": 1470,
    "rating": "pg_13",
    "pictures": [
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/9/76970.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/9/76970l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/2/77692.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/2/77692l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/10/78745.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/10/78745l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1109/92566.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1109/92566l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1618/92567.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1618/92567l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1600/92568.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1600/92568l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1262/92569.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1262/92569l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1949/92570.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1949/92570l.jpg"
        },
        {
            "medium": "https://api-cdn.myanimelist.net/images/anime/1985/96688.jpg",
            "large": "https://api-cdn.myanimelist.net/images/anime/1985/96688l.jpg"
        }
    ],
    "background": "Mangaka Horikoushi Kouhei has noted that American superhero comics are the inspiration for the series, and has based character pages on logos for Marvel and DC comic characters.",
    "related_anime": [
        {
            "node": {
                "id": 33486,
                "title": "Boku no Hero Academia 2nd Season",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/85221.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/85221l.jpg"
                }
            },
            "relation_type": "sequel",
            "relation_type_formatted": "Sequel"
        },
        {
            "node": {
                "id": 33929,
                "title": "Boku no Hero Academia: Sukue! Kyuujo Kunren!",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/1470/103166.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/1470/103166l.jpg"
                }
            },
            "relation_type": "side_story",
            "relation_type_formatted": "Side story"
        },
        {
            "node": {
                "id": 35262,
                "title": "Boku no Hero Academia 2nd Season: Hero Note",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/11/84951.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/11/84951l.jpg"
                }
            },
            "relation_type": "summary",
            "relation_type_formatted": "Summary"
        }
    ],
    "related_manga": [],
    "recommendations": [
        {
            "node": {
                "id": 30276,
                "title": "One Punch Man",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/76049.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/76049l.jpg"
                }
            },
            "num_recommendations": 89
        },
        {
            "node": {
                "id": 34572,
                "title": "Black Clover",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/2/88336.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/2/88336l.jpg"
                }
            },
            "num_recommendations": 29
        },
        {
            "node": {
                "id": 24833,
                "title": "Ansatsu Kyoushitsu",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/5/75639.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/5/75639l.jpg"
                }
            },
            "num_recommendations": 27
        },
        {
            "node": {
                "id": 20,
                "title": "Naruto",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/17405.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/17405l.jpg"
                }
            },
            "num_recommendations": 25
        },
        {
            "node": {
                "id": 11061,
                "title": "Hunter x Hunter (2011)",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/11/33657.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/11/33657l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 20583,
                "title": "Haikyuu!!",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/7/76014.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/7/76014l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 9941,
                "title": "Tiger & Bunny",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/29466.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/29466l.jpg"
                }
            },
            "num_recommendations": 21
        },
        {
            "node": {
                "id": 33489,
                "title": "Little Witch Academia (TV)",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/13/83934.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/13/83934l.jpg"
                }
            },
            "num_recommendations": 18
        },
        {
            "node": {
                "id": 28999,
                "title": "Charlotte",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/12/74683.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/12/74683l.jpg"
                }
            },
            "num_recommendations": 13
        },
        {
            "node": {
                "id": 32182,
                "title": "Mob Psycho 100",
                "main_picture": {
                    "medium": "https://api-cdn.myanimelist.net/images/anime/8/80356.jpg",
                    "large": "https://api-cdn.myanimelist.net/images/anime/8/80356l.jpg"
                }
            },
            "num_recommendations": 10
        }
    ],
    "studios": [
        {
            "id": 4,
            "name": "Bones"
        }
    ],
    "statistics": {
        "status": {
            "watching": "82759",
            "completed": "1464638",
            "on_hold": "15730",
            "dropped": "16353",
            "plan_to_watch": "113874"
        },
        "num_list_users": 1693354
    }
}
*/