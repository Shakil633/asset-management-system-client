import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
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
  // useEffect(() => {
  //   const observer = onAuthStateChanged(auth, (CurrentUser) => {
  //     setUser(CurrentUser);
  //     setLoading(false);
  //   });

  //   return () => {
  //     observer();
  //   };
  // }, []);

  ///
  //currently using observer
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // if user exists then issue a token
      if (currentUser) {
        axios
          .post(
            "https://asset-management-system-server-xi.vercel.app/jwt",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("token respond", res.data);
          });
      } else {
        axios
          .post(
            "https://asset-management-system-server-xi.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });

    return () => {
      observer();
    };
  }, []);

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
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
