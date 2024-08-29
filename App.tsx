import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

// form validation 
import * as Yup from 'yup'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4,'should be atleast 4 chracters')
    .max(16,'should be max if 16 chracters')
    .required('length is required')
  
})

export default function App() {
  const [password, setpassword] = useState('');
  const [ispassGenerated, setispassGenerated] = useState(false);
  const [LowerCase, setLowerCase] = useState(false);
  const [numbers, usenumbers] = useState(false);
  const [symbols, usesymbols] = useState(false);
  const [UpperCase, setUpperCase] = useState(false);

  const generatePasswordString = (passwordLength:number) => {
    let chracterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(UpperCase){
      chracterList += upperCaseChars;
    }

    if(LowerCase){
      chracterList += lowerCaseChars;
    }

    if(numbers){
      chracterList += digitChars;
    }

    if(symbols){
      chracterList += specialChars;
    }

    const passwordResult = createPassword(chracterList,passwordLength) ;

    setpassword(passwordResult);
    setispassGenerated(true);

    //
  }

  const createPassword = (chracters: string, passwordLength: number) =>{
    let result = '';
    for(let i =0; i<passwordLength; i++){
      let chracterIndex = Math.round(Math.random()* chracters.length);
      result += chracters.charAt(chracterIndex);
    }
    return result;
  }

  const resetPasswordState = ()=>{
    setpassword('');
    setispassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    usenumbers(false);
    usesymbols(false);

  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        generatePasswordString(+values.passwordLength)
       }}
       
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          useBuiltInState
          isChecked={LowerCase}
          onPress={() => setLowerCase(!LowerCase)}
          fillColor="#29AB87"
          />
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={UpperCase}
                    onPress={() => setUpperCase(!UpperCase)}
                    fillColor="#FED85D"
                  />
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={numbers}
                    onPress={() => usenumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={symbols}
                    onPress={() => usesymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress = {()=>{handleSubmit()}}>
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=>{
            handleReset();
            resetPasswordState();
          }}>
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
        </>
       )}
     </Formik>

        </View>
        {ispassGenerated ?(
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text style={styles.generatedPassword}>{password}</Text>
          </View>
        ): null}
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});