/* eslint-disable react-hooks/exhaustive-deps */
//react
import React, {useContext, useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
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

const StatsMore = props => {
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
      <SvgCss
        style={[
          {position: 'absolute'},
          {top: 0},
          {width: '100%'},
          {backgroundSize: 'cover'},
        ]}
        xml={TopGradient}
      />
      {/* <NavBar
        transparent
        style={styles.navbar}
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
            color="white"
            name="log-out"
            size={20}
          />
        }
        title="Dashboard"
        titleStyle={styles.titleStyle}
      /> */}
      <SafeAreaView style={styles.containerFlex}>
        <Block shadow style={styles.block}>
          <Text style={{marginBottom: 20}} h5 bold>
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
    display: 'flex',
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
  },
  smallBlock: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
  },
});

export default StatsMore;
