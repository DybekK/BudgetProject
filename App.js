//react
import React, {createContext, useReducer, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
//packages
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
//components
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
//project files
import {authReducer} from './reducers';
import {url} from './env';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AuthContext = createContext({});

const initialState = {
  isLoading: false,
  isSignout: false,
  userToken: null,
  authError: null,
};

const App = () => {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  const signInRequest = async data => {
    console.log(data);
    try {
      const response = await axios.post(`${url}/api/login_check`, data);
      return await response.data.token;
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.log(err.response.data);
        //console.log(err.response.status);
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
      return response.status;
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.log(err.response.data);
        //console.log('masnoooo niii' + err.response.status);
        // console.log(err.response.headers);
        console.log(err.response.status);
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

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SET_LOADING', loading: true});
        const token = await signInRequest(data);
        if (token !== undefined) {
          await AsyncStorage.setItem('userToken', token);
          console.log(await AsyncStorage.getItem('userToken'));
          dispatch({type: 'SIGN_IN', token: token});
        }
        dispatch({type: 'SET_LOADING', loading: false});
      },
      signInAfterRegister: async data => {
        const token = await signInRequest(data);
        if (token !== undefined) {
          await AsyncStorage.setItem('userToken', token);
          console.log(await AsyncStorage.getItem('userToken'));
          dispatch({type: 'SIGN_IN', token: token});
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),

      signUp: async data => {
        dispatch({type: 'SET_LOADING', loading: true});
        const registerResponse = await signUpRequest(data);
        console.log(registerResponse);
        if (registerResponse === 200) {
          console.log(data);
          const meh = {
            username: data.username,
            password: data.password,
          };
          authContext.signInAfterRegister(meh);
        }
        dispatch({type: 'SET_LOADING', loading: false});
      },
      resetErrors: () => {
        dispatch({type: 'AUTH_ERROR', status: false});
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
          //visible={auth.isLoading}
          visible={auth.isLoading}
          //textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {true == null ? (
            <>
              {/* <Stack.Screen name="Home" component={Home} /> */}
              <Stack.Screen name="Login">
                {props => <Login {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {props => <Register {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Home">
              {props => (
                <Tab.Navigator>
                  <Tab.Screen
                    options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({color, size}) => (
                        <IconAntDesign
                          name="linechart"
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                    name="HomeTab"
                    component={Home}
                  />
                  <Tab.Screen
                    options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({color, size}) => (
                        <IconEntypo name="wallet" size={size} color={color} />
                      ),
                    }}
                    name="TestOneTab"
                    component={Login}
                  />
                  <Tab.Screen name="TestTwoTab" component={Home} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
