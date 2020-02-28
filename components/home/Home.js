//react
import React, {useContext, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
//packages
import Text from 'galio-framework/src/Text';
import {Card} from 'galio-framework';
import {NavBar, Block} from 'galio-framework';
import axios from 'axios';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import TopGradient from '../../assets/images/TopGradient';


const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 50, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#841dbf',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 0) => `rgba(132, 29, 191, ${opacity})`,
  strokeWidth: 99, // optional, default 3
  fillShadowGradientOpacity:1,
  barPercentage: 0.3,
  barRadius: 5
};

const Home = () => {
  const {signOut} = useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [width, setWidth] = useState(100);
  const ref = useRef(null);

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

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <ScrollView>
        <SvgCss
        style={[
          {position: 'absolute'},
          {top: 0},
          {width: '100%'},
          {backgroundSize: 'cover'},
        ]}
        xml={TopGradient}
      />
      <NavBar
        transparent
        left={
          <IconFeather
            color="white"
            onPress={() => {
              console.log('meh');
            }}
            name="menu"
            size={22}
          />
        }
        right={
          <IconFeather   
           onPress={signOut} 
          color="white" name="log-out" size={20} />
        }
        title="Dashboard"
        titleStyle={styles.titleStyle}
      />
      <SafeAreaView style={styles.containerFlex}>
        <Block center ref={ref} style={styles.block}>
          <Block
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Block>
              <Text color="#999999" bold h6>
              Week
            </Text>
              </Block>
            <Text style={{marginHorizontal: 20}} bold h6>
              Month
            </Text>
            <Text color="#999999" bold h6>
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
          //withInnerLines={false}
            style={{marginTop:35}}
            data={data}
            //withHorizontalLabels={false}
            width={300}
            height={200}
            yAxisLabel="$"
            showBarTops={false}
            chartConfig={chartConfig}
            showBarTops={false}
            fromZero={true}
          // verticalLabelRotation={20}
          />
        </Block>
        <Block style={{width: '100%'}} space="between" row flex>
        <Block style={[styles.smallBlock, {marginTop: 10}]}>
            <Text>Incomes</Text>
        </Block>
        <Block style={[styles.smallBlock, {marginTop: 10}]}>
            <Text>Expences</Text>
            <IconEntypo name="chevron-with-circle-right" size={30}/>
        </Block>
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
  checked: {
    shadowColor: "black",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,
  },
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
  smallBlock: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '47%',
    borderRadius: 10,
  }
});

export default Home;
