import React from 'react';
import { Text, InteractionManager, View, ActivityIndicator, Pressable } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { getToken, fetchCompleted } from '../redux/ActionCreator'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import List from './ListComponent'
import Login from './LoginComponent'
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list,
    theme: state.options.ui
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchCompleted: (type) => dispatch(fetchCompleted(type))
})

const Tab = createMaterialTopTabNavigator()

class Home extends React.Component {
    
    render() { 
        if(this.props.auth.access_token)
            return (
                <React.Fragment>
                    <Header
                        leftComponent={<Text style={{ color: this.props.theme[this.props.theme.current].home.top_tab_text_color, fontFamily: 'SpaceGrotesk-Bold', fontSize: 20 }}>HOME</Text>}
                        leftContainerStyle={{ paddingHorizontal: 8 }}
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
                    />
                    <Tab.Navigator backBehavior="none" lazy 
                        sceneContainerStyle={{ backgroundColor: 'transparent' }} 
                        style={{ backgroundColor: 'transparent' }} 
                        tabBarOptions={{ tabStyle: { width: 150 }, indicatorStyle: { width: 100, marginHorizontal: 25, borderBottomWidth: 4, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: this.props.theme[this.props.theme.current].home.top_tab_indicator_color }, scrollEnabled: true, labelStyle: { color: this.props.theme[this.props.theme.current].home.top_tab_text_color, fontFamily: 'SpaceGrotesk-SemiBold' }, style: { backgroundColor: 'transparent' } }} 
                        lazyPlaceholder={() => (
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <ActivityIndicator size='large' color='#fff'/>
                                </View>
                            )
                        }
                    >
                        <Tab.Screen name='watching' initialParams={{ type: 'watching' }} component={List} options={{ title: this.props.list.watching !== null ? `Watching (${this.props.list.watching.data.length})` : 'Watching' }} />
                        <Tab.Screen name='plan_to_watch' initialParams={{ type: 'plan_to_watch' }} component={List} options={{ title: this.props.list.plan_to_watch ? `Planned (${this.props.list.plan_to_watch.data.length})` : 'Planned' }} />
                        <Tab.Screen name='completed' initialParams={{ type: 'completed' }} component={List} options={{ title: this.props.list.completed ? `Completed (${this.props.list.completed.data.length})` : 'Completed' }} />
                        <Tab.Screen name='on_hold' initialParams={{ type: 'on_hold' }} component={List} options={{ title: this.props.list.on_hold ? `On Hold (${this.props.list.on_hold.data.length})` : 'On Hold' }} />
                        <Tab.Screen name='dropped' initialParams={{ type: 'dropped' }} component={List} options={{ title: this.props.list.dropped ? `Dropped (${this.props.list.dropped.data.length})` : 'Dropped' }} />
                    </Tab.Navigator>    
                </React.Fragment>
            );
        else {
            return (
                <Login />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);