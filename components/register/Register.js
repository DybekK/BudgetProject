//react
import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
//packages
import {Block, Text, Button} from 'galio-framework';
import Input from 'galio-framework/src/Input';
import {useForm, Controller} from 'react-hook-form';
import {SvgCss} from 'react-native-svg';
import {Checkbox} from 'galio-framework';
//project files
import TopGradient from '../../assets/images/TopGradient';
import {AuthContext} from '../../App';


const Register = props => {
  const {signUp} = useContext(AuthContext);
  const {navigation} = props;
  const {handleSubmit, errors, control} = useForm();

  const onSubmit = data => {
    signUp(data);
  };

  const onChange = (args) => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const navigateToLogin = () => {
    navigation.goBack();
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
      <SafeAreaView style={styles.containerFlex}>
        <View style={styles.signUpText}>
          <Text color="white" bold center h4>
            Sign up
          </Text>
          <Text color="white" center h5>
            Create your own account
          </Text>
        </View>
        <Block shadow style={styles.block}>
          <Controller
            as={
              <Input
                style={errors.username && {borderColor: 'red'}}
                color={errors.username && 'red'}
                placeholderTextColor={errors.username && 'red'}
                placeholder="Username"
              />
            }
            control={control}
            name="username"
            onChange={onChange}
            rules={{required: true}}
            defaultValue=""
          />
          {errors.username && (
            <Text style={styles.errorInputText}>This field is required</Text>
          )}
          <Controller
            as={
              <Input
                style={errors.email && {borderColor: 'red'}}
                color={errors.email && 'red'}
                placeholderTextColor={errors.email && 'red'}
                placeholder="Email"
              />
            }
            control={control}
            name="email"
            onChange={onChange}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            defaultValue=""
          />

          {errors.email && errors.email.type === 'required' && (
            <Text style={styles.errorInputText}>This field is required</Text>
          )}

          {errors.email && errors.email.type === 'pattern' && (
            <Text style={styles.errorInputText}>Email format is incorrect</Text>
          )}
          <Controller
            as={
              <Input
                style={errors.password && {borderColor: 'red'}}
                color={errors.password && 'red'}
                placeholderTextColor={errors.password && 'red'}
                placeholder="Password"
                password
                viewPass
              />
            }
            control={control}
            name="password"
            onChange={onChange}
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.errorInputText}>This field is required</Text>
          )}
          <Controller
            as={
              <Input
                style={errors.passwordRepeat && {borderColor: 'red'}}
                color={errors.passwordRepeat && 'red'}
                placeholderTextColor={errors.passwordRepeat && 'red'}
                placeholder="Repeat Password"
                password
                viewPass
              />
            }
            control={control}
            name="passwordRepeat"
            onChange={onChange}
            rules={{required: true}}
            defaultValue=""
          />
          {errors.passwordRepeat && (
            <Text style={styles.errorInputText}>This field is required</Text>
          )}
          <Block style={{width: '100%', marginTop: 15}}>
            <Controller
              as={
                <Checkbox
                  labelStyle={{color: '#5d6363'}}
                  color="primary"
                  label="I accept the Terms of Service"
                />
              }
              control={control}
              name="acceptTerms"
              onChange={([selected]) => {
                return {value: selected};
              }}
              rules={{required: true}}
              defaultValue={false}
            />
            {errors.acceptTerms && (
              <Text style={styles.errorInputText}>This field is requiredddd</Text>
            )}
          </Block>
          <Button
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorInputText: {
    color: 'red',
    fontSize: 13,
  },
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
