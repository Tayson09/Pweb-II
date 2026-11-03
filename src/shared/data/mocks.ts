import type {
  Instituicao,
  Usuario,
  Curso,
  Professor,
  Inscricao,
  CourseStatus,
  EnrollmentStatus,
} from './domain.store';

export const INSTITUICOES: Instituicao[] = [
  { id: 'i1', nome: 'IFCE', campus: 'Campus Fortaleza',          cidade: 'Fortaleza/CE',          cnpj: '10.744.098/0001-45' },
  { id: 'i2', nome: 'IFCE', campus: 'Campus Maracanaú',          cidade: 'Maracanaú/CE',          cnpj: '10.744.098/0002-26' },
  { id: 'i3', nome: 'IFCE', campus: 'Campus Juazeiro do Norte',  cidade: 'Juazeiro do Norte/CE',  cnpj: '10.744.098/0003-07' },
  { id: 'i4', nome: 'IFCE', campus: 'Campus Sobral',             cidade: 'Sobral/CE',             cnpj: '10.744.098/0004-98' },
  { id: 'i5', nome: 'IFCE', campus: 'Campus Crato',              cidade: 'Crato/CE',              cnpj: '10.744.098/0005-79' },
  { id: 'i6', nome: 'IFCE', campus: 'Campus Caucaia',            cidade: 'Caucaia/CE',            cnpj: '10.744.098/0006-50' },
  { id: 'i7', nome: 'IFCE', campus: 'Campus Iguatu',             cidade: 'Iguatu/CE',             cnpj: '10.744.098/0007-31' },
];

export const USUARIOS: Usuario[] = [
  { id: 'u1', nome: 'Administrador',          email: 'admin@deppi.local',           cargos: ['ADMIN'],              criadoEm: '2026-01-10', iniciais: 'AD' },
  { id: 'u2', nome: 'Márcia Holanda',         email: 'marcia.holanda@ifce.edu.br',  cargos: ['DEPPI'],              criadoEm: '2026-01-12', iniciais: 'MH' },
  { id: 'u3', nome: 'Paulo Henrique Viana',   email: 'paulo.viana@ifce.edu.br',     cargos: ['PROFESSOR'],          criadoEm: '2026-01-15', iniciais: 'PH' },
  { id: 'u4', nome: 'Roberta Alves Tavares',  email: 'roberta.tavares@ifce.edu.br', cargos: ['PROFESSOR', 'DEPPI'], criadoEm: '2026-01-25', iniciais: 'RA' },
  { id: 'u5', nome: 'Ana Beatriz Lima Rocha', email: 'ana.rocha@aluno.ifce.edu.br', cargos: ['ALUNO'],              criadoEm: '2026-02-20', iniciais: 'AB' },
  { id: 'u6', nome: 'Carlos Eduardo Nogueira',email: 'carlos.nogueira@aluno.ifce.edu.br', cargos: ['ALUNO'],        criadoEm: '2026-02-21', iniciais: 'CE' },
  { id: 'u7', nome: 'Francisca Helena Sousa', email: 'francisca.sousa@aluno.ifce.edu.br', cargos: ['ALUNO'],        criadoEm: '2026-02-22', iniciais: 'FH' },
  { id: 'u8', nome: 'João Pedro Albuquerque', email: 'joao.albuquerque@aluno.ifce.edu.br', cargos: ['ALUNO'],       criadoEm: '2026-02-23', iniciais: 'JP' },
];

