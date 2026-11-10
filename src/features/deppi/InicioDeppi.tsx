import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Card } from '../../shared/components/Card';
import { Icon } from '../../shared/components/Icon';
import { PageHeader } from '../../shared/components/PageHeader';
import { useSession } from '../auth/session.store';
import { ATALHOS_DEPPI, CURSOS_ANALISE, PENDENTES_ANTIGAS } from '../../shared/data/mocks';
import { dataPorExtenso, primeiroNome } from '../../shared/format';
import './InicioDeppi.css';

export function InicioDeppi() {
  const user = useSession(s => s.user)!;
  const nav = useNavigate();

  return (
    <div className="deppi-inicio">
      <PageHeader
        title={`Bom dia, ${primeiroNome(user.name)}`}
        subtitle={dataPorExtenso()}
      />

      <div className="deppi-inicio__shortcuts">
        {ATALHOS_DEPPI.map(atalho => (
          <button
            className="deppi-inicio__shortcut"
            key={atalho.to}
            type="button"
            onClick={() => nav(atalho.to)}
          >
            <Icon name={atalho.icon} size={24} color="var(--accent)" />
            <span className="deppi-inicio__shortcut-title">{atalho.label}</span>
            <span className="deppi-inicio__shortcut-sub">{atalho.sub}</span>
          </button>
        ))}
      </div>

      <div className="deppi-inicio__lists">
        <Card
          title="Inscrições pendentes mais antigas"
          rightAction={<button type="button" onClick={() => nav('/inscricoes')}>Ver todas</button>}
        >
          <ul className="deppi-inicio__pending-list">
            {PENDENTES_ANTIGAS.map(pendente => (
              <li className="deppi-inicio__pending-item" key={pendente.nome}>
                <div className="deppi-inicio__person">
                  <Avatar initials={pendente.iniciais} size={32} />
                  <div>
                    <p className="deppi-inicio__person-name">{pendente.nome}</p>
                    <p className="deppi-inicio__person-course">{pendente.curso}</p>
                  </div>
                </div>
                <span className="deppi-inicio__date">{pendente.dias}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Cursos em análise"
          rightAction={<button type="button" onClick={() => nav('/cursos')}>Ver todos</button>}
        >
          <ul className="deppi-inicio__course-list">
            {CURSOS_ANALISE.map(curso => (
              <li className="deppi-inicio__course-item" key={curso.nome}>
                <div>
                  <p className="deppi-inicio__course-name">{curso.nome}</p>
                  <p className="deppi-inicio__course-campus">{curso.campus}</p>
                </div>
                <span className="deppi-inicio__workload">{curso.carga}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
