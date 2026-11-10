import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUi } from './ui.store';
import './AppShell.css';

export function AppShell() {
  const sidebarHidden = useUi(s => s.sidebarHidden);

  return (
    <div className={`app-shell ${sidebarHidden ? 'is-sidebar-hidden' : ''}`}>
      {!sidebarHidden && <Sidebar />}
      <div className="app-content">
        <Header />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
