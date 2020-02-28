//react
import React, {useContext, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
//packages
import Text from 'galio-framework/src/Text';
import {Card} from 'galio-framework';
import {NavBar, Block, Button} from 'galio-framework';
import axios from 'axios';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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
import TopGradientHome from '../../assets/images/TopGradientHome';

const data = {
  labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  // labels: [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  // ],
  // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      data: [20, 45, 50, 80, 99, 43, 20, 45, 50, 80, 99, 43],
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
  fillShadowGradientOpacity: 1,
  barPercentage: 0.3,
  barRadius: 5,
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
          {top: 60},
          {width: '100%'},
          {backgroundSize: 'cover'},
        ]}
        xml={TopGradientHome}
      />
      <NavBar
        style={styles.navbar}
        left={
          <IconFeather
            color="black"
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
            color="black"
            name="log-out"
            size={20}
          />
        }
        title="Dashboard"
        titleStyle={styles.titleStyle}
      />
      <SafeAreaView style={styles.containerFlex}>
        <Block
          shadowColor="#e0e0e0"
          elevation={0.7}
          shadow
          center
          ref={ref}
          style={styles.block}>
          <Block
            style={{
              width: '100%',
              backgroundColor: 'white',
            }}
            flex
            space="around"
            row>
            <Text color="#999999" bold h6>
              Week
            </Text>
            <Text bold h6>
              Month
            </Text>
            <Text color="#999999" bold h6>
              Half year
            </Text>
            <Text color="#999999" bold h6>
              Year
            </Text>
          </Block>
          <Text style={{marginTop: 25, marginBottom: 10}} center h6>
            Expense summary
          </Text>
          <Block flex center row>
            <Text style={{marginRight: 15}} color="#07ed07" center bold h3>
              $1.884
            </Text>
            <IconFeather name="trending-up" size={35} color="#07ed07" />
          </Block>
          <BarChart
            //withInnerLines={false}
            style={{marginTop: 35}}
            data={data}
            //withHorizontalLabels={false}
            width={300}
            height={200}
            yAxisLabel="$"
            showBarTops={false}
            chartConfig={chartConfig}
            fromZero={true}
            // verticalLabelRotation={20}
          />
        </Block>
        <Block style={{width: '100%'}} flex>
          <Block
            elevation={0.7}
            shadow
            middle
            row
            space="between"
            style={[styles.smallBlock, {marginTop: 10}]}>
            <Block row middle>
              <Block>
                <Text style={styles.bottomText}>Incomes</Text>
                <Block row center middle>
                  <Text bold h5>
                    $3,134
                  </Text>
                  <IconFeather
                    style={{marginLeft: 9}}
                    color="black"
                    name="trending-up"
                    size={22}
                  />
                </Block>
              </Block>
            </Block>
            <Button
              onlyIcon
              shadowless
              icon="popup"
              iconFamily="Entypo"
              iconSize={20}
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                elevation: 0,
              }}
            />
          </Block>
          <Block
            elevation={0.7}
            shadow
            middle
            row
            space="between"
            style={[styles.smallBlock, {marginVertical: 10}]}>
            <Block row middle>
              <Block>
                <Text style={styles.bottomText}>Expences</Text>
                <Block row center middle>
                  <Text bold h5>
                    $1,250
                  </Text>
                  <IconFeather
                    style={{marginLeft: 9}}
                    color="black"
                    name="trending-down"
                    size={22}
                  />
                </Block>
              </Block>
            </Block>
            <Button
              onlyIcon
              shadowless
              icon="popup"
              iconFamily="Entypo"
              iconSize={20}
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                elevation: 0,
              }}
            />
          </Block>
          {/* <Block
            elevation={0.7}
            shadow
            row
            space="between"
            style={[styles.smallBlock, {marginVertical: 10}]}>
            <Block>
              <Text style={styles.bottomText}>Expences</Text>
              <Text bold h5>
                $1,250
              </Text>
            </Block>
            <Button
              onlyIcon
              icon="tags"
              iconFamily="antdesign"
              iconSize={30}
              color="warning"
              iconColor="#fff"
              style={{width: 40, height: 40}}>
              warning
            </Button>
          </Block> */}
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
  navbar: {
    marginBottom: 10,
    //position: 'fixed',
  },
  bottomText: {
    fontSize: 15,
  },
  checked: {
    shadowColor: 'black',
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
  },
});

export default Home;
