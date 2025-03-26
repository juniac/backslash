// import '@src/Popup.css';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/chrome-extension';

export default function Auth() {
  return (
    <header className="w-full">
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