export const CURSOS: Curso[] = [
  { id: 'c1', nome: 'Introdução à Programação com Python', iniciais: 'PY', instituicao: 'IFCE · Campus Fortaleza',         periodoIni: '03/03/2026', periodoFim: '30/06/2026', horarioIni: '18:30', horarioFim: '21:30', cargaHoraria: 80, vagas: 40, ocupadas: 31, status: 'ANDAMENTO' },
  { id: 'c2', nome: 'Robótica Educacional com Arduino',    iniciais: 'RA', instituicao: 'IFCE · Campus Maracanaú',         periodoIni: '10/03/2026', periodoFim: '15/05/2026', horarioIni: '14:00', horarioFim: '17:00', cargaHoraria: 60, vagas: 25, ocupadas: 25, status: 'ANDAMENTO' },
  { id: 'c3', nome: 'Inglês Instrumental para TI',         iniciais: 'IN', instituicao: 'IFCE · Campus Fortaleza',         periodoIni: '05/11/2026', periodoFim: '18/12/2026', horarioIni: '08:00', horarioFim: '10:00', cargaHoraria: 40, vagas: 30, ocupadas: 0,  status: 'ANALISE' },
  { id: 'c4', nome: 'Fotografia e Edição Digital',         iniciais: 'FE', instituicao: 'IFCE · Campus Juazeiro do Norte', periodoIni: '02/02/2026', periodoFim: '27/03/2026', horarioIni: '19:00', horarioFim: '21:00', cargaHoraria: 60, vagas: 20, ocupadas: 20, status: 'CONCLUIDO' },
  { id: 'c5', nome: 'Libras Básico',                       iniciais: 'LB', instituicao: 'IFCE · Campus Sobral',            periodoIni: '17/08/2026', periodoFim: '30/10/2026', horarioIni: '18:00', horarioFim: '20:00', cargaHoraria: 40, vagas: 35, ocupadas: 18, status: 'ANDAMENTO' },
  { id: 'c6', nome: 'Empreendedorismo e Inovação',         iniciais: 'EI', instituicao: 'IFCE · Campus Crato',             periodoIni: '04/05/2026', periodoFim: '26/06/2026', horarioIni: '09:00', horarioFim: '12:00', cargaHoraria: 30, vagas: 50, ocupadas: 41, status: 'FECHADO' },
];

export const PROFESSORES: Professor[] = [
  { id: 'p1', nome: 'Paulo Henrique Viana',   siape: '1928374', email: 'paulo.viana@ifce.edu.br',    iniciais: 'PH', titulacao: 'Mestre',   participaPGD: true },
  { id: 'p2', nome: 'Juliana Matos Pereira',  siape: '2011938', email: 'juliana.pereira@ifce.edu.br',iniciais: 'JM', titulacao: 'Doutora',  participaPGD: true },
  { id: 'p3', nome: 'Ricardo Gomes Tavares',  siape: '1773925', email: 'ricardo.tavares@ifce.edu.br',iniciais: 'RG', titulacao: 'Especialista', participaPGD: false },
  { id: 'p4', nome: 'Fernanda Lima Carvalho', siape: '2093844', email: 'fernanda.carvalho@ifce.edu.br', iniciais: 'FL', titulacao: 'Mestra', participaPGD: true },
  { id: 'p5', nome: 'Antônio Sérgio Barreto', siape: '1660432', email: 'antonio.barreto@ifce.edu.br', iniciais: 'AS', titulacao: 'Doutor',   participaPGD: false },
  { id: 'p6', nome: 'Camila Rocha Andrade',   siape: '2184756', email: 'camila.andrade@ifce.edu.br',  iniciais: 'CR', titulacao: 'Mestra',   participaPGD: true },
  { id: 'p7', nome: 'Marcos Vinícius Teixeira', siape: '1902233', email: 'marcos.teixeira@ifce.edu.br', iniciais: 'MV', titulacao: 'Especialista', participaPGD: false },
];

export const INSCRICOES: Inscricao[] = [
  { id: 'e1', alunoId: 'al1', alunoNome: 'Ana Beatriz Lima Rocha',  alunoEmail: 'ana.rocha@aluno.ifce.edu.br',      matricula: '20261045230011', cursoId: 'c1', cursoNome: 'Introdução à Programação com Python', data: '2026-10-02', status: 'PENDENTE' },
  { id: 'e2', alunoId: 'al2', alunoNome: 'Carlos Eduardo Nogueira', alunoEmail: 'carlos.nogueira@aluno.ifce.edu.br',matricula: '20261045230027', cursoId: 'c5', cursoNome: 'Libras Básico',                       data: '2026-10-02', status: 'PENDENTE' },
  { id: 'e3', alunoId: 'al3', alunoNome: 'Francisca Helena Sousa',  alunoEmail: 'francisca.sousa@aluno.ifce.edu.br',matricula: '20252033110094', cursoId: 'c1', cursoNome: 'Introdução à Programação com Python', data: '2026-10-03', status: 'PENDENTE' },
  { id: 'e4', alunoId: 'al4', alunoNome: 'João Pedro Albuquerque',  alunoEmail: 'joao.albuquerque@aluno.ifce.edu.br', matricula: '20261045230102', cursoId: 'c2', cursoNome: 'Robótica Educacional com Arduino', data: '2026-10-03', status: 'PENDENTE' },
  { id: 'e5', alunoId: 'al5', alunoNome: 'Mariana Costa Freitas',   alunoEmail: 'mariana.freitas@aluno.ifce.edu.br',matricula: '20242011870035', cursoId: 'c5', cursoNome: 'Libras Básico',                       data: '2026-10-04', status: 'PENDENTE' },
  { id: 'e6', alunoId: 'al6', alunoNome: 'Raimundo Nonato Filho',   alunoEmail: 'raimundo.filho@aluno.ifce.edu.br', matricula: '20261045230118', cursoId: 'c1', cursoNome: 'Introdução à Programação com Python', data: '2026-10-04', status: 'PENDENTE' },
  { id: 'e7', alunoId: 'al7', alunoNome: 'Letícia Barros Mendes',   alunoEmail: 'leticia.mendes@aluno.ifce.edu.br', matricula: '20252033110120', cursoId: 'c5', cursoNome: 'Libras Básico',                       data: '2026-10-05', status: 'PENDENTE' },
  { id: 'e8', alunoId: 'al8', alunoNome: 'Antônio Carlos Pinheiro', alunoEmail: 'antonio.pinheiro@aluno.ifce.edu.br', matricula: '20261045230134', cursoId: 'c2', cursoNome: 'Robótica Educacional com Arduino', data: '2026-10-05', status: 'PENDENTE' },
];

