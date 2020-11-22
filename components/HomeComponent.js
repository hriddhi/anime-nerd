import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Linking, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { getToken, fetchCompleted } from '../redux/ActionCreator'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import List from './ListComponent'
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchCompleted: (type) => dispatch(fetchCompleted(type))
})

const Tab = createMaterialTopTabNavigator()

class Home extends React.Component {

    componentDidMount() {
        this.props.navigation.setOptions({ headerRight: () => <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} ><Icon name='search' type='font-awesome' color='#fff' containerStyle={{ backgroundColor: 'transparent', paddingVertical: 8, paddingHorizontal: 16 }}/></TouchableOpacity> })
    }

    render() { 
        return (
            
            <Tab.Navigator backBehavior="none" lazy sceneContainerStyle={{backgroundColor: 'transparent'}} style={{ backgroundColor: 'transparent' }} tabBarOptions={{ indicatorStyle: { borderBottomWidth: 5, borderColor: '#fff' }, scrollEnabled: true, labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' }, style: { backgroundColor: 'transparent' } }} >
                <Tab.Screen name='Watching'>
                    {()=><List type='watching' {...this.props} />}
                </Tab.Screen>
                <Tab.Screen name='Planned'>
                    {()=><List type='plan_to_watch' {...this.props} />}
                </Tab.Screen>
                <Tab.Screen name='On Hold'>
                    {()=><List type='on_hold' {...this.props} />}
                </Tab.Screen>
                <Tab.Screen name='Dropped'>
                    {()=><List type='dropped' {...this.props} />}
                </Tab.Screen>
                <Tab.Screen name='Completed'>
                    {()=><List type='completed' {...this.props} />}
                </Tab.Screen>
            </Tab.Navigator>
          
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);