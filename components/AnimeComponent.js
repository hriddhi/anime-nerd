import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import { Avatar, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  anime: state.anime
})

class Anime extends React.Component {

    render() {
        return (  
            <ScrollView>
                <Text>{ JSON.stringify(this.props.anime.anime) }</Text>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Anime);