import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';

class Home extends React.Component {

    render() { 
        return (
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                <Text>Home Component</Text>
                <Button
                    title="Go to Search"
                    onPress={() => this.props.navigation.navigate('Search') }
                />
            </ScrollView>
        );
    }
}

export default Home;

