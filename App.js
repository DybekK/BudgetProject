import React, {useState, createContext, useReducer, useEffect, useMemo} from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './components/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './components/Test';
import Register from './components/register/Register';
import Text from 'galio-framework/src/Text';

const Stack = createStackNavigator();
const url = 'http://localhost:8000/api/login_check';
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

    const postData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const meh = await response.json();
            console.log(meh);
        } catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }

            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        }
        bootstrapAsync();
    }, []);

    const authContext = useMemo(() => ({
        signIn: async data => {
            console.log(data);
            //await postData(url, data);
            await postData();
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
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
