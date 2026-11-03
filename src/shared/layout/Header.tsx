import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { useSession } from '../../features/auth/session.store';
import { useTheme } from '../theme/theme.store';
import { NAV_ITEMS } from '../routes';
import './Header.css';

function tituloRota(pathname: string): string {
  const item = NAV_ITEMS.find(i => pathname === i.path || pathname.startsWith(i.path + '/'));
  return item?.label ?? 'DEPPI';
}

export function Header() {
  const user = useSession(s => s.user);
  const logout = useSession(s => s.logout);
  const theme = useTheme(s => s.theme);
  const toggleTheme = useTheme(s => s.toggle);
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fora = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener('mousedown', fora);
    return () => document.removeEventListener('mousedown', fora);
  }, []);

  if (!user) return null;

  const sair = () => {
    logout();
    nav('/login');
  };

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__icon" aria-label="Menu"><Icon name="menu" size={22} color="var(--text-muted)" /></button>
        <span className="header__crumb">{tituloRota(pathname)}</span>
      </div>

      <div className="header__right">
        <button className="header__icon" aria-label="Tema" onClick={toggleTheme}>
          <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={20} color="var(--text-muted)" />
        </button>
        <div className="header__user" ref={ref}>
          <button className="header__user-btn" onClick={() => setAberto(v => !v)}>
            <div className="header__user-info">
              <span className="header__user-name">{user.name}</span>
              <span className="header__user-role mono">{user.role}</span>
            </div>
            <Avatar initials={user.initials} size={32} />
          </button>
          {aberto && (
            <div className="header__menu">
              <button className="header__menu-item" onClick={sair}>
                <Icon name="logout" size={18} color="var(--text-muted)" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
