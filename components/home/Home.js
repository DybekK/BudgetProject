//react
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
//packages
import Text from 'galio-framework/src/Text';
import axios from 'axios';
//project files
import {AuthContext} from '../../App';
import {url} from '../../env';
const Home = () => {
  const {signOut} = useContext(AuthContext);
  const [username, setUsername] = React.useState('');

  const getData = async () => {
    let token = await AsyncStorage.getItem('userToken');

    // try {
    //     const response = await axios.post('http://192.168.1.187:8000/api/jwt/test', {
    //         head
    //     });
    //     return await response.data;
    // } catch (e) {
    //     console.log(e);
    // }

    const response = await fetch(`${url}/api/jwt/test`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    setUsername(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Text onPress={signOut}>Log out</Text>
      <Text>{username}</Text>
    </>
  );
};

export default Home;
