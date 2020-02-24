import React, {useState, createContext, useReducer, useEffect, useMemo} from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './components/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    const postData = async (data) => {
        try {
            const response = await axios.post(`${url}/api/login_check`, data);
                return await response.data.token;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            // try {
            //     userToken = await AsyncStorage.getItem('userToken');
            // } catch (e) {
            //     console.log(e);
            // }

            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        }
        bootstrapAsync();
    }, []);

    const authContext = useMemo(() => ({
        signIn: async data => {
            const token = await postData(data);
            if(token !== undefined) {
                await AsyncStorage.setItem('userToken', token);
                console.log(await AsyncStorage.getItem('userToken'));
                dispatch({type: 'SIGN_IN', token: token });
            }
        },
        signOut: () => dispatch({type: 'SIGN_OUT'}),
        signUp: async data => {
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})
        }
    }), []);

    // if (state.isLoading) {
    //     // We haven't finished checking for the token yet
    //     return <Text>Ladowanie</Text>;
    // }


  return (
    <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
              {state.userToken == null ? (
                  <>
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
