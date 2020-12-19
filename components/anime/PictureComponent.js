import React from 'react';
import { Modal, FlatList, View, Text, ActivityIndicator, TouchableOpacity, Linking, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchAnimePictures } from '../../redux/ActionCreator'
import ImageViewer from 'react-native-image-zoom-viewer';

const mapStateToProps = (state, props) => ({
    pictures: state.pictures[props.route.params.id],
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    fetchAnimePictures: (id) => dispatch(fetchAnimePictures(id))
})

class Picture extends React.PureComponent {

    state = {
        current: null
    }

    componentDidMount(){
        if(this.props.pictures === undefined)
            this.props.fetchAnimePictures(this.props.route.params.id)
        
    }

    render(){   
        if(this.props.pictures && this.props.pictures.err){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'  }}>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>An unexpected error occured</Text>
                </View>
            )
        } else if(this.props.pictures && this.props.pictures.isLoading){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                    <ActivityIndicator size='large' color='#fff'/>
                    <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: '#fff', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Loading pictures...</Text>
                </View>
            )
        } else if(this.props.pictures) {
            return (
                <React.Fragment>
                    <Modal visible={ this.state.current !== null ? true : false } transparent onRequestClose={() => this.state.current !== null ? this.setState({ current: null }) : null }>
                        <ImageViewer imageUrls={this.props.pictures.pictures.map((val) => ({ url: val.large }) )}
                            index={this.state.current}
                            enableSwipeDown
                            onSwipeDown={() => this.setState({ current: null })}
                            onCancel={() => this.setState({ current: null })}
                            
                        />
                    </Modal>
                    <FlatList data={this.props.pictures.pictures} 
                        numColumns={2}
                        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 8 }}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() =>this.setState({ current: index })  }>
                                    <View style={{ padding: 5 }}>
                                    <Image source={{ uri: item.large }} style={{ aspectRatio: 3/5, width: '100%', borderRadius: 10 }}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()} 
                        ListEmptyComponent={
                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>No episodes found</Text>
                            </View>
                        }
                    />
                </React.Fragment>
            )
        } else {
            return null;
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture)