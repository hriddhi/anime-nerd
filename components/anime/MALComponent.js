import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAnimeStatus, updateAnime, deleteListAnime } from '../../redux/ActionCreator'
import { WheelPicker } from 'react-native-wheel-picker-android'

const mapStateToProps = (state, props) => ({
    mal: state.mal[props.id],
    access_token: state.auth.access_token,
})

const mapDispatchToProps = dispatch => ({
    fetchAnimeStatus: (id, token) => dispatch(fetchAnimeStatus(id, token)),
    updateAnime: (id, status, token) => dispatch(updateAnime(id, status, token)),
    deleteListAnime: (id, status, token) => dispatch(deleteListAnime(id, status, token)),
})

class MAL extends React.PureComponent {

    state = {
        modal_status: false,
        modal_episode: false,
        modal_rating: false,
        num_episodes_watched_changed: false,
        rating_changed: false
    }

    componentDidMount() {
        if(this.props.mal === undefined)
            this.props.fetchAnimeStatus(this.props.id, this.props.access_token)
    }

    setmodal_status = () => {
        this.setState({ modal_status: !this.state.modal_status });
    }

    setmodal_episode = () => {
        this.setState({ modal_episode: !this.state.modal_episode });
        if(this.props.mal && this.state.num_episodes_watched_changed !== false)
            this.props.updateAnime(this.props.id, { episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.props.mal.episode && this.state.num_episodes_watched_changed !== false && this.props.mal.episode === 0)
            this.props.updateAnime(this.props.mal.id, { status: `watching-${this.props.mal.status}`, episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.props.mal.episode && this.state.num_episodes_watched_changed !== false && this.state.num_episodes_watched_changed === this.props.mal.total)
            this.props.updateAnime(this.props.id, { status: `completed-${this.props.mal.status}`, episode: this.state.num_episodes_watched_changed }, this.props.access_token)
        if(this.state.num_episodes_watched_changed !== false)
            this.setState({ num_episodes_watched_changed: false })
    }

    setmodal_rating = () => {
        this.setState({ modal_rating: !this.state.modal_rating });
        console.log(this.state.rating_changed)
        if(this.props.mal && this.state.rating_changed !== false)
            this.props.updateAnime(this.props.id, { rating: this.state.rating_changed }, this.props.access_token)
        if(this.state.rating_changed !== false)
            this.setState({ rating_changed: false })
    }

    getStatus = () => {
        var status = this.props.mal.status
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

    modal_status = (anime) => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.modal_status} onRequestClose={this.setmodal_status}>
                <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={this.setmodal_status}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Text style={styles.modalHeading}>Set your status</Text>
                            <View style={{margin: 4}}>
                            <Button title='Watching' 
                                type={ anime.status === 'watching' ? 'solid' : 'outline' } 
                                titleStyle={styles.buttonText} 
                                buttonStyle={ anime.status === 'watching' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                onPress={() => this.props.updateAnime(this.props.id, { status : `watching-${this.props.mal.status}` }, this.props.access_token)} 
                                loading={this.props.mal.isUpdating.status === 'watching' ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                            </View>
                            <View style={{margin: 4}}>
                            <Button title='Plan to Watch' 
                                type={ anime.status === 'plan_to_watch' ? 'solid' : 'outline' } 
                                titleStyle={styles.buttonText} 
                                buttonStyle={ anime.status === 'plan_to_watch' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                onPress={() => this.props.updateAnime(this.props.id, { status: `plan_to_watch-${this.props.mal.status}` }, this.props.access_token)}
                                loading={this.props.mal.isUpdating.status === 'plan_to_watch' ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                            </View>
                            <View style={{margin: 4}}>
                            <Button title='On Hold' 
                                type={ anime.status === 'on_hold' ? 'solid' : 'outline' } 
                                titleStyle={styles.buttonText} 
                                buttonStyle={ anime.status === 'on_hold' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                onPress={()=>this.props.updateAnime(this.props.id, { status: `on_hold-${this.props.mal.status}`}, this.props.access_token)} 
                                loading={this.props.mal.isUpdating.status === 'on_hold' ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                            </View>
                            <View style={{margin: 4}}>
                            <Button title='Dropped' 
                                type={ anime.status === 'dropped' ? 'solid' : 'outline' } 
                                titleStyle={styles.buttonText} 
                                buttonStyle={ anime.status === 'dropped' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                onPress={()=>this.props.updateAnime(this.props.id, { status: `dropped-${this.props.mal.status}`}, this.props.access_token)} 
                                loading={this.props.mal.isUpdating.status === 'dropped' ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                            </View>
                            <View style={{margin: 4}}>
                            <Button title='Completed' 
                                type={ anime.status === 'completed' ? 'solid' : 'outline' } 
                                titleStyle={styles.buttonText} 
                                buttonStyle={ anime.status === 'completed' ? styles.modalStatusButtonsActive : styles.modalStatusButtons } 
                                onPress={()=>this.props.updateAnime(this.props.id, { status: `completed-${this.props.mal.status}`}, this.props.access_token)} 
                                loading={this.props.mal.isUpdating.status === 'completed' ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    modal_episode = (anime) => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.modal_episode} onRequestClose={this.setmodal_episode}>
                <TouchableOpacity style={styles.centeredView} onPressOut={this.setmodal_episode} activeOpacity={1}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalViewEpisodes}>
                            <Text style={styles.modalHeading}>Set Ep Watched</Text>
                            <View>
                                <WheelPicker 
                                    selectedItemTextFontFamily='SpaceGrotesk-Bold' 
                                    itemTextFontFamily='SpaceGrotesk-SemiBold' 
                                    selectedItem={anime.episode} 
                                    data={ [...Array(anime ? anime.total + 1 : 1).keys()].map(String) } 
                                    onItemSelected={ (val) => { if(anime.episode !== val) this.setState({ num_episodes_watched_changed: val }) }} 
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    modal_rating = (anime) => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.modal_rating} onRequestClose={this.setmodal_rating}>
                <TouchableOpacity style={styles.centeredView} onPressOut={this.setmodal_rating} activeOpacity={1}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalViewEpisodes}>
                            <Text style={styles.modalHeading}>Set Rating</Text>
                            <View>
                                <WheelPicker
                                    selectedItemTextFontFamily='SpaceGrotesk-Bold' 
                                    itemTextFontFamily='SpaceGrotesk-SemiBold' 
                                    selectedItem={anime.rating} 
                                    data={ ['0 Not Rated', '1 Appalling', '2 Horrible', '3 Very Bad', '4 Bad', '5 Average', '6 Fine', '7 Good', '8 Very Good', '9 Great', '10 Masterpiece'] } 
                                    onItemSelected={ (val) => { if(anime.rating !== val) this.setState({ rating_changed : val }) } } 
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        if(this.props.mal && this.props.mal.status){
            return (
                <React.Fragment>
                    <View style={{flex: 1, overflow: 'hidden', flexDirection: 'row',  backgroundColor: 'rgba(255,255,255,0.8)', marginBottom: 8, borderRadius: 36 }}>
                        <View style={{flex: 1, flexGrow: 3}}>
                            <Button title={ this.getStatus() } 
                                type='outline' 
                                titleStyle={styles.buttonText} 
                                buttonStyle={{ height: '100%', borderWidth: 0 }} 
                                onPress={this.setmodal_status}
                                icon={ <Icon name="angle-down" type='font-awesome' size={18} color="black" style={{ paddingLeft: 8 }}  /> } 
                                iconRight={true}
                                loading={this.props.mal.isUpdating.status ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                        </View>
                        <View style={{ flex: 1, flexGrow: 1.5}}>
                            <Button 
                                title={this.props.mal.episode === 0 ? '-' : `${this.props.mal.episode}`} 
                                type='outline' 
                                titleStyle={styles.buttonText} 
                                buttonStyle={{ height: '100%', borderRadius: 0, borderTopWidth: 0, borderBottomWidth: 0, borderColor: 'grey' }}
                                onPress={this.setmodal_episode}
                                icon={ <Icon name="eye" type='font-awesome' size={18} color="black" style={{ paddingLeft: 10 }} /> } 
                                iconRight={true}
                                loading={this.props.mal.isUpdating.episode !== null ? true : false} 
                                loadingProps={{color: '#000'}}
                            />
                        </View>
                        <View style={{flex: 1, flexGrow: 1.5}}>
                            <Button title={this.props.mal.rating === 0 ? '-' : `${this.props.mal.rating}`} 
                                type='outline' 
                                titleStyle={styles.buttonText} 
                                buttonStyle={{ height: '100%', borderWidth: 0 }}
                                icon={ <Icon name="thumbs-up" type='font-awesome' size={18} color="black" style={{ paddingLeft: 10 }} /> } 
                                iconRight={true}
                                loading={this.props.mal.isUpdating.rating !== null ? true : false} 
                                loadingProps={{color: '#000'}}
                                onPress={this.setmodal_rating}
                            />
                        </View>
                        <View style={{flex: 1, flexGrow: 1.2}}>
                            <Button icon={<Icon name="trash" type='font-awesome' size={18} color="black"/>} 
                                type='outline' 
                                titleStyle={styles.buttonText}
                                buttonStyle={{ height: '100%', borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, borderColor: 'grey'  }}
                                loading={this.props.mal.isDeleting ? true : false} 
                                loadingProps={{color: '#000'}}
                                onPress={()=>this.props.deleteListAnime(this.props.id, this.props.mal.status, this.props.access_token)} 
                            />
                        </View>
                    </View>
                        
                    { this.state.modal_status ? this.modal_status(this.props.mal) : null }

                    { this.state.modal_episode ? this.modal_episode(this.props.mal) : null }

                    { this.state.modal_rating ? this.modal_rating(this.props.mal) : null }
                   
                </React.Fragment>
            )
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.8)', marginBottom: 8, borderRadius: 36 }}>
                    <View style={{flex: 1, flexGrow: 2}}>
                        <Button title='Add to Profile' 
                            type='outline' 
                            titleStyle={styles.buttonText} 
                            buttonStyle={{ height: '100%', borderWidth: 0 }} 
                            icon={ <Icon name="plus"  type='font-awesome' size={18} color="black" style={{ paddingRight: 16 }}  /> } 
                            loading={ !this.props.mal || (this.props.mal.isLoading || this.props.mal.isUpdating.status) ? true : false} 
                            loadingProps={{color: '#000'}}
                            onPress={()=>this.props.updateAnime(this.props.id, { status : `plan_to_watch` }, this.props.access_token)} 
                        />
                    </View>
                </View>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MAL)

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