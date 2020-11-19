import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Linking, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { getToken, fetchUserAnime } from '../redux/ActionCreator'

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
})

const mapDispatchToProps = dispatch => ({
    getToken: (token) => dispatch(getToken(token)),
    fetchUserAnime: (type, token) => dispatch(fetchUserAnime(type, token))
})

class List extends React.Component {

    componentDidMount() {
        if(this.props.type === 'completed'){
            this.props.fetchUserAnime(this.props.type, this.props.auth.access_token)
            console.log('in completed')
        }
    }

    render() {
        console.log(this.props.type)
        var data = this.props.list[this.props.type]
        return (
            <ScrollView>
              { this.props.list.visible[this.props.type] ? 
                data.data.map((l, i) => (
                  <TouchableOpacity key={i} onPress={()=>this.viewAnime(l.node.id)}>
                    <ListItem key={i} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10 }} bottomDivider>
                      <Image source={{ uri: l.node.main_picture.medium }} style={{ width: 100, height: 150, borderRadius: 10 }} />
                      <View style={{ height: '100%', padding: 8, width: '70%', flex: 1 }}>
                        <Text style={{ flexShrink: 1, fontWeight: 'bold', fontSize: 18}}>{l.node.title}</Text>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                )) 
                : null
              }
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);