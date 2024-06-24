import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '../constants/Colors';
import DisplayButton from '../components/Button/DisplayButton';
import UserInput from '../components/Credentials/UserInput';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading/Loading';
import { useAuth } from '../context/authContext';

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  // console.log("emailRef ",emailRef )
  const passwordRef = useRef("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      Alert.alert('Sign In', "Please fill all the fields!");
      return;
    } else {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      // Perform login logic here
      console.log("Sign In=> ", "Email: ", email, " Password :", password);

      setLoading(true);
      const response = await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      console.log('Sign In response', response);
      if (!response.success) {
        Alert.alert('Sign In', response.msg)
      }

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primaryColor} barStyle="light-content" />
      <View style={{
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        bottom: 60,
      }}>
        <Text style={{
          fontSize: 20,
          color: Colors.lightText
        }}>SIGN IN</Text>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20,
      }}>
        <Text style={{
          color: 'black',
          fontSize: 12,
          textAlign: 'center',
          fontWeight: '400',
          letterSpacing: 1,
        }}>Welcome To,</Text>

        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          // bottom: 4,
          fontWeight: '500',
          color: Colors.primaryColor
        }}>Exposys Data Labs</Text>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <UserInput
          placeholder={'Email address'}
          leftIcon={'leftIcon'}
          leftIconName={'mail'}
          ref={emailRef}
        />

        <UserInput
          placeholder={'Password'}
          leftIcon={'leftIcon'}
          rightIcon={'rightIcon'}
          leftIconName={'lock-closed'}
          ref={passwordRef}
        />
      </View>

      {/* <View style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: 12,
        paddingLeft: 6,
      }}>
        <TouchableOpacity onPress={() => router.push('ForgotPassword')}>
          <Text style={{
            fontWeight: '500',
            color: Colors.lightText,
            fontSize: 12,
          }}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
      </View> */}

      {loading ? (
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: 'center'
        }}>
          <Loading size={100} />
        </View>
      ) : (
        <View style={{ marginTop: 25, }}>
          <DisplayButton Title={'Sign In'} color={'primaryColor'} onPressChanges={handleLogin} />
        </View>
      )
      }


      <View style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // bottom: 30,
        top: 180
      }}>
        <Text style={{
          fontSize: 12,
        }}>Already haven't an account?</Text>
        <TouchableOpacity onPress={() => router.push('register')}>
          <Text style={{
            fontWeight: '600',
            fontSize: 12,
            color: Colors.primaryColor,
          }}>Register here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
