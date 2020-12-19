import React, { useRef, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { Icon, Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'

import List from './HorizontalListComponent'
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = (state, props) => ({
    access_token: state.auth.access_token,
    theme: state.options.ui
})

const list = [
    { type: 'all', title: 'TOP ANIME', delay: 0 },
    { type: 'tv', title: 'TOP TV', delay: 0 },
    { type: 'movie', title: 'TOP MOVIE', delay: 1000 },
    { type: 'airing', title: 'TOP AIRING', delay: 1000 },
    { type: 'upcoming', title: 'TOP UPCOMING', delay: 2000 },
]

class Top extends React.Component {

    render() {

        return (
                
            <FlatList contentContainerStyle={{ paddingHorizontal: 8 }}
                data={list}
                renderItem={({ item, index }) => <List key={index} type={item.type} title={item.title} delay={item.delay} /> }
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={3}
            />
            
        )
    }
}

export default connect(mapStateToProps)(Top);