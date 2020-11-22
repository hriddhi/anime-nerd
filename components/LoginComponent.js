import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Linking, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { getToken } from '../redux/ActionCreator'
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token))
})

class Login extends React.Component {

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
            <LinearGradient style={styles.container} colors={['#17009c','#5c007a']}>
                <Text style={{position: 'absolute', top: '10%', left: 16, color: '#fff', fontFamily: 'RobotoCondensed-Regular', fontSize: 32}}>Welcome to</Text>
                <Text style={{position: 'absolute', top: '15%', left: 16, color: '#fff', fontFamily: 'RobotoCondensed-Regular', fontSize: 48}}>AnimeNerd</Text>
                
                <Button
                    title='Login with MAL'
                    type='outline'
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => Linking.openURL('https://animenerd.herokuapp.com/auth') }
                />
                <Text style={{position: 'absolute', bottom: 16, color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 16}}>Made with <Icon name='heart' type='font-awesome' color='#fff' size={12} /> by a nerd for a nerd</Text>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    buttonStyle: {
        borderColor: '#fff',
        borderWidth: 1.2,
        borderRadius: 20,
        color: '#fff',
        width: 200
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);