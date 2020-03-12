/* eslint-disable react-hooks/exhaustive-deps */
//react
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
//packages
import Text from 'galio-framework/src/Text';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Block, Button, NavBar} from 'galio-framework';
import Svg, {Circle} from 'react-native-svg';
import axios from 'axios';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {LineChart} from 'react-native-chart-kit';
//project files
import {HttpContext} from '../../../../App';
import {url} from '../../../../env';
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
  const {httpDispatch} = useContext(HttpContext);
  const {data, summary, type} = props.route.params;
  const {navigation} = props;
  const [transactionData, SetTransactionData] = useState(data);
  const [httpError, setHttpError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  console.log(transactionData);

  const ConvertDate = props => {
    const {transaction} = props;
    const date = new Date(transaction.updated_at.timestamp * 1000);
    return moment(date).format('D MMMM HH:mm');
  };

  const DeleteTransaction = async (transactionId, index) => {
    let token = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log(index);
    try {
      const response = await axios.delete(
        `${url}/api/jwt/transaction/${transactionId}`,
        config,
      );
      SetTransactionData(transactionData.splice(index, 1));
      httpDispatch({type: 'SET_DATA', data: []});
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.log(err.response.data);
        //console.log(err.response.status);
        // console.log(err.response.headers);
        //authDispatch({type: 'AUTH_ERROR', status: err.response.status});
        console.log(err.response.data);
        setHttpError(true);
      } else if (err.request) {
        // The request was made but no response was received
        setHttpError(true);
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setHttpError(true);
        console.log('Error', err.message);
      }
    }
  };

  const TransactionItem = props => {
    const [showMore, setShowMore] = useState(false);
    const {transaction, index} = props;
    return (
      <TouchableWithoutFeedback
        key={transaction.id}
        onLongPress={() => setShowMore(!showMore)}>
        <Block center flex row>
          <Block style={[styles.smallBlock]}>
            <Block flex row middle>
              <Block flex row center>
                <Svg height="8" width="8">
                  <Circle r="4" cx="4" cy="4" fill={transaction.iconColor} />
                </Svg>
                <Text bold style={styles.bottomText}>
                  {transaction.transactionname}
                </Text>
              </Block>
              <Text bold>{transaction.amount}$</Text>
            </Block>
            <Block flex row space="between">
              <Text style={styles.transInfo}>{transaction.kindname}</Text>
              <Text style={styles.transInfo}>
                <ConvertDate transaction={transaction} />
              </Text>
            </Block>
          </Block>
          {showMore && (
            <Block style={{marginLeft: 10}} space="around" flex row>
              <Button
                onlyIcon
                icon="edit"
                onPress={() => navigation.navigate('StatsAddTransaction')}
                iconFamily="Feather"
                iconSize={21}
                color="transparent"
                style={{width: 32, height: 32}}
              />
              <Button
                onlyIcon
                icon="trash"
                color="transparent"
                onPress={() => DeleteTransaction(transaction.id, index)}
                iconFamily="Feather"
                iconSize={21}
                style={{width: 32, height: 32}}
              />
            </Block>
          )}
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  const Type = () => {
    if (type === 'INCOME') {
      return 'Incomes';
    }
    if (type === 'EXPENSE') {
      return 'Expenses';
    }
  };

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  return (
    <ScrollView>
      <NavBar
        style={styles.navbar}
        left={
          <IconIonicons
            color="black"
            onPress={() => navigation.goBack()}
            name="ios-arrow-round-back"
            size={35}
          />
        }
        title={Type()}
        titleStyle={styles.titleStyle}
      />
      <SafeAreaView style={styles.containerFlex}>
        <Block shadowColor="#e0e0e0" elevation={0.7} style={styles.chartBlock}>
          <Block style={{width: '80%'}} flex row center space="between">
            <Block>
              <Text style={styles.summary}>
                Total <Type />
              </Text>
              <Text bold h3>
                {summary.toFixed(2)}$
              </Text>
            </Block>
            <Button
              onlyIcon
              icon="add"
              onPress={() => navigation.navigate('StatsAddTransaction')}
              iconFamily="MaterialIcons"
              iconSize={28}
              iconColor="#fff"
              style={{width: 32, height: 32}}
            />
          </Block>

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
          {transactionData.map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              index={index}
            />
          ))}
        </Block>
        {!httpError && (
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={
              httpError ? 'Something went wrong' : 'Transaction has been added'
            }
            message={httpError ? 'Try again' : 'You can add another'}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            //showCancelButton={true}
            showConfirmButton={true}
            //cancelText="Return"
            confirmText="Return"
            confirmButtonColor={httpError ? 'red' : 'green'}
            onConfirmPressed={() => {
              setShowAlert(false);
            }}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  summary: {
    fontSize: 13,
  },
  navbar: {
    //marginBottom: 10,
    //position: 'fixed',
  },
  transInfo: {
    marginLeft: 12,
    fontSize: 13,
    color: '#5d6363',
  },
  bottomText: {
    fontSize: 15,
    marginLeft: 5,
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
    color: 'black',
  },
  block: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  smallBlock: {
    //backgroundColor: 'white',
    paddingVertical: 10,
    flex: 3,
    // width: '100%',
  },
  chartBlock: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
});

export default StatsMore;

{
  /* <Block style={{justifyContent: 'flex-end', backgroundColor: 'red'}} flex row>
<Button
  onlyIcon
  icon="add"
  onPress={() => navigation.navigate('StatsAddTransaction')}
  iconFamily="MaterialIcons"
  iconSize={28}
  iconColor="#fff"
  style={{width: 32, height: 32}}
/>
<Button
  onlyIcon
  icon="add"
  onPress={() => navigation.navigate('StatsAddTransaction')}
  iconFamily="MaterialIcons"
  iconSize={28}
  iconColor="#fff"
  style={{width: 32, height: 32}}
/>
</Block> */
}
