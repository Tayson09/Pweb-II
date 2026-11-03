import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Icon } from '../../shared/components/Icon';
import { useSession } from './session.store';
import { fakeLogin } from './mock-users';
import './LoginPage.css';

export function LoginPage() {
  const nav = useNavigate();
  const login = useSession(s => s.login);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function submeter(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const user = await fakeLogin(email, senha);
      login(user);
      nav('/inicio');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha no login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <div className="login__aside">
        <img className="login__ifce" src="/campus.png" alt="IFCE" />
        <div>
          <h1 className="login__headline">Cursos de extensão <strong>do IFCE</strong>, num só lugar.</h1>
          <p className="login__lead">Inscreva-se, envie seus documentos e acompanhe a análise da sua inscrição.</p>
        </div>
      </div>

      <div className="login__panel">
        <div className="login__brand">
          <span className="login__logo">D</span>
          <div>
            <p className="login__brand-name">DEPPI</p>
            <p className="login__brand-sub">IFCE · Extensão</p>
          </div>
        </div>

        <h2>Entrar</h2>
        <p className="login__sub">Use seu e-mail institucional.</p>

        {erro && (
          <div className="login__error">
            <Icon name="error" size={18} color="var(--danger)" />
            {erro}
          </div>
        )}

        <form className="login__form" onSubmit={submeter}>
          <Input
            label="E-mail"
            type="email"
            placeholder="voce@ifce.edu.br"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <Button type="submit" fullWidth loading={carregando}>Entrar</Button>
        </form>
      </div>
    </div>
  );
}
