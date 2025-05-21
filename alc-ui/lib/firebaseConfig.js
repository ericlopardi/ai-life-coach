import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBlCxRiqINB8tTXsbk4IHnWL5TmLVT8kXg",
  authDomain: "ai-life-coach-cf44a.firebaseapp.com",
  projectId: "ai-life-coach-cf44a",
  storageBucket: "ai-life-coach-cf44a.appspot.com", 
  messagingSenderId: "690054798953",
  appId: "1:690054798953:web:b670b100e80f22976e8cf8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
