import Link from 'next/link';

import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/" passHref>
          test
        </Link>
        {/* <img src={logo} alt="logo" /> */}
      </nav>
    </header>
  );
}
