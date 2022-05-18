import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <Link href="/" passHref>
          test
        </Link>
        <nav>
          <p>{user?.name}</p>
          <Link href={`/profile`}>profile</Link>
        </nav>
      </nav>
    </header>
  );
}
