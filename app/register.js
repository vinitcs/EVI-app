import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, StatusBar, Alert, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '../constants/Colors';
import DisplayButton from '../components/Button/DisplayButton';
import UserInput from '../components/Credentials/UserInput';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading/Loading';
import { useAuth } from '../context/authContext';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const nameRef = useRef("");
  const branchRef = useRef("");
  const emailRef = useRef("");
  const collegeRef = useRef("");
  const phoneRef = useRef("");
  const tenthRef = useRef("");
  const twelvethRef = useRef("");
  const ugRef = useRef("");
  const pgRef = useRef("");
  const locationRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleRegister = async () => {
    if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !confirmPasswordRef.current.value) {
      Alert.alert('Register', "Please fill all the fields!");
      return;
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      Alert.alert('Register', "Please check Password and Confirm password!");
      return;
    }

    setLoading(true);
    let response = await register(
      nameRef.current.value,
      branchRef.current.value,
      emailRef.current.value,
      collegeRef.current.value,
      phoneRef.current.value,
      tenthRef.current.value,
      twelvethRef.current.value,
      ugRef.current.value,
      pgRef.current.value,
      locationRef.current.value,
      passwordRef.current.value,
    );
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={styles.keyboardAvoidingView}>
        <StatusBar backgroundColor={Colors.primaryColor} barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollViewContent} bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>REGISTER</Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome To,</Text>
            <Text style={styles.companyName}>Exposys Data Labs</Text>
          </View>

          <View style={styles.inputContainer}>
            <UserInput placeholder={'Name'} ref={nameRef} />
            <UserInput placeholder={'Branch'} ref={branchRef} />
            <UserInput placeholder={'Email'} ref={emailRef} />
            <UserInput placeholder={'College'} ref={collegeRef} />
            <UserInput placeholder={'Phone'} ref={phoneRef} maxLength={10} />
            <UserInput placeholder={'10th Percentage'} ref={tenthRef} />
            <UserInput placeholder={'12th Percentage'} ref={twelvethRef} />
            <UserInput placeholder={'UG'} ref={ugRef} />
            <View style={{
              paddingHorizontal: 15,
              marginTop: -12,
              // backgroundColor: 'pink'
            }}>
              <Text style={{
                fontSize: 12,
                color: Colors.lightText,
                fontWeight: '400',

              }}>Enter <Text style={styles.highlightText}>current semester</Text> or if completed mentioned <Text style={styles.highlightText}>year of passing</Text></Text>
            </View>
            <UserInput placeholder={'PG'} ref={pgRef} />
            <View style={{
              paddingHorizontal: 15,
              marginTop: -12,
              // backgroundColor: 'pink'
            }}>
              <Text style={{
                fontSize: 12,
                color: Colors.lightText,
                fontWeight: '400',

              }}>If no PG then mentioned <Text style={styles.highlightText}>'NA'</Text></Text>
            </View>
            <UserInput placeholder={'Location'} ref={locationRef} />
            <UserInput placeholder={'Password'} leftIcon={'leftIcon'} rightIcon={'rightIcon'} leftIconName={'lock-closed'} ref={passwordRef} />
            <UserInput placeholder={'Confirm password'} leftIcon={'leftIcon'} rightIcon={'rightIcon'} leftIconName={'lock-closed'} ref={confirmPasswordRef} />

            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size={100} />
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <DisplayButton Title={'Register'} color={'primaryColor'} onPressChanges={handleRegister} />
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('signIn')}>
              <Text style={styles.highlightText}>Sign In here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor:'orange'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 60, // Adjust this value as needed
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 20,
    color: Colors.lightText,
    letterSpacing: 1.5,
  },
  welcomeContainer: {
    marginBottom: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 1,
  },
  companyName: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.primaryColor,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 18,
    marginBottom: 25,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 25,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
  },
  highlightText: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.primaryColor,
  },
});
