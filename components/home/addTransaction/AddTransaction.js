import React from 'react';
import Text from 'galio-framework/src/Text';
import {ScrollView} from 'react-native-gesture-handler';
import {NavBar, Block, Button} from 'galio-framework';
import {StyleSheet} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AddTransaction = props => {
  const {navigation} = props;
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
        title="Add transaction"
        titleStyle={styles.titleStyle}
      />
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
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
  },
  chartBlock: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
});

export default AddTransaction;
