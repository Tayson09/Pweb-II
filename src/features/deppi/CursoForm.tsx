import { useState } from 'react';
import { Card } from '../../shared/components/Card';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Button } from '../../shared/components/Button';
import { useDomain } from '../../shared/data/domain.store';
import { iniciais as gerarIniciais } from '../../shared/format';
import './CursoForm.css';

export type CursoFormData = {
  nome: string;
  iniciais: string;
  instituicao: string;
  cargaHoraria: number;
  vagas: number;
  periodoIni: string;
  periodoFim: string;
  horarioIni: string;
  horarioFim: string;
};

type Props = {
  inicial?: Partial<CursoFormData>;
  submitLabel: string;
  submitIcon?: string;
  onCancel: () => void;
  onSubmit: (data: CursoFormData) => void;
};

export function CursoForm({ inicial, submitLabel, submitIcon, onCancel, onSubmit }: Props) {
  const instituicoes = useDomain(s => s.instituicoes);

  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [instituicao, setInstituicao] = useState(inicial?.instituicao ?? '');
  const [carga, setCarga] = useState(inicial?.cargaHoraria ? String(inicial.cargaHoraria) : '');
  const [vagas, setVagas] = useState(inicial?.vagas ? String(inicial.vagas) : '');
  const [ini, setIni] = useState(inicial?.periodoIni ?? '');
  const [fim, setFim] = useState(inicial?.periodoFim ?? '');
  const [hIni, setHIni] = useState(inicial?.horarioIni ?? '');
  const [hFim, setHFim] = useState(inicial?.horarioFim ?? '');

  const dataErro = ini && fim && fim < ini
    ? 'A data de fim deve ser igual ou posterior à de início.'
    : undefined;

  const valido = nome && instituicao && carga && vagas && ini && fim && hIni && hFim && !dataErro;

  const opcoes = instituicoes.map(i => `${i.nome} · ${i.campus}`);
  const semInstituicoes = opcoes.length === 0;

  function enviar() {
    if (!valido) return;
    onSubmit({
      nome,
      iniciais: inicial?.iniciais ?? gerarIniciais(nome),
      instituicao,
      cargaHoraria: Number(carga),
      vagas: Number(vagas),
      periodoIni: ini,
      periodoFim: fim,
      horarioIni: hIni,
      horarioFim: hFim,
    });
  }

  return (
    <div className="curso-form">
      <Card title="Informações">
        <div className="form-stack">
          <Input label="Nome do curso" value={nome} onChange={e => setNome(e.target.value)} placeholder="Introdução à Programação" />
          {semInstituicoes
            ? <Input label="Instituição (ID)" value={instituicao} onChange={e => setInstituicao(e.target.value)} placeholder="ID da instituição" />
            : (
              <Select label="Instituição" value={instituicao} onChange={e => setInstituicao(e.target.value)}>
                <option value="">Selecione</option>
                {opcoes.map(o => <option key={o} value={o}>{o}</option>)}
              </Select>
            )}
          <div className="form-row">
            <Input label="Carga horária (horas)" type="number" min={1} value={carga} onChange={e => setCarga(e.target.value)} />
            <Input label="Vagas" type="number" min={1} value={vagas} onChange={e => setVagas(e.target.value)} />
          </div>
          <div className="form-row">
            <Input label="Data de início" type="date" value={ini} onChange={e => setIni(e.target.value)} />
            <Input label="Data de fim" type="date" value={fim} onChange={e => setFim(e.target.value)} error={dataErro} />
          </div>
          <div className="form-row">
            <Input label="Horário de início" type="time" value={hIni} onChange={e => setHIni(e.target.value)} />
            <Input label="Horário de fim" type="time" value={hFim} onChange={e => setHFim(e.target.value)} />
          </div>
        </div>
      </Card>

      <div>
        <Card title="Resumo">
          <dl className="resumo">
            <div><dt>Nome</dt><dd>{nome || '—'}</dd></div>
            <div><dt>Instituição</dt><dd>{instituicao || '—'}</dd></div>
            <div><dt>Carga</dt><dd>{carga ? `${carga} h` : '—'}</dd></div>
            <div><dt>Vagas</dt><dd>{vagas || '—'}</dd></div>
            <div><dt>Período</dt><dd>{ini && fim ? `${ini} a ${fim}` : '—'}</dd></div>
            <div><dt>Horário</dt><dd>{hIni && hFim ? `${hIni} às ${hFim}` : '—'}</dd></div>
          </dl>
        </Card>

        <div className="curso-form__actions">
          <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
          <Button leftIcon={submitIcon} disabled={!valido} onClick={enviar}>{submitLabel}</Button>
        </div>
      </div>
    </div>
  );
}
