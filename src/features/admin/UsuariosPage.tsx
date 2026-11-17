import { useState } from 'react';
import { Avatar } from '../../shared/components/Avatar';
import { Banner } from '../../shared/components/Banner';
import { Button } from '../../shared/components/Button';
import { EmptyState } from '../../shared/components/EmptyState';
import { Input } from '../../shared/components/Input';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { Select } from '../../shared/components/Select';
import { useDomain } from '../../shared/data/domain.store';
import type { Usuario } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './UsuariosPage.css';

const CARGOS = [
  { valor: 'DEPPI', descricao: 'Gerencia cursos, inscrições e professores.' },
  { valor: 'ADMIN', descricao: 'Gerencia usuários, cargos e configurações técnicas.' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function UsuariosPage() {
  const usuarios = useDomain(s => s.usuarios);
  const concederCargo = useDomain(s => s.concederCargo);
  const addUsuario = useDomain(s => s.addUsuario);

  const [busca, setBusca] = useState('');
  const [filtroCargo, setFiltroCargo] = useState('TODOS');
  const [alvo, setAlvo] = useState<Usuario | null>(null);
  const [cargoSelecionado, setCargoSelecionado] = useState('DEPPI');

  const [novoAberto, setNovoAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoCargo, setNovoCargo] = useState('ALUNO');
  const [erroNovo, setErroNovo] = useState('');

  const filtrados = usuarios.filter(usuario => {
    const casaBusca = `${usuario.nome} ${usuario.email}`.toLowerCase().includes(busca.toLowerCase());
    const casaCargo = filtroCargo === 'TODOS' || usuario.cargos.includes(filtroCargo);
    return casaBusca && casaCargo;
  });

  function abrirModal(usuario: Usuario) {
    setCargoSelecionado('DEPPI');
    setAlvo(usuario);
  }

  function conceder() {
    if (!alvo) return;
    concederCargo(alvo.id, cargoSelecionado);
    setAlvo(null);
  }

  function abrirNovo() {
    setNovoNome('');
    setNovoEmail('');
    setNovoCargo('ALUNO');
    setErroNovo('');
    setNovoAberto(true);
  }

  function criarUsuario() {
    if (novoNome.trim().length < 3) {
      setErroNovo('Informe o nome completo (mínimo 3 caracteres).');
      return;
    }
    if (!EMAIL_REGEX.test(novoEmail.trim())) {
      setErroNovo('Informe um e-mail válido.');
      return;
    }
    addUsuario({ nome: novoNome.trim(), email: novoEmail.trim(), cargos: [novoCargo] });
    setNovoAberto(false);
  }

  return (
    <div className="usuarios-page">
      <PageHeader
        title="Usuários"
        subtitle={`${usuarios.length} usuários`}
        action={<Button leftIcon="add" onClick={abrirNovo}>Novo usuário</Button>}
      />

      <div className="usuarios__filtros">
        <SearchInput
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
        <Select value={filtroCargo} onChange={event => setFiltroCargo(event.target.value)}>
          <option value="TODOS">Cargo: Todos</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DEPPI">DEPPI</option>
          <option value="PROFESSOR">PROFESSOR</option>
          <option value="ALUNO">ALUNO</option>
        </Select>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState icon="group" title="Nenhum usuário encontrado" description="Tente buscar por outro nome, e-mail ou cargo." />
      ) : (
        <div className="usuarios-table-wrap">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cargos</th>
                <th>Criado em</th>
                <th><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(usuario => (
                <tr key={usuario.id}>
                  <td>
                    <div className="usuarios-pessoa">
                      <Avatar initials={usuario.iniciais} size={32} />
                      <span>{usuario.nome}</span>
                    </div>
                  </td>
                  <td>{usuario.email}</td>
                  <td>
                    <div className="usuarios-cargos">
                      {usuario.cargos.map(cargo => (
                        <span key={cargo} className="usuarios-cargo mono">{cargo}</span>
                      ))}
                    </div>
                  </td>
                  <td className="mono">{dataCurta(usuario.criadoEm)}</td>
                  <td className="usuarios-acao">
                    <Button variant="secondary" size="sm" leftIcon="add_moderator" onClick={() => abrirModal(usuario)}>
                      Conceder cargo
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {alvo && (
        <div className="usuarios-modal-backdrop" role="presentation" onClick={() => setAlvo(null)}>
          <div
            className="usuarios-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="usuarios-modal-title"
            onClick={event => event.stopPropagation()}
          >
            <h2 id="usuarios-modal-title">Conceder cargo</h2>
            <p>Escolha o cargo para <strong>{alvo.nome}</strong>. Os cargos atuais são mantidos.</p>

            <div className="usuarios-radios">
              {CARGOS.map(cargo => (
                <button
                  key={cargo.valor}
                  type="button"
                  className={`usuarios-radio ${cargoSelecionado === cargo.valor ? 'is-selected' : ''}`}
                  onClick={() => setCargoSelecionado(cargo.valor)}
                >
                  <span className="usuarios-radio__dot" />
                  <span className="usuarios-radio__texto">
                    <span className="usuarios-radio__titulo mono">{cargo.valor}</span>
                    <span className="usuarios-radio__desc">{cargo.descricao}</span>
                  </span>
                </button>
              ))}
            </div>

            <Banner variant="warning">Esta ação não pode ser desfeita pela interface.</Banner>

            <div className="usuarios-modal__actions">
              <Button variant="secondary" onClick={() => setAlvo(null)}>Cancelar</Button>
              <Button leftIcon="add_moderator" onClick={conceder}>Conceder {cargoSelecionado}</Button>
            </div>
          </div>
        </div>
      )}

      {novoAberto && (
        <div className="usuarios-modal-backdrop" role="presentation" onClick={() => setNovoAberto(false)}>
          <div
            className="usuarios-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="usuarios-novo-title"
            onClick={event => event.stopPropagation()}
          >
            <h2 id="usuarios-novo-title">Novo usuário</h2>
            <p>Cadastre um novo usuário e defina o cargo inicial.</p>

            <div className="usuarios-form">
              <Input
                label="Nome completo"
                placeholder="Ex.: Maria da Silva"
                value={novoNome}
                onChange={event => { setNovoNome(event.target.value); setErroNovo(''); }}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="usuario@ifce.edu.br"
                value={novoEmail}
                onChange={event => { setNovoEmail(event.target.value); setErroNovo(''); }}
              />
              <Select label="Cargo inicial" value={novoCargo} onChange={event => setNovoCargo(event.target.value)}>
                <option value="ALUNO">ALUNO</option>
                <option value="PROFESSOR">PROFESSOR</option>
                <option value="DEPPI">DEPPI</option>
                <option value="ADMIN">ADMIN</option>
              </Select>
            </div>

            {erroNovo && <Banner variant="danger">{erroNovo}</Banner>}

            <div className="usuarios-modal__actions">
              <Button variant="secondary" onClick={() => setNovoAberto(false)}>Cancelar</Button>
              <Button leftIcon="add" onClick={criarUsuario}>Cadastrar usuário</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
