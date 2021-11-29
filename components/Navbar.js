import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* state 1: user signed in */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <Image src={user?.photoURL} alt={`/${username}`} />
              </Link>
            </li>
          </>
        )}
        {/* state 2: not signed in, no username */}
        {!username && (
          <li>
          <Link href="/enter" passHref>
            <button>Log in</button>
          </Link>
        </li>
        )}

      </ul>
    </nav>
  )
}