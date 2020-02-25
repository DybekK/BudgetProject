import React, {
  useState,
  createContext,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './components/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Test from './components/Test';
import Register from './components/register/Register';
import axios from 'axios';

const Stack = createStackNavigator();
const url = 'http://192.168.1.187:8000';


export const AuthContext = createContext();

const App: () => React$Node = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'AUTH_ERROR':
          return {
            ...prevState,
            authError: action.status
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      authError: null
    },
  );

  const signInRequest = async data => {
    try {
      const response = await axios.post(`${url}/api/login_check`, data);
      return await response.data.token;
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.log(err.response.data);
        //console.log('masnoooo niii' + err.response.status);
        // console.log(err.response.headers);
        dispatch({type: 'AUTH_ERROR', status: err.response.status});
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

  console.log('keeeee' + state.authError);

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userToken;
  //
  //     // try {
  //     //     userToken = await AsyncStorage.getItem('userToken');
  //     // } catch (e) {
  //     //     console.log(e);
  //     // }
  //
  //     dispatch({type: 'RESTORE_TOKEN', token: userToken});
  //   };
  //   bootstrapAsync();
  // }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const token = await signInRequest(data);
        console.log(token);
      if(token !== undefined){
        await AsyncStorage.setItem('userToken', token);
        console.log(await AsyncStorage.getItem('userToken'));
        dispatch({type: 'SIGN_IN', token: token});
      }
      },

      signOut: () => dispatch({type: 'SIGN_OUT'}),

      signUp: async data => {
        const registerResponse = await signUpRequest(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})
      },
    }),
    [],
  );

  // if (state.isLoading) {
  //     // We haven't finished checking for the token yet
  //     return <Text>Ladowanie</Text>;
  // }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{...authContext, state}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="Login">
                {props => <Login {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="Register">
                {props => <Register {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Home" component={Test} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
