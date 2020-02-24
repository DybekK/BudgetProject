import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text, Button} from 'galio-framework';
import TopGradient from '../../assets/images/TopGradient';
import Google from '../../assets/images/Google';
import {SvgCss} from 'react-native-svg';
import Input from 'galio-framework/src/Input';
import { Checkbox } from 'galio-framework';

const Register = (props) => {
  const { navigation } = props;
  const navigateTest = () => {
    navigation.navigate('Login');
  }

  return (
    <>
      <SvgCss
        style={[
          {position: 'absolute'},
          {top: 0},
          {width: '100%'},
          {backgroundSize: 'cover'},
        ]}
        xml={TopGradient}
      />
      <SafeAreaView style={styles.containerFlex}>
        <View style={styles.signUpText}>
          <Text color="white" bold center h4>
            Sign up
          </Text>
          <Text color="white" center h5>
            Create your own account
          </Text>
        </View>
        <Block shadow style={styles.block} center>
          <Input placeholder="Username" />
          <Input placeholder="Email Address" />
          <Input placeholder="Password" password viewPass />
          <Input placeholder="Confirm password" password viewPass />
          <Block style={{width: '100%', marginTop: 15}}>
            <Checkbox labelStyle={{ color: '#5d6363' }} color="primary" label="I accept the Terms of Service" />
          </Block>
          <Button style={[styles.buttonMargin, styles.buttons]}>Sign up</Button>
        </Block>
        <Block style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
          <Text color="#5d6363" style={{marginRight: 20}}>Don't you have an account?</Text>
          <Text color="#6f37b8" onPress={navigateTest}>Sign up Now!</Text>
        </Block>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerFlex: {
    display: 'flex',
    marginHorizontal: 15,
    alignItems: 'center',
    height: '100%',
  },
  signUpText: {
    marginVertical: 40,
  },
  block: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
  },
  buttons: {
    width: '100%',
  },
  googleButton: {
    borderWidth: 1.5,
    borderColor: '#dd4b39',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    color: '#5d5b59',
  },
  buttonMargin: {
    marginTop: 15,
  },
});

export default Register;
