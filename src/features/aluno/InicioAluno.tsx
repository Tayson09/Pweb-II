import { Card } from '../../shared/components/Card';
import { EmptyState } from '../../shared/components/EmptyState';
import { Icon } from '../../shared/components/Icon';
import { PageHeader } from '../../shared/components/PageHeader';
import { StatCard } from '../../shared/components/StatCard';
import { StatusChip } from '../../shared/components/StatusChip';
import { useDomain } from '../../shared/data/domain.store';
import { useSession } from '../auth/session.store';
import { dataCurta, dataPorExtenso, primeiroNome } from '../../shared/format';
import './InicioAluno.css';

export function InicioAluno() {
  const user = useSession(s => s.user)!;
  const inscricoes = useDomain(s =>
    s.inscricoes
      .filter(inscricao => inscricao.alunoEmail === user.email)
      .sort((a, b) => b.data.localeCompare(a.data)),
  );

  const pendentes = inscricoes.filter(inscricao => inscricao.status === 'PENDENTE').length;
  const deferidas = inscricoes.filter(inscricao => inscricao.status === 'DEFERIDA').length;

  return (
    <div className="aluno-inicio">
      <PageHeader
        title={`Olá, ${primeiroNome(user.name)}!`}
        subtitle={dataPorExtenso()}
      />

      <div className="aluno-inicio__stats">
        <StatCard label="Minhas inscrições" value={inscricoes.length} icon="assignment" />
        <StatCard label="Em análise" value={pendentes} icon="schedule" valueColor="var(--status-pending)" />
        <StatCard label="Deferidas" value={deferidas} icon="check_circle" valueColor="var(--status-deferred)" />
      </div>

      <Card title="Acompanhe suas inscrições" className="aluno-inicio__inscricoes">
        {inscricoes.length === 0 ? (
          <EmptyState
            icon="assignment"
            title="Você ainda não tem inscrições"
            description="Quando você se inscrever em um curso, poderá acompanhar o andamento por aqui."
          />
        ) : (
          <ul className="aluno-inicio__lista">
            {inscricoes.map(inscricao => (
              <li className="aluno-inicio__item" key={inscricao.id}>
                <div className="aluno-inicio__curso">
                  <span className="aluno-inicio__icone">
                    <Icon name="school" size={20} color="var(--accent)" />
                  </span>
                  <div>
                    <p className="aluno-inicio__nome">{inscricao.cursoNome}</p>
                    <p className="aluno-inicio__data">Inscrição realizada em {dataCurta(inscricao.data)}</p>
                  </div>
                </div>
                <StatusChip status={inscricao.status} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="aluno-inicio__ajuda">
        <Icon name="info" size={20} color="var(--accent)" />
        <p>
          {pendentes > 0
            ? `Você tem ${pendentes === 1 ? 'uma inscrição aguardando' : `${pendentes} inscrições aguardando`} avaliação. Confira o status aqui para acompanhar as atualizações.`
            : 'Acompanhe nesta página as atualizações das suas inscrições.'}
        </p>
      </div>
    </div>
  );
}
