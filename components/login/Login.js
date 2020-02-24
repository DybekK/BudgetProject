import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Block, Text, Button} from 'galio-framework';
import TopGradient from '../../assets/images/TopGradient';
import Google from '../../assets/images/Google';
import {SvgCss} from 'react-native-svg';
import Input from 'galio-framework/src/Input';

const Login = (props) => {
  const { navigation } = props;
  const navigateTest = () => {
    navigation.navigate('Register');
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
        <View style={styles.signInText}>
          <Text color="white" bold center h4>
            Sign in
          </Text>
          <Text color="white" center h5>
            Login to your account
          </Text>
        </View>
        <Block shadow style={styles.block} center>
          <Input placeholder="Username or email address" />
          <Input placeholder="Password" password viewPass />
          <Button style={[styles.buttonMargin, styles.buttons]}>Sign in</Button>
          <Button
            color="transparent"
            style={[styles.buttons, styles.googleButton]}>
            <SvgCss style={{position: 'absolute'}} height={35} xml={Google} />
            <Text style={[{flex: 1}, {fontSize: 16}]} center color="#dd4b39">
              Sign in with Google
            </Text>
          </Button>
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
  signInText: {
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
    marginVertical: 15,
  },
});

export default Login;
