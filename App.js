//react
import React, {
  createContext,
  useReducer,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
//packages
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
//components
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
//project files
import {authReducer} from './reducers';
import {url} from './env';

const Stack = createStackNavigator();
export const AuthContext = createContext({});

const initialState = {
  isLoading: false,
  isSignout: false,
  userToken: null,
  authError: null,
};

const App = () => {
  const [auth, dispatch] = useReducer(authReducer ,initialState);

  const signInRequest = async data => {
    try {
      dispatch({type: 'AUTH_ERROR', status: null});
      const response = await axios.post(`${url}/api/login_check`, data);
      return await response.data.token;
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.log(err.response.data);
        //console.log('masnoooo niii' + err.response.status);
        // console.log(err.response.headers);
        dispatch({type: 'AUTH_ERROR', status: err.response.status});
        console.log(
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
    }
  };

  const signUpRequest = async data => {
    try {
      const response = await axios.post(`${url}/api/register`, data);
      return await response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const token = await signInRequest(data);
        if (token !== undefined) {
          await AsyncStorage.setItem('userToken', token);
          console.log(await AsyncStorage.getItem('userToken'));
          dispatch({type: 'SIGN_IN', token: token});
        }
      },

      signOut: () => dispatch({type: 'SIGN_OUT'}),

      signUp: async data => {
        const registerResponse = await signUpRequest(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  // if (auth.isLoading) {
  //     // We haven't finished checking for the token yet
  //     return <Text>Ladowanie</Text>;
  // }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{auth, ...authContext}}>
      <Spinner
          visible={auth.isLoading}
          textContent={'Loading...'}
          //textStyle={styles.spinnerTextStyle}
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {auth.userToken == null ? (
            <>
              <Stack.Screen name="Login">
                {props => <Login {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {props => <Register {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
