import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
// import Colors from '../../constants/Colors';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig'; // Import db directly instead of userRef
import { doc, getDoc } from 'firebase/firestore'; // Import required Firestore methods

const Notification = () => {
  const { user } = useAuth();
  const [appliedInternships, setAppliedInternships] = useState([]);

  useEffect(() => {
    const fetchAppliedInternships = async () => {
      // Correct the way to reference a document
      try {
        const userDocRef = doc(db, 'users', user.userId);
        const userDoc = await getDoc(userDocRef);

        // if (!user || !user.uid) {
        //   console.error("User is not defined or does not have a UID.");
        //   return;
        // }

        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log('User data:', data); // Log the fetched data for debugging

          if (data && data.appliedInternships) {
            setAppliedInternships(data.appliedInternships);
          } else {
            console.log('No applied internships found in user data.');
            setAppliedInternships([]);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchAppliedInternships();
  }, [user.uid]);

  return (
    <>
      <Stack.Screen options={{
        headerTitle: "Notifications",
        headerTitleStyle: {
          fontSize: 16,
          color: Colors.primaryColor,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
        },
      }} />

      <View style={styles.container}>
        {appliedInternships.length > 0 ? (
          <View style={styles.flatlistCard}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={appliedInternships}
              renderItem={({ item, index }) => (
                <NotificationCard
                  key={index}
                  itemKey={index} // Pass as a custom prop
                  field={item.field}
                  appliedAt={item.appliedAt}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <Text style={styles.noNotificationText}>No notification yet</Text>
        )}
      </View>
    </>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    height: 'auto',
    backgroundColor: Colors.white,
  },
  flatlistCard: {
    width: '100%',
  },
  noNotificationText: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
