import React, { useRef, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator, ImageBackground, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Top from './explore/TopContainer'
import Genre from './explore/GenreComponent'
import Character from './explore/TopCharacterComponent'

const mapStateToProps = (state, props) => ({
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const Tab = createMaterialTopTabNavigator()

class Explore extends React.Component {

    state = {
        didFinishInitialAnimation: false
    }

    render() {

        return (
            <React.Fragment>
                <Header
                    centerComponent={<Text style={{ color: this.props.theme[this.props.theme.current].home.top_tab_text_color, fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>EXPLORE</Text>}
                    centerContainerStyle={{ paddingHorizontal: 8 }}
                    rightComponent={
                        <Button icon={<Icon name="search" type='font-awesome-5' size={18} color={this.props.theme[this.props.theme.current].home.top_tab_text_color}/>} 
                            type='outline' 
                            titleStyle={{color: this.props.theme[this.props.theme.current].home.top_tab_text_color }}
                            buttonStyle={{ borderWidth: 0, borderRadius: 20 }}
                            onPress={() => this.props.navigation.navigate('Search')}
                        />
                    }
                    rightContainerStyle={{ justifyContent: 'center', padding: 4 }}
                    containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
                    placement='left'
                />
                <Tab.Navigator backBehavior="none" lazy 
                        sceneContainerStyle={{ backgroundColor: 'transparent' }} 
                        style={{ backgroundColor: 'transparent' }}
                        tabBarOptions={{ tabStyle: { width: 110 }, indicatorStyle: { width: 60, marginHorizontal: 25, borderBottomWidth: 4, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: this.props.theme[this.props.theme.current].home.top_tab_indicator_color }, scrollEnabled: true, labelStyle: { color: this.props.theme[this.props.theme.current].home.top_tab_text_color, fontFamily: 'SpaceGrotesk-SemiBold' }, style: { backgroundColor: 'transparent' } }} 
                        lazyPreloadDistance={1}
                >
                    <Tab.Screen name='genre' component={Genre} options={{ title: 'Genre' }} />
                    <Tab.Screen name='top' component={Top} options={{ title: 'Top' }} />
                    <Tab.Screen name='character' component={Character} options={{ title: 'Character' }} />
                </Tab.Navigator>                
            </React.Fragment>
        )

        
    }
}

export default connect(mapStateToProps)(Explore);