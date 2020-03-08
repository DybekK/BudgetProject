import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {Input, Text} from 'galio-framework/src';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Controller, useForm} from 'react-hook-form';
import {NavBar, Block, Button} from 'galio-framework';
import IconIonicons from 'react-native-vector-icons/Ionicons';
let radio_props = [{label: 'Income', value: 0}, {label: 'Expense', value: 1}];

const AddTransaction = props => {
  const {navigation} = props;
  const [checkedValue, setCheckedValue] = useState(0);
  const {handleSubmit, errors, control, setError, clearError} = useForm();

  const onSubmit = async data => {
    switch (checkedValue) {
      case 0:
        data.type = 'INCOME';
        break;
      case 1:
        data.type = 'EXPENSES';
        break;
    }
    console.log(data);
  };

  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (
    <SafeAreaView style={styles.containerFlex}>
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
      <Block column style={styles.block}>
        <Controller
          as={
            <Input
              style={errors.transactionname && {borderColor: 'red'}}
              color={errors.transactionname && 'red'}
              placeholderTextColor={errors.transactionname && 'red'}
              placeholder="Enter transaction name"
            />
          }
          control={control}
          name="transactionname"
          onChange={onChange}
          rules={{required: true}}
          defaultValue=""
        />

        {errors.transactionname &&
          errors.transactionname.type === 'required' && (
            <Text style={styles.errorInputText}>This field is required</Text>
          )}

        <Controller
          as={
            <Input
              style={errors.amount && {borderColor: 'red'}}
              color={errors.amount && 'red'}
              placeholderTextColor={errors.amount && 'red'}
              placeholder="Value in dolars"
            />
          }
          control={control}
          name="amount"
          onChange={onChange}
          rules={{required: true}}
          defaultValue=""
        />

        {errors.amount && errors.amount.type === 'required' && (
          <Text style={styles.errorInputText}>This field is required</Text>
        )}

        <Block>
          <RadioForm
            style={{marginVertical: 20}}
            formHorizontal={true}
            animation={false}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  buttonColor="#B23AFC"
                  isSelected={checkedValue === i}
                  onPress={value => {
                    setCheckedValue(value);
                  }}
                  borderWidth={1}
                  buttonWrapStyle={i === 1 && {marginLeft: 30}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => {
                    setCheckedValue(value);
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </Block>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={[styles.buttonMargin, styles.buttons]}>
          Create
        </Button>
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorInputText: {
    color: 'red',
    fontSize: 13,
  },
  input: {
    marginBottom: 10,
  },
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
  titleStyle: {
    fontSize: 16,
    color: 'black',
  },
  block: {
    backgroundColor: 'white',
    paddingVertical: 15,
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
  },
  smallBlock: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
  },
  containerFlex: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  chartBlock: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
  },
});

export default AddTransaction;
