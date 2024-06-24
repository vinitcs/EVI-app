import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import DisplayButton from '../../components/Button/DisplayButton';
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Make sure to import your firebase config
import DisplayInternshipCard from '../../components/InternshipCard/DisplayInternshipCard';

const ApplyScreen = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { itemKey, img, field } = useLocalSearchParams();  // Get the passed field parameter

    const handleApply = async () => {
        try {
            const userDocRef = doc(db, 'users', user.userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const appliedInternships = userData.appliedInternships || [];

                const isAlreadyApplied = appliedInternships.some(internship => internship.itemKey === itemKey && internship.field === field);

                if (isAlreadyApplied) {
                    Alert.alert('Apply', 'You have already applied for this internship.');
                    return;
                }
                await updateDoc(userDocRef, {
                    appliedInternships: arrayUnion({
                        itemKey,
                        field,
                        appliedAt: new Date().toISOString(),
                    })
                });
                Alert.alert('Apply', 'Apply Successful!!!');
                router.navigate('home');
            } else {
                Alert.alert('Apply', 'User document not found.');
            }

        } catch (error) {
            console.error("Error applying for internship: ", error);
            Alert.alert('Apply', 'Apply Failed');
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerTitle: "Apply",
                headerTitleStyle: {
                    fontSize: 18,
                    color: Colors.primaryColor,
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { router.back() }} >
                        <Ionicons name='arrow-back-outline' size={28} color={Colors.primaryColor}
                            style={{
                                marginRight: 24,
                            }} />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    borderBottomWidth: 0,
                    elevation: 0,
                },
            }} />

            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.sectionTitle}>Details</Text>
                        <View style={{ paddingTop: 6 }}>
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
                                <View key={index} style={{ flexDirection: 'row', gap: 4 }}>
                                    <Text style={styles.field}>{item.label}:</Text>
                                    <Text style={styles.fieldvalue}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.applyContainer}>
                        <Text style={styles.sectionTitle}>Apply for</Text>
                        <DisplayInternshipCard
                            itemKey={itemKey}
                            img={img}
                            field={field}
                        />
                    </View>

                    <View style={{ width: '100%' }}>
                        <DisplayButton Title={'Apply'} color={'primaryColor'} onPressChanges={handleApply} />
                    </View>
                </View>
            </ScrollView >
        </>
    )
}

export default ApplyScreen;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    detailContainer: {
        width: '90%',
        height: 'auto',
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: Colors.lightText,
        marginTop: 40,
        paddingHorizontal: 12,
        paddingVertical: 12,
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
    applyContainer: {
        width: '90%',
        height: 'auto',
        marginTop: 30,
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    sectionTitle: {
        paddingTop: 10,
        color: Colors.lightText,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        paddingBottom: 4,
    },
});
