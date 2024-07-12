// import Colors from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AuthContextProvider, useAuth } from '../context/authContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.

const Mainlayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //check if user is authenticatd or not...
    if (typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] == '(app)';
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace('home');
    } else if (isAuthenticated == false) {
      // redirect to signIn
      router.replace('signIn');
    }
  }, [isAuthenticated])
  return <Slot />
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <Mainlayout />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
