import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase/config";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = (email, password, name) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.updateProfile({ displayName: name });
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
  };
}
