import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

export default function Layout() {
     return (
          <Tabs screenOptions={{
               // headerShown: false,
               tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 0,
                    elevation: 0,
                    padding: 0,
               },
               tabBarShowLabel: false,
               tabBarActiveTintColor: Colors.primaryColor,
               tabBarInactiveTintColor: '#999',

          }}>
               <Tabs.Screen name='home' options={{

                    title: 'home',
                    tabBarIcon: ({ color }) => (

                         <Ionicons name='home' size={28} color={color} />
                    ),
               }} />
               <Tabs.Screen name='notification' options={{

                    title: 'notification',
                    tabBarIcon: ({ color }) => (

                         <Ionicons name='notifications' size={28} color={color} />
                    ),
               }} />
               <Tabs.Screen name='profile' options={{

                    title: 'profile',
                    tabBarIcon: ({ color }) => (

                         <FontAwesome name='user' size={28} color={color} />
                    ),
               }} />

          </Tabs>
     )
}