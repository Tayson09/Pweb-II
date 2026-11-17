import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUi } from './ui.store';
import './AppShell.css';

export function AppShell() {
  const sidebarHidden = useUi(s => s.sidebarHidden);
  const toggleSidebar = useUi(s => s.toggleSidebar);

  // Atalho Ctrl+B (ou Cmd+B no Mac) para esconder/mostrar a barra lateral.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleSidebar]);

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
