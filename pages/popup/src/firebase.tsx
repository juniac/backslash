'use client';
// import { useAuth } from '@clerk/nextjs';
import { useAuth } from '@clerk/chrome-extension';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

// Add your Firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyCFsXbR2rAADHXzcHrmck7Sz8hvUlOMTZo',
  authDomain: 'backslash-extension.firebaseapp.com',
  projectId: 'backslash-extension',
  storageBucket: 'backslash-extension.firebasestorage.app',
  messagingSenderId: '216747548900',
  appId: '1:216747548900:web:4cd9ab0fc252b9015e8cf1',
  measurementId: 'G-RWH6X0QG3F',
};

// Connect to your Firebase app
const app = initializeApp(firebaseConfig);
// Connect to your Firestore database
const db = getFirestore(app);
// Connect to Firebase auth
const auth = getAuth(app);

// Remove this if you do not have Firestore set up
// for your Firebase app
const getFirestoreData = async () => {
  const docRef = doc(db, 'example', 'example-document');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!');
  }
};

export default function FirebaseAuth() {
  const { getToken, userId } = useAuth();

  // Handle if the user is not signed in
  // You could display content, or redirect them to a sign-in page
  if (!userId) {
    return <p>You need to sign in with Clerk to access this page.</p>;
  }

  const signIntoFirebaseWithClerk = async () => {
    const token = await getToken({ template: 'integration_firebase' });

    const userCredentials = await signInWithCustomToken(auth, token || '');
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log('User:', userCredentials.user);
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <p>Login</p>
      <button onClick={signIntoFirebaseWithClerk}>Sign in</button>

      {/* Remove this button if you do not have Firestore set up */}
      <button onClick={getFirestoreData}>Get document</button>
    </main>
  );
}
