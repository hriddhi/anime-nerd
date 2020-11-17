import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import { Avatar, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  search: state.search
})

class Search extends React.Component {

    render() {
        return (  
            <ScrollView>
              { this.props.search.visible ? 
                this.props.search.result.map((l, i) => (
                  <ListItem key={i} pad={0} containerStyle={{padding: 0, marginVertical: 4, marginHorizontal: 8, borderRadius: 10 }} bottomDivider>
                    <Image source={{ uri: l.node.main_picture.medium }} style={{ width: 100, height: 150, borderRadius: 10 }} />
                    <View style={{ height: '100%', padding: 8, width: '70%', flex: 1 }}>
                      <Text style={{ flexShrink: 1, fontWeight: 'bold', fontSize: 18}}>{l.node.title}</Text>
                      <Text>{l.node.start_date} - {l.node.end_date}</Text>
                      <Text>Score {l.node.mean} | {l.node.media_type.toUpperCase()} {l.node.num_episodes}</Text>
                      <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text numberOfLines={2}>{l.node.synopsis}</Text>
                      </View>
                    </View>
                    
                  </ListItem>
                )) 
                : null
              }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Search);