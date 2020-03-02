/* eslint-disable react-hooks/exhaustive-deps */
//react
import React, {useContext, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
//packages
import Text from 'galio-framework/src/Text';
import moment from 'moment';
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
import {HttpContext} from '../../../../App';

// import {url} from '../../../env';
import TopGradient from '../../../../assets/images/TopGradient';
// import TopGradientHome from '../../../assets/images/TopGradientHome';

const dataChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 39, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#841dbf',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 0.1) => `rgba(132, 29, 191, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  fillShadowGradientOpacity: 0.3,
};

const StatsMore = props => {
  const {height, width} = Dimensions.get('window');
  //   const dataChart = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //     dataset: [
  //       {
  //         data: [20, 45, 28, 80, 99, 43],
  //       },
  //     ],
  //   };

  //   const chartConfig = {
  //     backgroundColor: '#e26a00',
  //     backgroundGradientFrom: '#fb8c00',
  //     backgroundGradientTo: '#ffa726',
  //     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //     style: {
  //       borderRadius: 16,
  //     },
  //     propsForDots: {
  //       r: '6',
  //       strokeWidth: '2',
  //       stroke: '#ffa726',
  //     },
  //   };

  const {httpDispatch, http} = useContext(HttpContext);
  const {data} = props.route.params;
  console.log(data);
  const ConvertDate = props => {
    const {transaction} = props;
    const date = new Date(transaction.updated_at.timestamp * 1000);
    return moment(date).format('D MMMM HH:mm');
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.containerFlex}>
        <Block shadowColor="#e0e0e0" elevation={0.7} style={styles.chartBlock}>
          <LineChart
            //withInnerLines={false}
            withOuterLines={false}
            //withHorizontalLabels={false}
            withDots={false}
            style={{marginTop: 35}}
            yLabelsOffset={15}
            data={dataChart}
            //withHorizontalLabels={false}
            width={width}
            height={250}
            yAxisLabel="$"
            chartConfig={chartConfig}
            bezier
            fromZero={true}
            // verticalLabelRotation={20}
          />
        </Block>

        <Block
          column
          shadowColor="#e0e0e0"
          elevation={4}
          shadow
          style={styles.block}>
          <Text style={{marginBottom: 10, fontSize: 20}} bold>
            Transactions
          </Text>
          {data.map(transaction => (
            <Block key={transaction.id} style={{width: '100%'}} flex>
              <Block middle row space="between" style={styles.smallBlock}>
                <Block style={{width: '100%'}} column>
                  <Block flex row space="between" middle>
                    <Text bold style={styles.bottomText}>
                      {transaction.transactionname}
                    </Text>
                    <Text bold>{transaction.amount}$</Text>
                  </Block>
                  <Block flex row space="between" middle>
                    <Text style={styles.bottomText}>
                      {transaction.kindname}
                    </Text>
                    <Text>
                      <ConvertDate transaction={transaction} />
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          ))}
        </Block>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    //marginBottom: 10,
    //position: 'fixed',
  },
  bottomText: {
    fontSize: 15,
  },
  btnSelected: {
    fontWeight: 'bold',
    // color: 'black',
  },
  notSelected: {
    color: '#999999',
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
    height: '100%',
  },
  titleStyle: {
    fontSize: 16,
    color: 'white',
  },
  block: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  smallBlock: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  chartBlock: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
});

export default StatsMore;
