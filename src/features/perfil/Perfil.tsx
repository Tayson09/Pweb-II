import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { Icon } from '../../shared/components/Icon';
import { useSession } from '../auth/session.store';
import { useTheme } from '../../shared/theme/theme.store';
import type { Role } from '../../shared/routes';
import { dataCurta } from '../../shared/format';
import './Perfil.css';

const ROLE_LABEL: Record<Role, string> = {
  ALUNO: 'Aluno',
  PROFESSOR: 'Professor',
  DEPPI: 'Servidor DEPPI',
  ADMIN: 'Administrador',
};

type Campo = { label: string; valor: string; mono?: boolean };

export function Perfil() {
  const user = useSession(s => s.user)!;
  const login = useSession(s => s.login);
  const logout = useSession(s => s.logout);
  const theme = useTheme(s => s.theme);
  const toggleTheme = useTheme(s => s.toggle);
  const nav = useNavigate();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState('');

  const senhaCurta = senha.length > 0 && senha.length < 8;
  const nomeInvalido = editando && nome.trim().length === 0;
  const emailInvalido = editando && !/^\S+@\S+\.\S+$/.test(email);

  const campos: Campo[] = [
    { label: 'Cargo', valor: ROLE_LABEL[user.role] },
    ...(user.siape ? [{ label: 'SIAPE', valor: user.siape, mono: true }] : []),
    ...(user.matricula ? [{ label: 'Matrícula', valor: user.matricula, mono: true }] : []),
    ...(user.criadoEm ? [{ label: 'Membro desde', valor: dataCurta(user.criadoEm) }] : []),
  ];

  function salvar() {
    if (nomeInvalido || emailInvalido) return;
    login({ ...user, name: nome.trim(), email: email.trim() });
    setEditando(false);
  }

  function cancelar() {
    setNome(user.name);
    setEmail(user.email);
    setEditando(false);
  }

  function trocarSenha() {
    if (senha.length < 8) return;
    alert('Senha trocada (mock).');
    setSenha('');
  }

  function sair() {
    logout();
    nav('/login');
  }

  return (
    <div>
      <PageHeader title="Perfil" subtitle="Seus dados, senha e preferências no sistema" />

      <div className="perfil">
        <Card className="perfil__conta">
          <div className="perfil__identidade">
            <Avatar initials={user.initials} size={72} />
            {editando ? (
              <div className="form-stack perfil__edit">
                <Input label="Nome" value={nome} onChange={e => setNome(e.target.value)} error={nomeInvalido ? 'Informe seu nome.' : undefined} />
                <Input label="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} error={emailInvalido ? 'E-mail inválido.' : undefined} />
              </div>
            ) : (
              <div>
                <h2 className="perfil__nome">{user.name}</h2>
                <span className="perfil__email">{user.email}</span>
                <div><span className="perfil__cargo mono">{ROLE_LABEL[user.role]}</span></div>
              </div>
            )}
          </div>

          {!editando && (
            <dl className="perfil__dados">
              {campos.map(c => (
                <div key={c.label}>
                  <dt>{c.label}</dt>
                  <dd className={c.mono ? 'mono' : undefined}>{c.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="perfil__acoes">
            {editando ? (
              <>
                <Button variant="secondary" onClick={cancelar}>Cancelar</Button>
                <Button leftIcon="check" disabled={nomeInvalido || emailInvalido} onClick={salvar}>Salvar</Button>
              </>
            ) : (
              <Button variant="secondary" leftIcon="edit" onClick={() => setEditando(true)}>Editar perfil</Button>
            )}
          </div>
        </Card>

        <div className="perfil__lateral">
          <Card title="Trocar senha">
            <div className="form-stack">
              <Input
                label="Nova senha"
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                hint="Mínimo de 8 caracteres."
                error={senhaCurta ? 'Mínimo de 8 caracteres.' : undefined}
                placeholder="••••••••"
              />
              <div>
                <Button leftIcon="lock" disabled={senha.length < 8} onClick={trocarSenha}>Trocar senha</Button>
              </div>
            </div>
          </Card>

          <Card title="Preferências">
            <div className="perfil__pref">
              <div>
                <p className="perfil__pref-label">Tema</p>
                <p className="perfil__pref-sub">{theme === 'dark' ? 'Escuro' : 'Claro'}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={theme === 'dark' ? 'light_mode' : 'dark_mode'}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? 'Usar claro' : 'Usar escuro'}
              </Button>
            </div>
          </Card>

          <Card title="Sessão">
            <p className="perfil__sessao-sub">
              <Icon name="info" size={16} color="var(--text-muted)" />
              Conectado como <strong>{user.email}</strong>.
            </p>
            <Button variant="danger" leftIcon="logout" fullWidth onClick={sair}>
              Sair da conta
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
