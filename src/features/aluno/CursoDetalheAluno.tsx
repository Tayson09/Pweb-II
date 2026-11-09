import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { EmptyState } from '../../shared/components/EmptyState';
import { Banner } from '../../shared/components/Banner';
import { StatusChip } from '../../shared/components/StatusChip';
import { useSession } from '../auth/session.store';
import { useDomain } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './CursoDetalheAluno.css';

export function CursoDetalheAluno() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useSession(s => s.user)!;
  const curso = useDomain(s => s.cursos.find(item => item.id === id));
  const inscricoes = useDomain(s => s.inscricoes);
  const criarInscricao = useDomain(s => s.criarInscricao);
  const [erro, setErro] = useState<string | null>(null);

  if (!curso) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: 'Curso' }]} />
        <EmptyState
          icon="search_off"
          title="Curso não encontrado"
          description="O curso pode ter sido removido."
          action={<Button onClick={() => nav('/cursos')}>Voltar aos cursos</Button>}
        />
      </div>
    );
  }

  const cursoAtual = curso;
  const inscricao = inscricoes.find(item =>
    item.cursoId === curso.id &&
    item.alunoEmail === user.email &&
    (item.status === 'PENDENTE' || item.status === 'DEFERIDA'),
  );
  const disponivel = curso.status === 'ANDAMENTO' && curso.ocupadas < curso.vagas;

  function inscrever() {
    setErro(null);
    if (!disponivel) {
      setErro('Este curso não está disponível para novas inscrições.');
      return;
    }
    if (!user.matricula) {
      setErro('Não encontramos sua matrícula. Atualize seus dados antes de se inscrever.');
      return;
    }
    if (inscricao) {
      setErro('Você já possui uma inscrição ativa neste curso.');
      return;
    }

    criarInscricao(user.id, user.name, user.email, user.matricula, cursoAtual.id, cursoAtual.nome);
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: curso.nome }]} />

      <div className="curso-aluno__head">
        <div>
          <h1>{curso.nome}</h1>
          <p className="curso-aluno__instituicao">{curso.instituicao}</p>
        </div>
        <div className="curso-aluno__status">
          <StatusChip status={curso.status} />
        </div>
      </div>

      {erro && <div className="curso-aluno__banner"><Banner variant="danger">{erro}</Banner></div>}

      {inscricao && (
        <div className="curso-aluno__banner">
          <Banner variant="info">
            Você já tem uma inscrição neste curso: <StatusChip status={inscricao.status} size="sm" />.
          </Banner>
        </div>
      )}

      <Card title="Informações do curso">
        <dl className="curso-aluno__grid">
          <div><dt>Instituição</dt><dd>{curso.instituicao}</dd></div>
          <div><dt>Carga horária</dt><dd>{curso.cargaHoraria} horas</dd></div>
          <div><dt>Período</dt><dd>{dataCurta(curso.periodoIni)} a {dataCurta(curso.periodoFim)}</dd></div>
          <div><dt>Horário</dt><dd>{curso.horarioIni} às {curso.horarioFim}</dd></div>
          <div><dt>Vagas ocupadas</dt><dd>{curso.ocupadas} de {curso.vagas}</dd></div>
          <div><dt>Vagas disponíveis</dt><dd>{Math.max(0, curso.vagas - curso.ocupadas)}</dd></div>
        </dl>
        {!inscricao && (
          <div className="curso-aluno__action">
            {disponivel ? (
              <Button leftIcon="how_to_reg" onClick={inscrever}>Solicitar inscrição</Button>
            ) : (
              <Button variant="secondary" disabled>
                Inscrições indisponíveis
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
