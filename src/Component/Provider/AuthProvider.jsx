import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
  
    //google Sing In
    const googleSingIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    // user SingUp
    const userSingUp = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // user singIn
    const userSingIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // Update User Profile
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
  
    // log out User
    const logOutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    //currently using observer
    useEffect(() => {
      const observer = onAuthStateChanged(auth, (CurrentUser) => {
        setUser(CurrentUser);
        setLoading(false);
      });
  
      return () => {
        observer();
      };
    }, []);
  
    console.log(user);
  
    const AuthInfo = {
      googleSingIn,
      userSingUp,
      userSingIn,
      logOutUser,
      user,
      loading,
      updateUserProfile,
    };


    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;