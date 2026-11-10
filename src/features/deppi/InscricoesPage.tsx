import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Banner } from '../../shared/components/Banner';
import { Button } from '../../shared/components/Button';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { StatusChip } from '../../shared/components/StatusChip';
import { useDomain } from '../../shared/data/domain.store';
import type { EnrollmentStatus, Inscricao } from '../../shared/data/domain.store';
import { ABAS_INSCRICOES } from '../../shared/data/mocks';
import { dataCurta } from '../../shared/format';
import './InscricoesPage.css';

type Filtro = EnrollmentStatus | 'TODAS';
type Acao = 'deferir' | 'indeferir';

export function InscricoesPage() {
  const inscricoes = useDomain(s => s.inscricoes);
  const deferirInscricao = useDomain(s => s.deferirInscricao);
  const indeferirInscricao = useDomain(s => s.indeferirInscricao);
  const nav = useNavigate();
  const [filtro, setFiltro] = useState<Filtro>('PENDENTE');
  const [modal, setModal] = useState<{ acao: Acao; inscricao: Inscricao } | null>(null);
  const [motivo, setMotivo] = useState('');
  const [erro, setErro] = useState('');

  const filtradas = filtro === 'TODAS'
    ? inscricoes
    : inscricoes.filter(inscricao => inscricao.status === filtro);

  function abrirModal(acao: Acao, inscricao: Inscricao) {
    setErro('');
    setMotivo('');
    setModal({ acao, inscricao });
  }

  function confirmar() {
    if (!modal) return;

    if (modal.acao === 'deferir') {
      const resultado = deferirInscricao(modal.inscricao.id);
      if (!resultado.ok) {
        setErro(resultado.motivo ?? 'Não foi possível deferir a inscrição.');
        return;
      }
    } else {
      if (motivo.length > 0 && motivo.length < 3) {
        setErro('Informe pelo menos 3 caracteres ou deixe o motivo vazio.');
        return;
      }
      indeferirInscricao(modal.inscricao.id, motivo);
    }

    setModal(null);
  }

  return (
    <div className="inscricoes-page">
      <PageHeader
        title="Inscrições"
        subtitle="Analise, defira ou indefira as inscrições dos alunos."
      />

      <nav className="inscricoes-tabs" aria-label="Filtrar inscrições">
        {ABAS_INSCRICOES.map(aba => (
          <button
            className={filtro === aba.key ? 'is-active' : ''}
            key={aba.key}
            type="button"
            onClick={() => setFiltro(aba.key)}
          >
            {aba.label}
            <span>{aba.key === 'TODAS' ? inscricoes.length : inscricoes.filter(i => i.status === aba.key).length}</span>
          </button>
        ))}
      </nav>

      {filtradas.length === 0 ? (
        <EmptyState icon="assignment" title="Nenhuma inscrição encontrada" description="Não há inscrições nesta situação." />
      ) : (
        <>
          <div className="inscricoes-table-wrap">
            <table className="inscricoes-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>E-mail</th>
                  <th>Matrícula</th>
                  <th>Curso</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th><span className="sr-only">Ações</span></th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map(inscricao => (
                  <tr key={inscricao.id} onClick={() => nav(`/inscricoes/${inscricao.id}`)}>
                    <td>
                      <div className="inscricoes-aluno">
                        <Avatar initials={iniciaisAluno(inscricao.alunoNome)} size={32} />
                        <span>{inscricao.alunoNome}</span>
                      </div>
                    </td>
                    <td>{inscricao.alunoEmail}</td>
                    <td className="mono">{inscricao.matricula}</td>
                    <td>{inscricao.cursoNome}</td>
                    <td className="mono">{dataCurta(inscricao.data)}</td>
                    <td><StatusChip status={inscricao.status} size="sm" /></td>
                    <td>
                      {inscricao.status === 'PENDENTE' && (
                        <div className="inscricoes-acoes" onClick={event => event.stopPropagation()}>
                          <Button size="sm" leftIcon="check_circle" onClick={() => abrirModal('deferir', inscricao)}>
                            Deferir
                          </Button>
                          <Button size="sm" variant="danger" leftIcon="cancel" onClick={() => abrirModal('indeferir', inscricao)}>
                            Indeferir
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="inscricoes-footer">
            Mostrando {filtradas.length} de {filtro === 'TODAS' ? inscricoes.length : (ABAS_INSCRICOES.find(aba => aba.key === filtro)?.total ?? filtradas.length)} {filtro === 'PENDENTE' ? 'pendentes' : 'inscrições'}
          </p>
        </>
      )}

      {modal && (
        <div className="inscricoes-modal-backdrop" role="presentation" onClick={() => setModal(null)}>
          <div className="inscricoes-modal" role="dialog" aria-modal="true" aria-labelledby="inscricoes-modal-title" onClick={event => event.stopPropagation()}>
            <h2 id="inscricoes-modal-title">
              {modal.acao === 'deferir' ? 'Deferir inscrição' : 'Indeferir inscrição'}
            </h2>
            <p>
              A inscrição de <strong>{modal.inscricao.alunoNome}</strong> em <strong>{modal.inscricao.cursoNome}</strong>{' '}
              {modal.acao === 'deferir' ? 'passará para "Deferida".' : 'será marcada como "Indeferida".'}
            </p>
            {modal.acao === 'indeferir' && (
              <label className="inscricoes-motivo">
                <span>Motivo (opcional)</span>
                <textarea
                  maxLength={255}
                  placeholder="Comprovante de renda ilegível. Reenvie em PDF com boa resolução."
                  value={motivo}
                  onChange={event => {
                    setMotivo(event.target.value);
                    setErro('');
                  }}
                />
                <small>Entre 3 e 255 caracteres · {motivo.length} / 255</small>
              </label>
            )}
            {erro && <Banner variant="danger">{erro}</Banner>}
            <div className="inscricoes-modal__actions">
              <Button variant="secondary" onClick={() => setModal(null)}>Voltar</Button>
              <Button variant={modal.acao === 'deferir' ? 'primary' : 'danger'} leftIcon={modal.acao === 'deferir' ? 'check_circle' : 'cancel'} onClick={confirmar}>
                {modal.acao === 'deferir' ? 'Deferir inscrição' : 'Indeferir inscrição'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function iniciaisAluno(nome: string): string {
  return nome.split(' ').filter(parte => parte.length > 2).slice(0, 2).map(parte => parte[0]).join('').toUpperCase();
}
