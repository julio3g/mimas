import Link from 'next/link';

import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/" passHref>
          test
        </Link>
        <nav>
          <Link href="/profile">profile</Link>
        </nav>
        <div>test</div>
      </nav>
    </header>
  );
}
