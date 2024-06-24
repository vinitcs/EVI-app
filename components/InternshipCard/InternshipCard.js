import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const InternshipCard = memo(({ itemKey, img, description, field }) => {
     const router = useRouter();

     return (
          <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: 'apply', params: { itemKey, img, field } })}>
               <View style={styles.section}>
                    <View style={styles.imgContainer}>
                         <Image source={img} style={styles.img} />
                    </View>
                    <View style={styles.internshipDescription}>
                         <Text style={styles.internshipTitle}>{field}</Text>
                         <Text>{description}</Text>
                    </View>
               </View>
          </TouchableOpacity>
     )
});

export default InternshipCard;

const styles = StyleSheet.create({
     container: {
          borderWidth: 0.2,
          borderColor: Colors.outline,
          backgroundColor: Colors.white,
          borderRadius: 4,
          marginVertical: 12,
          width: '100%',
          height: 'auto',
          alignItems: 'center',
     },
     section: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 10,
     },
     internshipDescription: {
          height: 'auto',
          alignItems: 'center'
     },
     internshipTitle: {
          flexWrap: 'wrap',
          fontSize: 14,
          textAlign: 'center',
          color: Colors.primaryColor,
          fontWeight: 'bold',
          paddingVertical: 10
     },
     imgContainer: {
          width: '100%',
          height: 'auto',
          alignItems: 'center',
     },
     img: {
          width: 150,
          height: 120,
          resizeMode: "contain"
     },
});
