import { create } from 'zustand';
import { INITIAL_DATA } from './mocks';

export type CourseStatus = 'ANALISE' | 'ANDAMENTO' | 'CONCLUIDO' | 'FECHADO';
export type EnrollmentStatus = 'PENDENTE' | 'DEFERIDA' | 'INDEFERIDA' | 'CANCELADA';

export type Instituicao = {
  id: string; nome: string; campus: string; cidade: string; cnpj: string;
};

export type Usuario = {
  id: string; nome: string; email: string; cargos: string[]; criadoEm: string;
  iniciais: string;
};

export type Curso = {
  id: string; nome: string; iniciais: string; instituicao: string;
  periodoIni: string; periodoFim: string; horarioIni: string; horarioFim: string;
  cargaHoraria: number; vagas: number; ocupadas: number; status: CourseStatus;
};

export type Professor = {
  id: string; nome: string; siape: string; email: string; iniciais: string;
  titulacao?: string; participaPGD?: boolean;
};

export type Inscricao = {
  id: string; alunoId: string; alunoNome: string; alunoEmail: string;
  matricula: string; cursoId: string; cursoNome: string; data: string;
  status: EnrollmentStatus; motivoIndeferimento?: string;
  rendaMensal?: number; pessoasCasa?: number;
};

type DomainState = {
  instituicoes: Instituicao[];
  usuarios: Usuario[];
  cursos: Curso[];
  professores: Professor[];
  inscricoes: Inscricao[];

  addInstituicao: (i: Omit<Instituicao, 'id'>) => void;
  updateInstituicao: (id: string, i: Partial<Instituicao>) => void;
  removeInstituicao: (id: string) => void;

  addCurso: (c: Omit<Curso, 'id' | 'ocupadas' | 'status'>) => Curso;
  updateCurso: (id: string, c: Partial<Curso>) => void;
  removeCurso: (id: string) => boolean;

  addProfessor: (p: Omit<Professor, 'id'>) => void;

  concederCargo: (userId: string, cargo: string) => void;

  deferirInscricao: (id: string) => { ok: boolean; motivo?: string };
  indeferirInscricao: (id: string, motivo: string) => void;
  cancelarInscricao: (id: string) => void;
  criarInscricao: (
    alunoId: string, alunoNome: string, alunoEmail: string,
    matricula: string, cursoId: string, cursoNome: string,
  ) => Inscricao;
};

export const useDomain = create<DomainState>((set, get) => ({
  ...INITIAL_DATA,

  addInstituicao: (i) => set(s => ({ instituicoes: [...s.instituicoes, { ...i, id: crypto.randomUUID() }] })),
  updateInstituicao: (id, i) => set(s => ({ instituicoes: s.instituicoes.map(x => x.id === id ? { ...x, ...i } : x) })),
  removeInstituicao: (id) => set(s => ({ instituicoes: s.instituicoes.filter(x => x.id !== id) })),

  addCurso: (c) => {
    const curso: Curso = { ...c, id: crypto.randomUUID(), ocupadas: 0, status: 'ANALISE' };
    set(s => ({ cursos: [...s.cursos, curso] }));
    return curso;
  },
  updateCurso: (id, c) => set(s => ({ cursos: s.cursos.map(x => x.id === id ? { ...x, ...c } : x) })),
  removeCurso: (id) => {
    const vinculadas = get().inscricoes.filter(i => i.cursoId === id);
    if (vinculadas.length > 0) return false;
    set(s => ({ cursos: s.cursos.filter(x => x.id !== id) }));
    return true;
  },

  addProfessor: (p) => set(s => ({ professores: [...s.professores, { ...p, id: crypto.randomUUID() }] })),

  concederCargo: (userId, cargo) => set(s => ({
    usuarios: s.usuarios.map(u => u.id === userId
      ? { ...u, cargos: u.cargos.includes(cargo) ? u.cargos : [...u.cargos, cargo] }
      : u),
  })),

  deferirInscricao: (id) => {
    const insc = get().inscricoes.find(i => i.id === id);
    if (!insc) return { ok: false, motivo: 'Inscrição não encontrada.' };
    const curso = get().cursos.find(c => c.id === insc.cursoId);
    if (!curso) return { ok: false, motivo: 'Curso não encontrado.' };
    if (curso.ocupadas >= curso.vagas) return { ok: false, motivo: 'Não há vagas disponíveis neste curso.' };
    set(s => ({
      inscricoes: s.inscricoes.map(i => i.id === id ? { ...i, status: 'DEFERIDA' } : i),
      cursos: s.cursos.map(c => c.id === insc.cursoId ? { ...c, ocupadas: c.ocupadas + 1 } : c),
    }));
    return { ok: true };
  },
  indeferirInscricao: (id, motivo) => set(s => ({
    inscricoes: s.inscricoes.map(i => i.id === id ? { ...i, status: 'INDEFERIDA', motivoIndeferimento: motivo } : i),
  })),
  cancelarInscricao: (id) => set(s => ({
    inscricoes: s.inscricoes.map(i => i.id === id ? { ...i, status: 'CANCELADA' } : i),
  })),
  criarInscricao: (alunoId, alunoNome, alunoEmail, matricula, cursoId, cursoNome) => {
    const insc: Inscricao = {
      id: crypto.randomUUID(), alunoId, alunoNome, alunoEmail, matricula,
      cursoId, cursoNome, data: new Date().toISOString().slice(0, 10),
      status: 'PENDENTE',
    };
    set(s => ({ inscricoes: [...s.inscricoes, insc] }));
    return insc;
  },
}));
