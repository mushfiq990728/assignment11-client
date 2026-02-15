import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register (Email & Password)
  const registerWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login (Email & Password)
  const loginWithEmailPassword = async (email, password) => {
    setLoading(true);
    
    try {
      // 1️⃣ First check if user exists in MongoDB
      const userCheck = await axios.get(`http://localhost:5000/users/role/${email}`);
      
      // 2️⃣ Check if user is blocked
      if (userCheck.data.status === "blocked") {
        throw new Error("Your account has been blocked. Please contact admin.");
      }

      // 3️⃣ If not blocked, proceed with Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
      
    } catch (error) {
      if (error.message.includes("blocked")) {
        throw error;
      }
      // If user not found in MongoDB, still try Firebase login
      return signInWithEmailAndPassword(auth, email, password);
    }
  };

  // ✅ Google Login
  const loginWithGoogle = async () => {
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // Try to get user from MongoDB
      let userExists = true;
      let userData = null;

      try {
        const response = await axios.get(`http://localhost:5000/users/${googleUser.email}`);
        userData = response.data.data;
      } catch (err) {
        if (err.response?.status === 404) {
          userExists = false;
        } else {
          throw err;
        }
      }

      // If user doesn't exist, create new user
      if (!userExists) {
        console.log("Creating new Google user in database...");
        
        const newUser = {
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL,
          bloodGroup: "Not Set",
          district: "Not Set",
          upazila: "Not Set",
          role: "donor",
          status: "active",
          createdAt: new Date(),
        };

        await axios.post("http://localhost:5000/users", newUser);
        console.log("✅ Google user saved to database");
      }

      // Check if user is blocked
      if (userData?.status === "blocked") {
        await signOut(auth);
        throw new Error("Your account has been blocked. Please contact admin.");
      }

      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // ✅ Logout
  const logout = () => {
    setLoading(true);
    setRole(null);
    setStatus(null);
    return signOut(auth);
  };

  // 🔑 Observe auth state + fetch role and status from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/users/role/${currentUser.email}`
          );
          
          console.log("👤 User role data:", res.data);
          
          setRole(res.data.role);
          setStatus(res.data.status);

          if (res.data.status === "blocked") {
            console.warn("⚠️ User is blocked, logging out...");
            await signOut(auth);
            toast.error("Your account has been blocked. Please contact admin.");
          }
          
        } catch (error) {
          console.error("Failed to fetch role", error);
          setRole(null);
          setStatus(null);
        }
      } else {
        setRole(null);
        setStatus(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    role,
    status,
    loading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    loginWithGoogle,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
