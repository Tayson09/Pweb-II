import { useMemo, useState } from 'react';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { EmptyState } from '../../shared/components/EmptyState';
import { Input } from '../../shared/components/Input';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { useDomain } from '../../shared/data/domain.store';
import type { Instituicao } from '../../shared/data/domain.store';
import './InstituicoesPage.css';

type FormData = Omit<Instituicao, 'id'>;

const EMPTY_FORM: FormData = {
  nome: '',
  campus: '',
  cidade: '',
  cnpj: '',
};

export function InstituicoesPage() {
  const instituicoes = useDomain(s => s.instituicoes);
  const addInstituicao = useDomain(s => s.addInstituicao);
  const updateInstituicao = useDomain(s => s.updateInstituicao);
  const removeInstituicao = useDomain(s => s.removeInstituicao);
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return instituicoes;
    return instituicoes.filter(instituicao =>
      `${instituicao.nome} ${instituicao.campus} ${instituicao.cidade} ${instituicao.cnpj}`
        .toLowerCase()
        .includes(termo),
    );
  }, [busca, instituicoes]);

  const emEdicao = editandoId !== null;
  const formValido = Object.values(form).every(value => value.trim() !== '');

  function alterar(campo: keyof FormData, valor: string) {
    setForm(atual => ({ ...atual, [campo]: valor }));
  }

  function iniciarCadastro() {
    setForm(EMPTY_FORM);
    setEditandoId('');
  }

  function iniciarEdicao(instituicao: Instituicao) {
    setForm({
      nome: instituicao.nome,
      campus: instituicao.campus,
      cidade: instituicao.cidade,
      cnpj: instituicao.cnpj,
    });
    setEditandoId(instituicao.id);
  }

  function cancelar() {
    setForm(EMPTY_FORM);
    setEditandoId(null);
  }

  function salvar() {
    if (!formValido) return;
    if (editandoId) {
      updateInstituicao(editandoId, form);
    } else {
      addInstituicao(form);
    }
    cancelar();
  }

  function remover(instituicao: Instituicao) {
    if (window.confirm(`Remover a instituição ${instituicao.nome} - ${instituicao.campus}?`)) {
      removeInstituicao(instituicao.id);
    }
  }

  return (
    <div>
      <PageHeader
        title="Instituições"
        subtitle={`${instituicoes.length} ${instituicoes.length === 1 ? 'instituição cadastrada' : 'instituições cadastradas'}`}
        action={<Button leftIcon="add" onClick={iniciarCadastro}>Nova instituição</Button>}
      />

      {emEdicao && (
        <Card title={editandoId ? 'Editar instituição' : 'Nova instituição'} className="instituicoes-form">
          <div className="instituicoes-form__grid">
            <Input label="Nome" value={form.nome} onChange={event => alterar('nome', event.target.value)} />
            <Input label="Campus" value={form.campus} onChange={event => alterar('campus', event.target.value)} />
            <Input label="Cidade/UF" value={form.cidade} onChange={event => alterar('cidade', event.target.value)} placeholder="Fortaleza/CE" />
            <Input label="CNPJ" value={form.cnpj} onChange={event => alterar('cnpj', event.target.value)} />
          </div>
          <div className="instituicoes-form__actions">
            <Button variant="secondary" onClick={cancelar}>Cancelar</Button>
            <Button onClick={salvar} disabled={!formValido}>{editandoId ? 'Salvar alterações' : 'Cadastrar instituição'}</Button>
          </div>
        </Card>
      )}

      <div className="instituicoes__search">
        <SearchInput
          placeholder="Buscar por nome, campus ou CNPJ"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
      </div>

      {filtradas.length === 0 ? (
        <EmptyState
          icon="apartment"
          title="Nenhuma instituição encontrada"
          description={busca ? 'Tente buscar por outro nome, campus ou CNPJ.' : 'Cadastre a primeira instituição para começar.'}
          action={!busca ? <Button onClick={iniciarCadastro}>Cadastrar instituição</Button> : undefined}
        />
      ) : (
        <div className="instituicoes-table-wrap">
          <table className="instituicoes-table">
            <thead>
              <tr><th>Instituição</th><th>Campus</th><th>Cidade/UF</th><th>CNPJ</th><th aria-label="Ações" /></tr>
            </thead>
            <tbody>
              {filtradas.map(instituicao => (
                <tr key={instituicao.id}>
                  <td className="instituicoes-table__name">{instituicao.nome}</td>
                  <td>{instituicao.campus}</td>
                  <td>{instituicao.cidade}</td>
                  <td className="mono">{instituicao.cnpj}</td>
                  <td className="instituicoes-table__actions">
                    <Button variant="ghost" size="sm" onClick={() => iniciarEdicao(instituicao)}>Editar</Button>
                    <Button variant="ghost" size="sm" className="instituicoes-table__remove" onClick={() => remover(instituicao)}>Remover</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
