import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import {Block, Text, Button} from 'galio-framework';
import TopGradient from '../../assets/images/TopGradient';
import Google from '../../assets/images/Google';
import {SvgCss} from 'react-native-svg';
import Input from 'galio-framework/src/Input';
import {Checkbox} from 'galio-framework';
import {AuthContext} from '../../App';
import {useForm} from 'react-hook-form';

const Register = props => {
  const {signUp} = useContext(AuthContext);
  const {navigation} = props;
  const {register, setValue, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

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
          <Input
            ref={register({name: 'username'}, {required: true})}
            onChangeText={text => setValue('username', text, true)}
            placeholder="Username"
          />
          {errors.username && <Text>This field is required</Text>}
          <Input
            ref={register({name: 'email'}, {required: true})}
            onChangeText={text => setValue('email', text, true)}
            placeholder="Email Address"
          />
          {errors.email && <Text>This field is required</Text>}
          <Input
            ref={register({name: 'password'}, {required: true})}
            onChangeText={text => setValue('password', text, true)}
            placeholder="Password"
            password
            viewPass
          />
          {errors.password && <Text>This field is required</Text>}
          <Input
            ref={register({name: 'passwordRepeat'}, {required: true})}
            onChangeText={text => setValue('passwordRepeat', text, true)}
            placeholder="Confirm password"
            password
            viewPass
          />
          {errors.passwordRepeat && <Text>This field is required</Text>}
          <Block style={{width: '100%', marginTop: 15}}>
            <Checkbox
              labelStyle={{color: '#5d6363'}}
              color="primary"
              label="I accept the Terms of Service"
            />
          </Block>
          <Button
            //onPress={() => signUp({username, password, email})}
            onPress={handleSubmit(onSubmit)}
            style={[styles.buttonMargin, styles.buttons]}>
            Sign up
          </Button>
        </Block>
        <Block
          style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
          <Text color="#5d6363" style={{marginRight: 20}}>
            Already have an account?
          </Text>
          <Text color="#6f37b8" onPress={navigateToLogin}>
            Sign in Now!
          </Text>
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
