import { View } from 'react-native'
import React from 'react';
import Loading from '../components/Loading/Loading'
import Colors from '../constants/Colors';
// import { Redirecst } from 'expo-router'

export default function StartPage() {
     // return <Redirect href={'/home'} />
     return (
          <View style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: Colors.white,
          }}>
               {/* <ActivityIndicator size='large' color='gray' /> */}
               <Loading size={100} />

          </View>
     )
}
