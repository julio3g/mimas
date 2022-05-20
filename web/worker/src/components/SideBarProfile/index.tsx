import Link from "next/link";

export function SideBarProfile() {
  return (
    <nav>
      <ul>
        <li><Link href='/profile'>Conta</Link></li>
        <li><Link href='/profile/notifications'>Notificacoes</Link></li>
        <li><Link href='/profile'>Aparencia</Link></li>
        <li><Link href='/profile'>Sobre</Link></li>
        <li><button>Sair</button></li>
      </ul>
    </nav>
  )
}