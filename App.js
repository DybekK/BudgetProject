import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, Block, Accordion, NavBar} from 'galio-framework';
import Login from './components/login/Login';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Login />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
