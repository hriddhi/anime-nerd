import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Linking, Text, Image } from 'react-native';
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
            <View style={styles.container}>
                <Image resizeMode='contain' source={require('./anime_character.png')} style={{width: 180, height: 180, alignSelf: 'center'}}/>
                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', color: 'rgba(255,255,255,0.9)', fontSize: 16, paddingVertical: 16, alignSelf: 'center' }}>Onii-chan, you are not logged in!</Text>
                <Button
                    title='Login with MAL'
                    type='outline'
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => Linking.openURL('https://animenerd.herokuapp.com/auth') }
                />
            </View>
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