import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Linking } from 'react-native';
import { connect } from 'react-redux';
import { getToken } from '../redux/ActionCreator'

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token))
})

class Home extends React.Component {

    handleOpenURL = ({ url }) => {
        if (url.indexOf("?id") !== -1) 
          if (url)
            this.props.getToken(url.split('=')[1])
    };

    componentDidMount(){
        Linking.addEventListener('url', this.handleOpenURL)
    }

    componentWillUnmount(){
        Linking.removeEventListener('url')
    }

    render() { 
        return (
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                <View style={{padding: 16}}>
                    <View>
                        <Text>{this.props.auth.access_token}</Text>
                    </View>
                    
                    <View style={{paddingVertical: 8}}>
                        <Button
                            title="Login"
                            onPress={() => Linking.openURL('http://10.0.2.2:3000/auth') }
                        />
                    </View>

                    <View style={{paddingVertical: 8}}>
                        <Button
                            disabled={ this.props.auth.access_token ? false : true}
                            title="Go to Search"
                            onPress={() => this.props.navigation.navigate('Search') }
                        />
                    </View>
                    
                    
                </View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);