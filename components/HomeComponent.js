import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { getToken, fetchCompleted } from '../redux/ActionCreator'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import List from './ListComponent'
import Login from './LoginComponent'
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchCompleted: (type) => dispatch(fetchCompleted(type))
})

const Tab = createMaterialTopTabNavigator()

class Home extends React.Component {

    componentDidMount() {
        if(this.props.auth.access_token)
            this.props.navigation.setOptions({ headerTitle: 'HOME', headerRight: () => <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} ><Icon name='search' type='font-awesome' color='#fff' containerStyle={{ backgroundColor: 'transparent', paddingVertical: 8, paddingHorizontal: 16 }}/></TouchableOpacity> })
        else 
            this.props.navigation.setOptions({ headerTitle: 'LOGIN' })
    }

    componentDidUpdate(){
        if(this.props.auth.access_token)
            this.props.navigation.setOptions({ headerTitle: 'HOME', headerRight: () => <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} ><Icon name='search' type='font-awesome' color='#fff' containerStyle={{ backgroundColor: 'transparent', paddingVertical: 8, paddingHorizontal: 16 }}/></TouchableOpacity> })
        else 
            this.props.navigation.setOptions({ headerTitle: 'LOGIN' })
    }

    render() { 
        if(this.props.auth.access_token)
            return (
                <Tab.Navigator backBehavior="none" lazy 
                    sceneContainerStyle={{backgroundColor: 'transparent'}} 
                    style={{ backgroundColor: 'transparent' }} 
                    tabBarOptions={{ indicatorStyle: { borderBottomWidth: 5, borderColor: '#fff' }, scrollEnabled: true, labelStyle: { color: '#fff', fontFamily: 'SpaceGrotesk-SemiBold' }, style: { backgroundColor: 'transparent' } }} 
                >
                    <Tab.Screen name='watching' options={{ title: this.props.list.watching !== null ? `Watching (${this.props.list.watching.data.length})` : 'Watching' }}>
                        {()=><List type='watching' {...this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name='plan_to_watch' options={{ title: this.props.list.plan_to_watch ? `Planned (${this.props.list.plan_to_watch.data.length})` : 'Planned' }}>
                        {()=><List type='plan_to_watch' {...this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name='completed' options={{ title: this.props.list.completed ? `Completed (${this.props.list.completed.data.length})` : 'Completed' }}>
                        {()=><List type='completed' {...this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name='on_hold' options={{ title: this.props.list.on_hold ? `On Hold (${this.props.list.on_hold.data.length})` : 'On Hold' }}>
                        {()=><List type='on_hold' {...this.props} />}
                    </Tab.Screen>
                    <Tab.Screen name='dropped' options={{ title: this.props.list.dropped ? `Dropped (${this.props.list.dropped.data.length})` : 'Dropped' }}>
                        {()=><List type='dropped' {...this.props} />}
                    </Tab.Screen>
                   
                </Tab.Navigator>    
            );
        else {
            return (
                <Login />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);