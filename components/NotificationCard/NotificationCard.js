import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

const NotificationCard = memo(({ itemKey, field, appliedAt }) => {
     const router = useRouter();
     const formattedDate = format(new Date(appliedAt), 'dd-MM-yyyy  HH:mm:ss');

     return (
          <View style={styles.container}>
               <View style={styles.section}>
                    <Text>Thanks!!! 😊 for applying for the field <Text style={styles.internshipAppliedField}>"{field}"</Text>. We will further notify you for internship process. </Text>
                    <Text style={styles.timeLabel}>Date&Time: <Text style={{ color: Colors.primaryColor,}}>{formattedDate}</Text></Text>
               </View>
          </View>
     )
});

export default NotificationCard;

const styles = StyleSheet.create({
     container: {
          borderWidth: 0.4,
          borderColor: Colors.outline,
          backgroundColor: Colors.white,
          borderRadius: 4,
          marginVertical: 12,
          width: '100%',
          height: 'auto',
          // alignItems: 'center',
     },
     section: {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          // justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
     },

     internshipAppliedField: {
          flexWrap: 'wrap',
          fontSize: 14,
          textAlign: 'center',
          color: Colors.primaryColor,
          fontWeight: 'bold',
          paddingVertical: 10
     },
     timeLabel: {
          fontSize: 12,
          color: Colors.lightText,
          paddingTop: 10,
          fontWeight: '500',
     }
});
