import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Linking } from 'react-native';
import { connect } from 'react-redux';
import { getToken, fetchCompleted } from '../redux/ActionCreator'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import List from './ListComponent'

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchCompleted: (type) => dispatch(fetchCompleted(type))
})

const Tab = createMaterialTopTabNavigator()

class Home extends React.Component {

    render() { 
        return (
            <Tab.Navigator lazy tabBarOptions={{ scrollEnabled: true }}>
                <Tab.Screen name='Watching'>
                    {()=><List type='watching'/>}
                </Tab.Screen>
                <Tab.Screen name='Plan to Watch'>
                    {()=><List type='plan'/>}
                </Tab.Screen>
                <Tab.Screen name='On Hold'>
                    {()=><List type='hold'/>}
                </Tab.Screen>
                <Tab.Screen name='Dropped'>
                    {()=><List type='dropped'/>}
                </Tab.Screen>
                <Tab.Screen name='Completed'>
                    {()=><List type='completed'/>}
                </Tab.Screen>
            </Tab.Navigator>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);