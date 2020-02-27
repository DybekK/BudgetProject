//react
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
//packages
import Text from 'galio-framework/src/Text';
import {Card} from 'galio-framework';
import {NavBar, Block} from 'galio-framework';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import {SvgCss} from 'react-native-svg';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
//project files
import {AuthContext} from '../../App';
import {url} from '../../env';
import TopGradientHome from '../../assets/images/TopGradientHome';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundColor: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

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
    <ScrollView contentContainerStyle={styles.container}>
      <SvgCss
        style={[
          {position: 'absolute'},
          {top: 0},
          {width: '100%'},
          {backgroundSize: 'cover'},
        ]}
        xml={TopGradientHome}
      />
      <NavBar
        transparent
        left={
          <Icon
            color="white"
            onPress={() => {
              console.log('meh');
            }}
            name="menu"
            size={22}
          />
        }
        title="Dashboard"
        titleStyle={styles.titleStyle}
      />

      <SafeAreaView style={styles.containerFlex}>
        <Block style={styles.block}>
          <Block
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text bold h6>
              Week
            </Text>
            <Text style={{marginHorizontal: 20}} bold h6>
              Month
            </Text>
            <Text bold h6>
              Year
            </Text>
          </Block>
          <Text style={{marginTop: 25, marginBottom: 10}} center h5>
            Total profit of 2020
          </Text>
          <Text center bold h3>
            $4,000
          </Text>
          <BarChart
            data={data}
            width={300}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </Block>
      </SafeAreaView>

      {/* <Block card>
    <Text>{username}</Text>
    </Block>
      <Text onPress={signOut}>Log out</Text>
      <Text>{username}</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  choosenColor: {
    color: '#5d5b59',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  containerFlex: {
    display: 'flex',
    marginHorizontal: 15,
    alignItems: 'center',
    height: '100%',
  },
  titleStyle: {
    fontSize: 16,
    color: 'white',
  },
  block: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
  },
});

export default Home;