export const INITIAL_DATA = {
  instituicoes: INSTITUICOES,
  usuarios: USUARIOS,
  cursos: CURSOS,
  professores: PROFESSORES,
  inscricoes: INSCRICOES,
};

// dados de dashboard e telas, tirados do mockup. Números fixos de apresentação.

export type Total = { label: string; value: string; accent?: boolean };
export const TOTAIS: Total[] = [
  { label: 'Usuários', value: '1.284' },
  { label: 'Alunos', value: '1.142' },
  { label: 'Professores', value: '96' },
  { label: 'Cursos', value: '38' },
  { label: 'Inscrições', value: '2.317' },
  { label: 'Instituições', value: '7' },
  { label: 'Vagas restantes', value: '214', accent: true },
];

export type BarraSituacao = { status: EnrollmentStatus; label: string; value: number };
export const INSCRICOES_POR_SITUACAO: BarraSituacao[] = [
  { status: 'PENDENTE', label: 'Pendente', value: 412 },
  { status: 'DEFERIDA', label: 'Deferida', value: 1480 },
  { status: 'INDEFERIDA', label: 'Indeferida', value: 298 },
  { status: 'CANCELADA', label: 'Cancelada', value: 127 },
];

export type RoscaSituacao = { status: CourseStatus; label: string; value: number };
export const CURSOS_POR_SITUACAO: RoscaSituacao[] = [
  { status: 'ANALISE', label: 'Em análise', value: 6 },
  { status: 'ANDAMENTO', label: 'Em andamento', value: 17 },
  { status: 'CONCLUIDO', label: 'Concluído', value: 12 },
  { status: 'FECHADO', label: 'Fechado', value: 3 },
];

export type CursoRelatorio = { nome: string; status: CourseStatus; inscricoes: number };
export const CURSOS_RELATORIO: CursoRelatorio[] = [
  { nome: 'Introdução à Programação com Python', status: 'ANDAMENTO', inscricoes: 214 },
  { nome: 'Libras Básico', status: 'ANDAMENTO', inscricoes: 187 },
  { nome: 'Empreendedorismo e Inovação', status: 'FECHADO', inscricoes: 142 },
  { nome: 'Robótica Educacional com Arduino', status: 'ANDAMENTO', inscricoes: 96 },
  { nome: 'Fotografia e Edição Digital', status: 'CONCLUIDO', inscricoes: 71 },
];

export type Atalho = { icon: string; label: string; sub: string; to: string };
export const ATALHOS_DEPPI: Atalho[] = [
  { icon: 'school', label: 'Cursos em análise', sub: '6 aguardando revisão', to: '/cursos' },
  { icon: 'fact_check', label: 'Todas as inscrições', sub: 'Filtrar por status', to: '/inscricoes' },
  { icon: 'badge', label: 'Professores', sub: '96 cadastrados', to: '/professores' },
];

