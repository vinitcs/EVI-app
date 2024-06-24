import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import  Colors  from '../../constants/Colors';
// import { fonts } from '../../../theme/fonts/fonts';

const DisplayButton = ({ onPressChanges, Title, color }) => {
     return (
          <View>
               <TouchableOpacity
                    onPress={onPressChanges}
                    style={{
                         width: '100%',
                         backgroundColor: Colors[color],
                         borderRadius: 12,
                         paddingVertical: 10,

                    }}>
                    <Text
                         style={{
                              // backgroundColor:'pink',
                              // fontFamily: fonts.Medium,
                              fontSize: 17.5,
                              color: Colors.white,
                              textAlign: 'center',
                         }}>
                         {Title}
                    </Text>
               </TouchableOpacity>
          </View>
     )
}

export default DisplayButton

const styles = StyleSheet.create({})