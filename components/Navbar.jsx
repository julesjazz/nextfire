import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  // TODO: nextify images
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">BOOP</button>
          </Link>
        </li>

        {/* state 1: user signed in with username*/}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}
        {/* state 2: not signed in, no username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
}