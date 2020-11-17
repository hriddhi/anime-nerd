import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Nav from './components/NavContainer';

const store = ConfigureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}

export default App;