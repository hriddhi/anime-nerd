import React, { Component } from 'react';
import { StatusBar, Text, ActivityIndicator, ScrollView, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { getToken } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient'

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token))
})

class Web extends Component {

    state = {
        loading: false
    }

    onNavigationStateChange = (navigationState) => {
        const url = navigationState.url;
        //this.setState({ loading: true })
        if (url.indexOf("?id") !== -1) 
            if (url){
                this.props.getToken(url.split('=')[1])
                this.props.navigation.goBack()
            }
    };

    render() {

        return (
            <React.Fragment>
                <LinearGradient style={{flex: 1, position: 'absolute', top: 0, zIndex: 10, width: '100%'  }} colors={['#17009c', '#17009c', 'rgba(255,255,255,0.1)']}>
                    <Header
                        leftComponent={<Icon name="arrow-left" type='font-awesome' size={20} color="white" style={{ padding: 16 }} onPress={()=>this.props.navigation.pop()} />}
                        leftContainerStyle={{ paddingHorizontal: 8 }}
                        centerComponent={<Text numberOfLines={1} style={{ color: '#fff', textAlign: 'left', fontFamily: 'SpaceGrotesk-Medium', fontSize: 20 }}>{this.props.route.params.uri}</Text>}
                        centerContainerStyle={{ padding: 0, margin: 0 }}
                        rightComponent={ this.state.loading ? <ActivityIndicator color='white' /> : null }
                        containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0}}
                        placement='left'
                    />
                </LinearGradient>
                <WebView
                    onLoadStart={() => this.setState({ loading: true }) }
                    onLoadEnd={() => this.setState({ loading: false }) }
                    source={{ uri: this.props.route.params.uri }}
                    onNavigationStateChange={this.onNavigationStateChange}
                    allowsBackForwardNavigationGestures={true}
                    containerStyle={{ marginTop: StatusBar.currentHeight }}
                />
                
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Web)