export type PendenteAntiga = { nome: string; iniciais: string; curso: string; dias: string };
export const PENDENTES_ANTIGAS: PendenteAntiga[] = [
  { nome: 'Ana Beatriz Lima Rocha', iniciais: 'AB', curso: 'Introdução à Programação com Python', dias: 'há 3 dias' },
  { nome: 'Carlos Eduardo Nogueira', iniciais: 'CE', curso: 'Libras Básico', dias: 'há 3 dias' },
  { nome: 'Francisca Helena Sousa', iniciais: 'FH', curso: 'Introdução à Programação com Python', dias: 'há 2 dias' },
  { nome: 'João Pedro Albuquerque', iniciais: 'JP', curso: 'Robótica Educacional com Arduino', dias: 'há 2 dias' },
  { nome: 'Mariana Costa Freitas', iniciais: 'MC', curso: 'Libras Básico', dias: 'há 1 dia' },
];

export type CursoAnalise = { nome: string; campus: string; carga: string };
export const CURSOS_ANALISE: CursoAnalise[] = [
  { nome: 'Inglês Instrumental para TI', campus: 'Campus Fortaleza', carga: '40 h' },
  { nome: 'Introdução ao Excel', campus: 'Campus Caucaia', carga: '20 h' },
  { nome: 'Cuidador de Idosos', campus: 'Campus Iguatu', carga: '160 h' },
  { nome: 'Desenho Técnico com CAD', campus: 'Campus Maracanaú', carga: '60 h' },
];

export type AbaInscricao = { key: EnrollmentStatus | 'TODAS'; label: string; total: string };
export const ABAS_INSCRICOES: AbaInscricao[] = [
  { key: 'PENDENTE', label: 'Pendentes', total: '412' },
  { key: 'DEFERIDA', label: 'Deferidas', total: '1.480' },
  { key: 'INDEFERIDA', label: 'Indeferidas', total: '298' },
  { key: 'CANCELADA', label: 'Canceladas', total: '127' },
  { key: 'TODAS', label: 'Todas', total: '2.317' },
];

export type CampoDetalhe = { label: string; valor: string; mono?: boolean };
export const DADOS_ALUNO: CampoDetalhe[] = [
  { label: 'E-mail', valor: 'ana.rocha@aluno.ifce.edu.br' },
  { label: 'Matrícula', valor: '20261045230011', mono: true },
  { label: 'CPF', valor: '052.318.443-07', mono: true },
  { label: 'Nascimento', valor: '14/03/2004', mono: true },
];

export type Documento = { icon: string; categoria: string; nome: string; tamanho: string; data?: string };
export const DOCS_DEPPI: Documento[] = [
  { icon: 'picture_as_pdf', categoria: 'RG', nome: 'rg_ana_rocha.pdf', tamanho: '412 KB' },
  { icon: 'image', categoria: 'CPF', nome: 'cpf_frente.jpg', tamanho: '1,2 MB' },
  { icon: 'picture_as_pdf', categoria: 'Comprovante de residência', nome: 'conta_luz_set.pdf', tamanho: '860 KB' },
  { icon: 'image', categoria: 'Comprovante de renda', nome: 'holerite_ago.png', tamanho: '2,9 MB' },
];

export const DOCS_ALUNO: Documento[] = [
  { icon: 'picture_as_pdf', categoria: 'RG', nome: 'rg_ana_rocha.pdf', tamanho: '412 KB', data: '02/10/2026' },
  { icon: 'image', categoria: 'CPF', nome: 'cpf_frente.jpg', tamanho: '1,2 MB', data: '02/10/2026' },
  { icon: 'picture_as_pdf', categoria: 'Comprovante de residência', nome: 'conta_luz_set.pdf', tamanho: '860 KB', data: '03/10/2026' },
];

export type ChecklistItem = { label: string; ok: boolean; opcional?: boolean };
export const CHECKLIST_DOCS: ChecklistItem[] = [
  { label: 'RG', ok: true },
  { label: 'CPF', ok: true },
  { label: 'Comprovante de residência', ok: true },
  { label: 'Comprovante de renda', ok: false },
  { label: 'Histórico escolar', ok: false },
  { label: 'Outro', ok: false, opcional: true },
];

export type PassoCadastro = { numero: number; label: string; estado: 'done' | 'active' | 'todo' };
export const PASSOS_CADASTRO: PassoCadastro[] = [
  { numero: 1, label: 'Dados pessoais', estado: 'done' },
  { numero: 2, label: 'Documento', estado: 'active' },
  { numero: 3, label: 'Título de eleitor', estado: 'todo' },
  { numero: 4, label: 'Acesso', estado: 'todo' },
];
