import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  console.log(auth?.currentUser?.email)
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider);
    } catch (error) {
      console.error();
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error();
    }
  };
  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Log Out</button>

    </div>
  );
};
