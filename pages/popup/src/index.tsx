import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Popup from '@src/Popup';
import React from 'react';
import Auth from '@src/auth';
import FirebaseAuth from '@src/firebase';

// import { ClerkProvider } from '@clerk/clerk-react';
import { ClerkProvider } from '@clerk/chrome-extension';

// Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.CEB_CLERK_PUBLISHABLE_KEY;
const PUBLISHABLE_KEY = process.env.CEB_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  // root.render(<p>asdasd</p>);
  root.render(
    <React.StrictMode>
      <h2>popup index</h2>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY!}>
        {/* <Popup /> */}
        <div>auth down here</div>
        <Auth />
        {/* <FirebaseAuth /> */}
      </ClerkProvider>
    </React.StrictMode>,
  );
}

init();
