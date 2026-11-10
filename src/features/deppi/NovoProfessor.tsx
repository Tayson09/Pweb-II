import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../../shared/components/Banner';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { Input } from '../../shared/components/Input';
import { PageHeader } from '../../shared/components/PageHeader';
import { Select } from '../../shared/components/Select';
import { useDomain } from '../../shared/data/domain.store';
import { iniciais } from '../../shared/format';
import './NovoProfessor.css';

export function NovoProfessor() {
  const addProfessor = useDomain(s => s.addProfessor);
  const nav = useNavigate();
  const [nome, setNome] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [siape, setSiape] = useState('');
  const [email, setEmail] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [participaPGD, setParticipaPGD] = useState(false);

  const valido = Boolean(nome.trim() && usuarioId.trim() && siape.trim() && email.trim());

  function cadastrar() {
    if (!valido) return;
    addProfessor({
      nome: nome.trim(),
      siape: siape.trim(),
      email: email.trim(),
      iniciais: iniciais(nome),
      titulacao: titulacao || undefined,
      participaPGD,
    });
    nav('/professores');
  }

  return (
    <div>
      <PageHeader title="Novo professor" subtitle="Vincule um usuário existente e informe os dados funcionais." />
      <Banner>
        P4 · Ainda não dá para criar o usuário do professor por aqui. Informe o ID de um usuário já cadastrado.
      </Banner>

      <div className="novo-professor">
        <Card title="Vínculo">
          <Input
            label="ID do usuário"
            mono
            placeholder="UUID do usuário"
            value={usuarioId}
            onChange={event => setUsuarioId(event.target.value)}
            hint="UUID do usuário. O administrador encontra em Usuários."
          />
        </Card>

        <Card title="Dados funcionais">
          <div className="form-stack">
            <Input label="Nome completo" value={nome} onChange={event => setNome(event.target.value)} />
            <div className="form-row">
              <Input label="SIAPE" mono value={siape} onChange={event => setSiape(event.target.value)} />
              <Input label="E-mail institucional" type="email" value={email} onChange={event => setEmail(event.target.value)} />
            </div>
            <Select label="Titulação (opcional)" value={titulacao} onChange={event => setTitulacao(event.target.value)}>
              <option value="">Selecione</option>
              <option value="Especialista">Especialista</option>
              <option value="Mestre">Mestre</option>
              <option value="Mestra">Mestra</option>
              <option value="Doutor">Doutor</option>
              <option value="Doutora">Doutora</option>
            </Select>
            <label className="pgd-toggle">
              <input type="checkbox" checked={participaPGD} onChange={event => setParticipaPGD(event.target.checked)} />
              <span><strong>Participa do PGD</strong><small>Programa de Gestão e Desempenho</small></span>
            </label>
          </div>
        </Card>
      </div>

      <div className="novo-professor__actions">
        <Button variant="secondary" onClick={() => nav('/professores')}>Cancelar</Button>
        <Button leftIcon="person_add" disabled={!valido} onClick={cadastrar}>Cadastrar professor</Button>
      </div>
    </div>
  );
}
