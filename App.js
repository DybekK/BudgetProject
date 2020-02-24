import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Login from './components/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './components/Test';
import Register from './components/register/Register';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="Login"
            options={{
                gestureDirection: 'horizontal'
            }}
        >
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
            name="Register"
            options={{
                gestureDirection: 'horizontal'
            }}
        >
            {props => <Register {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
