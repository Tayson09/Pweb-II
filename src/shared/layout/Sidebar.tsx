import { NavLink } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useSession } from '../../features/auth/session.store';
import { navForRole } from '../routes';
import './Sidebar.css';

export function Sidebar() {
  const user = useSession(s => s.user);
  if (!user) return null;
  const items = navForRole(user.role);

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">D</span>
        <div>
          <p className="sidebar__name">DEPPI</p>
          <p className="sidebar__sub">IFCE · Extensão</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        {items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
