import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

const andorid = Platform.OS == 'android';

export default function CustomKeyboardView({ children }) {
     return (
          <KeyboardAvoidingView
               behavior={andorid ? 'height' : 'padding'}
               style={{ flex: 1 }}
          >
               <ScrollView
                    style={{ flex: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
               >
                    {children}
               </ScrollView>
          </KeyboardAvoidingView>
     )
}