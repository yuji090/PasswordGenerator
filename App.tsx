import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

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
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
