import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8wgTKKlbIyP8E9RHzgNK4uWiSrqPpM4E",
  authDomain: "assignment-11-pet-adoption.firebaseapp.com",
  projectId: "assignment-11-pet-adoption",
  storageBucket: "assignment-11-pet-adoption.firebasestorage.app",
  messagingSenderId: "1001693811125",
  appId: "1:1001693811125:web:e758172cc0d1a84089c9fc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 