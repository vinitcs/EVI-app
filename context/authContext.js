import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, internshipSelectRef } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     console.log("AUTH_CONTEXT:  ",user);

     const [isAuthenticated, setIsAuthenticated] = useState(undefined);

     useEffect(() => {
          const unsub = onAuthStateChanged(auth, (user) => {
               // console.log('user: ', user)
               if (user) {
                    setIsAuthenticated(true);
                    setUser(user);
                    updateUserData(user.uid);

               } else {
                    setIsAuthenticated(false);
                    setUser(null);
               }

          });
          return unsub;
     }, []);


     const updateUserData = async (userId) => {
          try {
               const docRef = doc(db, 'users', userId);
               const docSnap = await getDoc(docRef);

               if (docSnap.exists()) {
                    let data = docSnap.data();
                    setUser({
                         ...user,
                         username: data.username,
                         branch: data.branch,
                         email: data.email,
                         college: data.college,
                         phone: data.phone,
                         ten_th: data.ten_th,
                         twelve_th: data.twelve_th,
                         ug: data.ug,
                         pg: data.pg,
                         location: data.location,
                         appliedInternships: data.appliedInternships,
                         userId: data.userId
                    })
                    // console.log(data);

               } else {
                    console.log('No such document!');
               }
          } catch (error) {
               console.error('Error getting document:', error);
          }
     }


     const login = async (email, password) => {
          try {
               const response = await signInWithEmailAndPassword(auth, email, password);
               return { success: true };
          } catch (e) {
               let msg = e.message;
               if (msg.includes('(auth/invalid-value-(email)')) msg = 'Invalid email';
               if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong Credentials!';
               if (msg.includes('(auth/operation-not-allowed)')) msg = 'Authentication service is off!';

               return { success: false, msg };
          }
     }

     const logout = async () => {
          try {
               await signOut(auth);
               return { success: true };

          } catch (error) {
               return { success: false, msg: error.message, error: error }
          }
     }

     const register = async (username, branch, email, college, phone, ten_th, twelve_th, ug, pg, location, password,) => {
          try {
               const response = await createUserWithEmailAndPassword(auth, email, password);
               console.log('response.user: ', response?.user);

               //setDoc for manual setting ID
               await setDoc(doc(db, "users", response?.user?.uid), {
                    username,
                    branch,
                    email,
                    college,
                    phone,
                    ten_th,
                    twelve_th,
                    ug,
                    pg,
                    location,
                    userId: response?.user?.uid
               });
               return { success: true, data: response?.user }
          } catch (e) {
               let msg = e.message;
               if (msg.includes('(auth/invalid-value-(email)')) msg = 'Invalid email';
               if (msg.includes('(auth/email-already-in-use)')) msg = 'Email already in use!';

               return { success: false, msg };

          }
     }

     return (
          <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
               {children}
          </AuthContext.Provider>
     )

}


export const useAuth = () => {
     const value = useContext(AuthContext);

     if (!value) {
          throw new Error('useAuth must be wrapped inside AuthContextProvider');
     }
     return value;

}