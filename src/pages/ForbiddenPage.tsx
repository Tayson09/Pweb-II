import { useNavigate } from 'react-router-dom';
import { Icon } from '../shared/components/Icon';
import { Button } from '../shared/components/Button';
import { useSession } from '../features/auth/session.store';
import './ForbiddenPage.css';

export function ForbiddenPage() {
  const nav = useNavigate();
  const logout = useSession(s => s.logout);

  const sair = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="forbidden">
      <Icon name="block" size={64} color="var(--text-muted)" />
      <h1>Acesso negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <div className="forbidden__actions">
        <Button onClick={() => nav('/inicio')}>Voltar ao início</Button>
        <Button variant="secondary" onClick={sair}>Sair</Button>
      </div>
    </div>
  );
}
