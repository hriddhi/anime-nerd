import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Linking, Text, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
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
                    onPress={()=>this.props.navigation.navigate('Web',{ uri: 'https://animenerd.herokuapp.com/auth' })}
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

Wrapper = (props) => <Login {...props} navigation={useNavigation()} />

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)