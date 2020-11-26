import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/configureStore';
import Main from './components/MainComponent';
import Tab from './components/TabComponent'
import LinearGradient from 'react-native-linear-gradient'

class App extends React.Component {
  renderLoading = () => {
    return (
      <LinearGradient colors={['#17009c','#5c007a']}>
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      </LinearGradient>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText: {
      color: '#fff',
  },
  buttonStyle: {
      borderColor: '#fff',
      borderWidth: 1.2,
      borderRadius: 20,
      color: '#fff',
      width: 200
  }
});

export default App;