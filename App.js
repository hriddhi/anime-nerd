import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/configureStore';
import Main from './components/MainComponent';
import Tab from './components/TabComponent'
import LinearGradient from 'react-native-linear-gradient'
import { enableES5 } from 'immer';

enableES5()

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar translucent backgroundColor='transparent' />
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