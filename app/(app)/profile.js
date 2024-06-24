import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '@/context/authContext';
import { deleteUser } from 'firebase/auth';
import { auth } from '../../firebaseConfig';



const Profile = () => {
  const { logout, user } = useAuth();
  const route = useRouter();


  const handleDeleteUser = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
         route.replace('signIn');
        Alert.alert('Delete', 'Successfully deleted account!');
      } else {
        Alert.alert('Delete', 'No user is currently signed in.');
      }
    } catch (error) {
      Alert.alert('Delete', error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  }
  return (
    <>
      <Stack.Screen options={{
        headerTitle: "Profile",
        headerTitleStyle: {
          fontSize: 16,
          color: Colors.primaryColor,
          fontWeight: 'bold',
        },
        headerStyle: {
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleLogout}>
            <Ionicons name='log-out' size={28} color={Colors.primaryColor}
              style={{
                marginRight: 24,
              }} />
          </TouchableOpacity>
        )
      }} />


      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image style={{
            // backgroundColor:'pink',
            width: '100%',
            height: 200,
            resizeMode: "contain"
          }} source={require('../../assets/images/profile/profile.png')} />
          <View style={styles.detailContainer}>
            <Text style={styles.sectionTitle}>Registration Details</Text>
            <View style={styles.fieldContainer}>
              {[
                { label: 'Name', value: user.username },
                { label: 'Branch', value: user.branch },
                { label: 'Email', value: user.email },
                { label: 'College', value: user.college },
                { label: 'Phone', value: user.phone },
                { label: '10th', value: `${user.ten_th}%` },
                { label: '12th', value: `${user.twelve_th}%` },
                { label: 'UG', value: user.ug },
                { label: 'PG', value: user.pg },
                { label: 'Location', value: user.location },
              ].map((item, index) => (
                <View key={index} style={styles.fieldDetails}>
                  <Text style={styles.field}>{item.label}:</Text>
                  <Text style={styles.fieldvalue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{
            // backgroundColor:'pink',
            marginTop: 20,
            width: '100%',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{ marginBottom: 20, }} onPress={handleDeleteUser}>
              <Text style={{ color: 'red' }}>Delete account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: 'auto',
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  detailContainer: {
    width: '90%',
    height: 'auto',
    // borderWidth: 0.1,
    // borderRadius: 4,
    // borderColor: Colors.lightText,
    // marginTop: 20,
    // paddingVertical: 12,
  },

  fieldContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
    // padding:10,
    // paddingHorizontal: 12,
  },

  fieldDetails: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 0.1,
    borderRadius: 1,
    borderColor: Colors.lightText,
    padding: 10,

  },

  field: {
    color: Colors.primaryColor,
    fontWeight: '500',
    fontSize: 16,
  },
  fieldvalue: {
    fontSize: 16,
    color: Colors.lightText,
    fontWeight: '500',
  },
  sectionTitle: {
    color: Colors.lightText,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 8,
    // borderBottomWidth:1,
    // borderStyle:'dashed',
    // borderBottomColor:Colors.lightText
  },
})