import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const UserInput = forwardRef(({ focus, placeholder, leftIcon, leftIconName, maxLength }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (text) => {
    setInputValue(text);
  };

  const handlePhoneChange = (text) => {
    // Only allow numeric input and limit to maxLength
    const numericText = text.replace(/[^0-9]/g, '');
    setInputValue(numericText);
  };


  useImperativeHandle(ref, () => ({
    get value() {
      return inputValue;
    }
  }));

  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 2,
        paddingHorizontal: 12,
        borderWidth: 0.5,
        borderRadius: 12,
        borderColor: Colors.outline,
      }}>
        {leftIcon && (
          <Ionicons
            name={leftIconName}
            type='ionicon'
            size={25}
            color={Colors.primaryColor}
          />
        )}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.lightText}
          selectionColor={Colors.lightText}
          autoFocus={focus}
          value={inputValue}
          onChangeText={placeholder === 'Phone' ? handlePhoneChange : handleChange}
          maxLength={maxLength}
          secureTextEntry={!passwordVisible && (placeholder === 'Password' || placeholder === 'Confirm password')}
          style={{
            width: '85%',
            color: Colors.text,
            fontSize: 16,
            height: 50,
            paddingHorizontal: 10,
          }}
        />

        {(placeholder === 'Password' || placeholder === 'Confirm password') && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              type='ionicon'
              size={25}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
});

export default UserInput;

const styles = StyleSheet.create({});
