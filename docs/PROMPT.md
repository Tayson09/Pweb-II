# DEPPI-WEB — Prompt de construção completo

Você é um engenheiro frontend sênior. Vai construir o **DEPPI-WEB** inteiro: portal de cursos de extensão do IFCE, com 4 cargos (ALUNO, PROFESSOR, DEPPI, ADMIN), login, permissões, e todas as telas dos mockups.

Execute em sequência, do início ao fim, sem parar pra perguntar, sem pedir confirmação, sem sugerir mudanças de escopo. Quando terminar cada bloco grande (ver "Ordem de execução" no final), rode `npm run build` pra garantir que não quebrou nada, e siga.

Todos os dados são **mockados em memória** (não há backend). Login é fake, com 4 usuários de teste fixos. Persistência de sessão em localStorage. Dados de domínio ficam num store em memória e são resetados ao recarregar — isso é esperado.

---

## 1. Stack e versões fixas

- Vite + React 18 + TypeScript
- React Router v6
- Zustand pra sessão (com localStorage) e pra store de domínio (em memória)
- CSS puro em arquivos `.css` por componente (sem Tailwind pra não gastar tempo configurando)
- SVG inline pros ícones (Material Symbols via Google Fonts como fallback simples)
- Recharts pro donut do dashboard ADMIN
- Fontes: **Space Grotesk** (títulos/display), **Inter Tight** (corpo), **JetBrains Mono** (IDs, CPF, matrícula, SIAPE, CNPJ)

Versões fixas no `package.json`:

```json
{
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.26.0",
    "zustand": "4.5.4",
    "recharts": "2.12.7"
  },
  "devDependencies": {
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "typescript": "5.5.3",
    "vite": "5.4.1"
  }
}
```

Setup:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom@6.26.0 zustand@4.5.4 recharts@2.12.7
```

---

## 2. Estrutura de pastas

```
src/
  app/
    router.tsx
  features/
    auth/
      LoginPage.tsx + LoginPage.css
      CadastroPage.tsx + CadastroPage.css
      session.store.ts
      mock-users.ts
    admin/
      InicioAdmin.tsx + InicioAdmin.css
      InstituicoesPage.tsx + InstituicoesPage.css
      UsuariosPage.tsx + UsuariosPage.css
      RelatoriosPage.tsx + RelatoriosPage.css
    deppi/
      InicioDeppi.tsx + InicioDeppi.css
      CursosDeppi.tsx + CursosDeppi.css
      CursoDetalhe.tsx + CursoDetalhe.css
      NovoCurso.tsx + NovoCurso.css
      InscricoesPage.tsx + InscricoesPage.css
      InscricaoDetalhe.tsx + InscricaoDetalhe.css
      ProfessoresPage.tsx + ProfessoresPage.css
      ProfessorDetalhe.tsx + ProfessorDetalhe.css
      NovoProfessor.tsx + NovoProfessor.css
    professor/
      InicioProfessor.tsx + InicioProfessor.css
      CursosProfessor.tsx + CursosProfessor.css
      EditarCurso.tsx + EditarCurso.css
    aluno/
      InicioAluno.tsx + InicioAluno.css
      CatalogoCursos.tsx + CatalogoCursos.css
      CursoAluno.tsx + CursoAluno.css
      MinhasInscricoes.tsx + MinhasInscricoes.css
      InscricaoAluno.tsx + InscricaoAluno.css
    perfil/
      PerfilPage.tsx + PerfilPage.css
  shared/
    layout/
      AppShell.tsx + AppShell.css
      Sidebar.tsx + Sidebar.css
      Header.tsx + Header.css
    components/
      Button.tsx + Button.css
      Input.tsx + Input.css
      Select.tsx + Select.css
      Modal.tsx + Modal.css
      Card.tsx + Card.css
      StatCard.tsx + StatCard.css
      StatusChip.tsx + StatusChip.css
      Avatar.tsx + Avatar.css
      Table.tsx + Table.css
      SearchInput.tsx + SearchInput.css
      Breadcrumb.tsx + Breadcrumb.css
      EmptyState.tsx + EmptyState.css
      Icon.tsx
    guards/
      RequireAuth.tsx
      RequireRole.tsx
    data/
      domain.store.ts
      mocks.ts
    routes.ts
    types.ts
  pages/
    ForbiddenPage.tsx + ForbiddenPage.css
    PlaceholderPage.tsx
  index.css
  main.tsx
index.html
```

---

## 3. Design tokens (`index.css`)

Vem do style guide (painel t2):

```css
:root {
  /* Acento */
  --accent: #C2410C;
  --accent-link: #D97706;
  --accent-soft: rgba(194, 65, 12, 0.09);

  /* Perigo / destrutivo */
  --danger: #B42318;
  --danger-soft: rgba(180, 35, 24, 0.08);

  /* Texto */
  --text: #1A1A1A;
  --text-muted: #5C5C5C;

  /* Superfícies */
  --surface-page: #FAF9F7;
  --surface-card: #FFFFFF;
  --surface-sidebar: #F4F3EF;
  --surface-alt: #F1EFEB;

  /* Borda */
  --border: #E4E1DB;
  --border-strong: #D3D0C9;

  /* Status inscrição */
  --status-pending: #B45309;
  --status-pending-bg: rgba(245, 181, 68, 0.12);
  --status-deferred: #15803D;
  --status-deferred-bg: rgba(92, 201, 138, 0.12);
  --status-denied: #B91C1C;
  --status-denied-bg: rgba(239, 68, 68, 0.12);
  --status-canceled: #5C5C5C;
  --status-canceled-bg: rgba(163, 163, 163, 0.12);

  /* Status curso */
  --status-analysis: #B45309;
  --status-analysis-bg: rgba(245, 181, 68, 0.12);
  --status-running: #15803D;
  --status-running-bg: rgba(92, 201, 138, 0.12);
  --status-done: #1D4ED8;
  --status-done-bg: rgba(122, 167, 240, 0.12);
  --status-closed: #5C5C5C;
  --status-closed-bg: rgba(163, 163, 163, 0.12);

  /* Fontes */
  --font-display: 'Space Grotesk', sans-serif;
  --font-sans: 'Inter Tight', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Raios */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  font-family: var(--font-sans);
  background: var(--surface-page);
  color: var(--text);
  min-height: 100vh;
  font-size: 14px;
  line-height: 1.5;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
}

input, select, textarea {
  font-family: inherit;
  outline: none;
  color: inherit;
}

a {
  color: var(--accent-link);
  text-decoration: none;
}

.mono { font-family: var(--font-mono); }
.display { font-family: var(--font-display); }

h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 600; }
h1 { font-size: 32px; line-height: 1.2; }
h2 { font-size: 24px; line-height: 1.3; }
h3 { font-size: 18px; line-height: 1.4; }
```

No `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
<title>DEPPI — IFCE Extensão</title>
```

---

## 4. Tabela de capacidades — `shared/routes.ts`

**Única fonte da verdade** pra sidebar, guards e redirects. Nada duplicado em outro lugar.

```ts
export type Role = 'ALUNO' | 'PROFESSOR' | 'DEPPI' | 'ADMIN';

export type NavItem = {
  path: string;
  label: string;
  icon: string; // Material Icons Round
  roles: Role[];
};

export const NAV_ITEMS: NavItem[] = [
  { path: '/inicio',            label: 'Início',            icon: 'home',         roles: ['ALUNO','PROFESSOR','DEPPI','ADMIN'] },
  { path: '/cursos',            label: 'Cursos',            icon: 'school',       roles: ['ALUNO','PROFESSOR','DEPPI','ADMIN'] },
  { path: '/instituicoes',      label: 'Instituições',      icon: 'apartment',    roles: ['ADMIN'] },
  { path: '/usuarios',          label: 'Usuários',          icon: 'group',        roles: ['ADMIN'] },
  { path: '/inscricoes',        label: 'Inscrições',        icon: 'fact_check',   roles: ['DEPPI'] },
  { path: '/professores',       label: 'Professores',       icon: 'badge',        roles: ['DEPPI'] },
  { path: '/minhas-inscricoes', label: 'Minhas inscrições', icon: 'assignment',   roles: ['ALUNO'] },
  { path: '/relatorios',        label: 'Relatórios',        icon: 'bar_chart',    roles: ['ADMIN'] },
  { path: '/perfil',            label: 'Perfil',            icon: 'person',       roles: ['ALUNO','PROFESSOR','DEPPI','ADMIN'] },
];

export function navForRole(role: Role): NavItem[] {
  return NAV_ITEMS.filter(i => i.roles.includes(role));
}

export function canAccess(path: string, role: Role): boolean {
  const item = NAV_ITEMS.find(i => path === i.path || path.startsWith(i.path + '/'));
  if (!item) return true; // rotas não listadas (/perfil, /cursos/:id, etc.) herdam de prefixo
  return item.roles.includes(role);
}
```

---

## 5. Sessão — `features/auth/session.store.ts`

Zustand + localStorage manual (sem middleware persist pra evitar hidratação):

```ts
import { create } from 'zustand';
import type { Role } from '../../shared/routes';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  siape?: string;
  matricula?: string;
};

type SessionState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const STORAGE_KEY = 'deppi.session';

function loadInitial(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useSession = create<SessionState>((set) => ({
  user: loadInitial(),
  login: (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));
```

### `features/auth/mock-users.ts`

```ts
import type { User } from './session.store';

export const MOCK_USERS: Array<User & { password: string }> = [
  { id: '1', name: 'Administrador',          email: 'admin@deppi.local',           password: 'admin123', role: 'ADMIN',     initials: 'AD' },
  { id: '2', name: 'Márcia Holanda',         email: 'marcia.holanda@ifce.edu.br',  password: 'deppi123', role: 'DEPPI',     initials: 'MH', siape: '1840221' },
  { id: '3', name: 'Paulo Henrique Viana',   email: 'paulo.viana@ifce.edu.br',     password: 'prof123',  role: 'PROFESSOR', initials: 'PH', siape: '1928374' },
  { id: '4', name: 'Ana Beatriz Lima Rocha', email: 'ana.rocha@aluno.ifce.edu.br', password: 'aluno123', role: 'ALUNO',     initials: 'AB', matricula: '20261045230011' },
];

export async function fakeLogin(email: string, password: string): Promise<User> {
  await new Promise(r => setTimeout(r, 400));
  const found = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!found) throw new Error('E-mail ou senha inválidos.');
  const { password: _, ...user } = found;
  return user;
}
```

---

## 6. Guards — `shared/guards/`

### `RequireAuth.tsx`

```tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../features/auth/session.store';

export function RequireAuth() {
  const user = useSession(s => s.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
```

### `RequireRole.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../features/auth/session.store';
import type { Role } from '../routes';

export function RequireRole({ roles }: { roles: Role[] }) {
  const user = useSession(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/403" replace />;
  return <Outlet />;
}
```

---

## 7. Store de domínio — `shared/data/domain.store.ts`

Zustand em memória, inicializado com os mocks do `Component.js`:

```ts
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

  addCurso: (c: Omit<Curso, 'id' | 'ocupadas' | 'status'>) => void;
  updateCurso: (id: string, c: Partial<Curso>) => void;
  removeCurso: (id: string) => boolean; // false se tem inscrições

  addProfessor: (p: Omit<Professor, 'id'>) => void;

  concederCargo: (userId: string, cargo: string) => void;

  deferirInscricao: (id: string) => { ok: boolean; motivo?: string };
  indeferirInscricao: (id: string, motivo: string) => void;
  cancelarInscricao: (id: string) => void;
  criarInscricao: (alunoId: string, alunoNome: string, alunoEmail: string, matricula: string, cursoId: string, cursoNome: string) => void;
};

export const useDomain = create<DomainState>((set, get) => ({
  ...INITIAL_DATA,

  addInstituicao: (i) => set(s => ({ instituicoes: [...s.instituicoes, { ...i, id: crypto.randomUUID() }] })),
  updateInstituicao: (id, i) => set(s => ({ instituicoes: s.instituicoes.map(x => x.id === id ? { ...x, ...i } : x) })),
  removeInstituicao: (id) => set(s => ({ instituicoes: s.instituicoes.filter(x => x.id !== id) })),

  addCurso: (c) => set(s => ({ cursos: [...s.cursos, { ...c, id: crypto.randomUUID(), ocupadas: 0, status: 'ANALISE' }] })),
  updateCurso: (id, c) => set(s => ({ cursos: s.cursos.map(x => x.id === id ? { ...x, ...c } : x) })),
  removeCurso: (id) => {
    const inscricoes = get().inscricoes.filter(i => i.cursoId === id);
    if (inscricoes.length > 0) return false;
    set(s => ({ cursos: s.cursos.filter(x => x.id !== id) }));
    return true;
  },

  addProfessor: (p) => set(s => ({ professores: [...s.professores, { ...p, id: crypto.randomUUID() }] })),

  concederCargo: (userId, cargo) => set(s => ({
    usuarios: s.usuarios.map(u => u.id === userId
      ? { ...u, cargos: u.cargos.includes(cargo) ? u.cargos : [...u.cargos, cargo] }
      : u)
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
    inscricoes: s.inscricoes.map(i => i.id === id ? { ...i, status: 'INDEFERIDA', motivoIndeferimento: motivo } : i)
  })),
  cancelarInscricao: (id) => set(s => ({
    inscricoes: s.inscricoes.map(i => i.id === id ? { ...i, status: 'CANCELADA' } : i)
  })),
  criarInscricao: (alunoId, alunoNome, alunoEmail, matricula, cursoId, cursoNome) => set(s => ({
    inscricoes: [...s.inscricoes, {
      id: crypto.randomUUID(), alunoId, alunoNome, alunoEmail, matricula,
      cursoId, cursoNome, data: new Date().toISOString().slice(0,10),
      status: 'PENDENTE'
    }]
  })),
}));
```

### `shared/data/mocks.ts`

Dados iniciais tirados do `Component.js`. Vem com 7 instituições (IFCE campi), 8 usuários, 6 cursos, 7 professores, 8 inscrições pendentes + números pro dashboard. Use **exatamente** os dados que estão no `Component.js` que o usuário forneceu, incluindo totais do dashboard, barras de inscrições (412/1480/298/127) e donut de cursos (6/17/12/3). Preencha os arrays com os registros literais mostrados nas listagens dos mockups.

---

## 8. Componentes compartilhados

### `shared/components/Icon.tsx`

```tsx
export function Icon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  return (
    <span
      className="material-icons-round"
      style={{ fontSize: size, color, lineHeight: 1, userSelect: 'none' }}
      aria-hidden
    >
      {name}
    </span>
  );
}
```

### `Button.tsx`

Variantes: `primary` (fundo `--accent`, texto branco), `secondary` (fundo branco, borda `--border-strong`), `danger` (fundo `--danger`, texto branco), `ghost` (sem fundo, texto `--text-muted`), `link` (texto `--accent-link` sublinhado no hover).

Sizes: `sm` (h 34), `md` (h 40), `lg` (h 44). Props: `leftIcon`, `rightIcon`, `loading`, `fullWidth`, `disabled`. Padding horizontal 16, radius 8, font-weight 600, font-size 14. Hover escurece 6%.

### `Input.tsx`

Label 13/500 acima, input h 42, padding 12 14, borda 1 `--border-strong`, radius 8. Focus: borda `--accent-link`, box-shadow 0 0 0 3px `rgba(217, 119, 6, 0.2)`. Hint abaixo em 12 muted. Erro: borda e hint `--danger`. Props: `label`, `hint`, `error`, `leftIcon`, `rightIcon`, resto é `InputHTMLAttributes`.

### `Select.tsx`

Mesmo visual do Input, mas `<select>`. Chevron à direita.

### `Modal.tsx`

Overlay 42% preto. Modal centralizado, max-width 500, radius 12, padding 24. Header com título e botão X. Footer com divisória 1 `--border`, padding 14 24, botões à direita. Fecha com Escape e clique fora.

### `Card.tsx`

Container branco, radius 10, borda 1 `--border`, padding 20. Opcional: `title`, `rightAction`.

### `StatCard.tsx`

Card compacto: label 13 muted em cima, número 36 display 600 embaixo. Prop opcional `valueColor` pra pintar o número (usado em "Vagas restantes" em `--accent`).

### `StatusChip.tsx`

Pílula com ícone + label. Props: `status: EnrollmentStatus | CourseStatus`, `size: 'sm' | 'md'`. Mapeia pros tokens `--status-*` e `--status-*-bg`. Ícones:

- PENDENTE / ANALISE → `schedule`
- DEFERIDA / ANDAMENTO → `check_circle` / `play_circle`
- INDEFERIDA → `cancel`
- CONCLUIDO → `task_alt`
- CANCELADA / FECHADO → `block` / `lock`

Fonte do mapeamento: `Component.js` que o usuário forneceu.

### `Avatar.tsx`

Círculo com iniciais em Space Grotesk 600. Sizes: 24, 28, 32, 34. Fundo `#E8E3DA`, texto `--text`.

### `Table.tsx`

Tabela estilizada. Header altura 44, fundo `--surface-alt`, texto 12 500 uppercase muted. Linhas altura 54, hover `--surface-alt`, borda inferior 1 `--border`. Última linha sem borda.

### `SearchInput.tsx`

Input com ícone de lupa à esquerda, placeholder parametrizável.

### `Breadcrumb.tsx`

Lista horizontal de links separados por `/` em muted. Última crumb em `--text`.

### `EmptyState.tsx`

Centralizado, ícone grande muted, título, descrição, ação opcional.

---

## 9. Layout — `shared/layout/`

### `AppShell.tsx`

Grid: sidebar 232px + conteúdo flex. Dentro do conteúdo: Header 58px + `<main>` com padding 32 e `<Outlet />`.

```tsx
export function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Header />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

### `Sidebar.tsx`

Fundo `--surface-sidebar`, borda direita 1 `--border`, altura 100vh, padding 16 12. Topo: logo DEPPI (quadrado 30x30 r 7 fundo `--accent` com letra D branca em Space Grotesk 600) + "DEPPI" display 18/700 + "IFCE · Extensão" 12 muted abaixo.

Lista de `NavLink`s do `navForRole(user.role)`. Cada item: altura 38, radius 7, padding 10 12, ícone 20 + label 14/500 com gap 12. Ativo: fundo `--accent-soft`, ícone e texto `--accent`. Hover inativo: fundo `--surface-alt`.

### `Header.tsx`

Altura 58, padding horizontal 28, fundo branco, borda inferior 1 `--border`, flex entre esquerda e direita.

Esquerda: ícone `menu` (sem função) + breadcrumb simples (label do item ativo).

Direita: ícone `dark_mode` (sem função), bloco com nome 13/600 + papel em mono 10 uppercase `--accent`, Avatar 32. Clicar no avatar abre dropdown com "Sair" (chama `logout()` e navega pra `/login`).

---

## 10. Routing — `app/router.tsx`

```tsx
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShell } from '../shared/layout/AppShell';
import { RequireAuth } from '../shared/guards/RequireAuth';
import { RequireRole } from '../shared/guards/RequireRole';
import { LoginPage } from '../features/auth/LoginPage';
import { CadastroPage } from '../features/auth/CadastroPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';

// Páginas por cargo
import { InicioAdmin } from '../features/admin/InicioAdmin';
import { InstituicoesPage } from '../features/admin/InstituicoesPage';
import { UsuariosPage } from '../features/admin/UsuariosPage';
import { RelatoriosPage } from '../features/admin/RelatoriosPage';

import { InicioDeppi } from '../features/deppi/InicioDeppi';
import { CursosDeppi } from '../features/deppi/CursosDeppi';
import { CursoDetalhe } from '../features/deppi/CursoDetalhe';
import { NovoCurso } from '../features/deppi/NovoCurso';
import { InscricoesPage } from '../features/deppi/InscricoesPage';
import { InscricaoDetalhe } from '../features/deppi/InscricaoDetalhe';
import { ProfessoresPage } from '../features/deppi/ProfessoresPage';
import { ProfessorDetalhe } from '../features/deppi/ProfessorDetalhe';
import { NovoProfessor } from '../features/deppi/NovoProfessor';

import { InicioProfessor } from '../features/professor/InicioProfessor';
import { CursosProfessor } from '../features/professor/CursosProfessor';
import { EditarCurso } from '../features/professor/EditarCurso';

import { InicioAluno } from '../features/aluno/InicioAluno';
import { CatalogoCursos } from '../features/aluno/CatalogoCursos';
import { CursoAluno } from '../features/aluno/CursoAluno';
import { MinhasInscricoes } from '../features/aluno/MinhasInscricoes';
import { InscricaoAluno } from '../features/aluno/InscricaoAluno';

import { PerfilPage } from '../features/perfil/PerfilPage';
import { useSession } from '../features/auth/session.store';

function InicioRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'ADMIN') return <InicioAdmin />;
  if (user.role === 'DEPPI') return <InicioDeppi />;
  if (user.role === 'PROFESSOR') return <InicioProfessor />;
  return <InicioAluno />;
}

function CursosRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'DEPPI' || user.role === 'ADMIN') return <CursosDeppi />;
  if (user.role === 'PROFESSOR') return <CursosProfessor />;
  return <CatalogoCursos />;
}

function CursoDetalheRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'ALUNO') return <CursoAluno />;
  return <CursoDetalhe />;
}

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <CadastroPage /> },
  { path: '/403', element: <ForbiddenPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/', element: <Navigate to="/inicio" replace /> },
          { path: '/inicio', element: <InicioRouter /> },
          { path: '/cursos', element: <CursosRouter /> },
          { path: '/cursos/novo', element: <RequireRole roles={['DEPPI','ADMIN']} />, children: [{ index: true, element: <NovoCurso /> }] },
          { path: '/cursos/:id', element: <CursoDetalheRouter /> },
          { path: '/cursos/:id/editar', element: <RequireRole roles={['PROFESSOR','DEPPI','ADMIN']} />, children: [{ index: true, element: <EditarCurso /> }] },

          { path: '/instituicoes', element: <RequireRole roles={['ADMIN']} />, children: [{ index: true, element: <InstituicoesPage /> }] },
          { path: '/usuarios', element: <RequireRole roles={['ADMIN']} />, children: [{ index: true, element: <UsuariosPage /> }] },
          { path: '/relatorios', element: <RequireRole roles={['ADMIN']} />, children: [{ index: true, element: <RelatoriosPage /> }] },

          { path: '/inscricoes', element: <RequireRole roles={['DEPPI']} />, children: [{ index: true, element: <InscricoesPage /> }] },
          { path: '/inscricoes/:id', element: <RequireRole roles={['DEPPI']} />, children: [{ index: true, element: <InscricaoDetalhe /> }] },
          { path: '/professores', element: <RequireRole roles={['DEPPI']} />, children: [{ index: true, element: <ProfessoresPage /> }] },
          { path: '/professores/novo', element: <RequireRole roles={['DEPPI']} />, children: [{ index: true, element: <NovoProfessor /> }] },
          { path: '/professores/:id', element: <RequireRole roles={['DEPPI']} />, children: [{ index: true, element: <ProfessorDetalhe /> }] },

          { path: '/minhas-inscricoes', element: <RequireRole roles={['ALUNO']} />, children: [{ index: true, element: <MinhasInscricoes /> }] },
          { path: '/minhas-inscricoes/:id', element: <RequireRole roles={['ALUNO']} />, children: [{ index: true, element: <InscricaoAluno /> }] },

          { path: '/perfil', element: <PerfilPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/403" replace /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
```

---

## 11. Telas — descrição por tela

Pra cada tela abaixo, siga o descritivo. Não invente campos ou funções não listados. Use os componentes compartilhados.

### 11.1 `LoginPage` (público)

Layout 2 colunas. Esquerda flex-1 fundo `--surface-alt` com padrão de listras diagonais 10/20px em `#EDEBE6` (CSS `repeating-linear-gradient(135deg, #EDEBE6 0 10px, transparent 10px 20px)`), padding 48. No topo um placeholder em mono 12 muted `[ foto do campus / alunos em aula ]`. Embaixo: H1 display 48/600 "Cursos de extensão **do IFCE**, num só lugar." (negrito só em "do IFCE") + parágrafo 16 muted "Inscreva-se, envie seus documentos e acompanhe a análise da sua inscrição."

Direita 480px padding 48: logo DEPPI no topo, H2 "Entrar", subtítulo "Use seu e-mail institucional.", form com Input email + Input senha + Button primary fullWidth "Entrar", separador 1 `--border` com margin 24 0, texto 14 muted centralizado "Ainda não tem conta? [Cadastre-se]" (link acento, navega pra `/cadastro`).

Submit chama `fakeLogin`. Em erro, banner vermelho acima do form com ícone `error` + mensagem. Em sucesso, chama `login(user)` e navega pra `/inicio`.

### 11.2 `CadastroPage` (público)

Página central 680px, padding 48. Barra de progresso 4 passos: ✓ Dados pessoais, 2 Documento, 3 Título de eleitor, 4 Acesso. **Pra Entrega 1, implementar só o passo 2 estático** (como no mockup 1b): formulário com RG, CPF (com máscara, erro "CPF inválido — confira os dígitos verificadores." quando dígitos verificadores não baterem), Órgão emissor, Estado emissor (select), Data de emissão. Botões "Voltar" (navega pra `/login`) e "Continuar" (chama `alert('Cadastro mockado — próxima entrega')` e fica).

### 11.3 `ForbiddenPage` (público)

Centralizado. Ícone `block` 64 muted, H1 "Acesso negado", parágrafo "Você não tem permissão para acessar esta página.", botões lado a lado: "Voltar ao início" (primário, navega `/inicio`) e "Sair" (secundário, chama logout → `/login`).

### 11.4 `InicioAdmin` — `/inicio` (ADMIN)

H1 "Bom dia, administrador" + subtítulo com data atual formatada em pt-BR (`Intl.DateTimeFormat('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })`), capitalizada. Botão secundário "Ver relatórios" com ícone `bar_chart` à direita (navega pra `/relatorios`).

Grid 7 colunas de StatCards (gap 16), dados do `Component.js.totais`:
- Usuários 1.284, Alunos 1.142, Professores 96, Cursos 38, Inscrições 2.317, Instituições 7, Vagas restantes 214 (acento).

Grid 2 colunas (gap 16):
- Card "Inscrições por situação" com link "Detalhes" no canto. 4 linhas horizontais: ícone + label (160px) + barra (flex-1 h 10 radius 999 fundo `#EEE9E1` com preenchimento colorido proporcional a 1480) + valor mono 13 muted à direita. Dados: Pendente 412 (`--status-pending`), Deferida 1.480 (`--status-deferred`), Indeferida 298 (`--status-denied`), Cancelada 127 (`--status-canceled`).
- Card "Cursos por situação" com Recharts PieChart (donut innerRadius 70 outerRadius 100, sem labels nos arcos), texto central "38 cursos" (número display 32/600, label 11 muted abaixo). Legenda à direita: 4 linhas ícone + nome + número. Dados: Em análise 6, Em andamento 17, Concluído 12, Fechado 3. Cores dos tokens `--status-*`.

### 11.5 `InstituicoesPage` — `/instituicoes` (ADMIN)

Topo: H1 "Instituições", subtítulo "7 instituições cadastradas". Botão primary "+ Nova instituição" no canto.

SearchInput "Buscar por nome, campus ou cidade".

Tabela: colunas Nome, Campus, Cidade, CNPJ (mono), + coluna de ações com ícones `edit` (acento) e `delete` (`--status-denied`). Dados do store.

Clicar "+ Nova instituição" abre `Modal` com form: Nome, Campus, Cidade, CNPJ (mono, máscara `00.000.000/0000-00`). Validação: CNPJ deve ter 14 dígitos. Erro visual com borda `--danger` e hint "CNPJ incompleto — informe os 14 dígitos." Botões "Cancelar" e "+ Cadastrar instituição" (primary com ícone `add`).

Clicar `edit` abre o mesmo modal preenchido, título "Editar instituição", botão "✓ Salvar alterações".

Clicar `delete` abre modal de confirmação: título "Excluir instituição", texto "**IFCE · Campus X** será removida. Esta ação não pode ser desfeita." Botões "Voltar" e "🗑 Excluir instituição" (danger).

Todas as ações usam o store `useDomain`.

### 11.6 `UsuariosPage` — `/usuarios` (ADMIN)

Topo: H1 "Usuários", subtítulo "{total} usuários". SearchInput "Buscar por nome ou e-mail" + Select "Cargo: Todos" (opções: Todos, ADMIN, DEPPI, PROFESSOR, ALUNO).

Tabela: Avatar + Nome, E-mail, Cargos (chips em mono 10 uppercase, fundo `--surface-alt`, radius 4, padding 2 6), Criado em (mono), + botão "⌾ Conceder cargo" por linha.

Clicar o botão abre Modal: título "Conceder cargo", texto "Escolha o cargo para **{nome}**. Os cargos atuais são mantidos." Radio cards (dois): DEPPI (descrição "Analisa inscrições e gerencia cursos e professores.") e ADMIN ("Gerencia instituições, usuários e relatórios."). Banner atenção `--surface-alt` com ícone `warning`: "Esta ação não pode ser desfeita pela interface." Botões "Cancelar" e "⌾ Conceder {CARGO}" (primary, label dinâmico).

### 11.7 `RelatoriosPage` — `/relatorios` (ADMIN)

Topo: H1 "Relatórios" + subtítulo "Gerado em {data atual} {hora atual}" em muted.

Mesma estrutura do dashboard ADMIN: grid de StatCards + grid 2 colunas com os mesmos cards (barras + donut). Abaixo, tabela "Cursos" com colunas: Nome, Status (StatusChip), Inscrições (mono alinhado à direita). Dados do `Component.js.cursosRel`.

### 11.8 `InicioDeppi` — `/inicio` (DEPPI)

H1 "Bom dia, {primeiro nome do user}" + subtítulo com data. Grid 3 colunas de cards de atalho (dados `Component.js.atalhosDeppi`):
- "Cursos em análise" (6 aguardando revisão)
- "Todas as inscrições" (Filtrar por status)
- "Professores" (96 cadastrados)

Cada card: ícone 24 acento, título 16/600, subtítulo 13 muted, borda, radius 10, padding 20, hover `--surface-alt`. Clicar navega: 1 → `/cursos`, 2 → `/inscricoes`, 3 → `/professores`.

Abaixo, grid 2 colunas:
- Card "Pendentes mais antigas" com link "Ver todas" → `/inscricoes`. Lista de 5 linhas: Avatar + nome 14/500 + curso 12 muted + "há X dias" alinhado à direita 12 muted. Dados `Component.js.pendentesAntigas`.
- Card "Cursos em análise" com link "Ver todos" → `/cursos`. Lista de 4 linhas: nome 14/500 + campus 12 muted + carga em pill muted. Dados `Component.js.cursosAnalise`.

### 11.9 `CursosDeppi` — `/cursos` (DEPPI e ADMIN)

Topo: H1 "Cursos", subtítulo "{total} cursos em {X} instituições". Botão primary "+ Novo curso" → `/cursos/novo` (só DEPPI).

Banner atenção amarelo-fraco `--status-pending-bg` com ícone `warning` (24 `--status-pending`): "P1 · A alteração de status está desativada até a correção da API. Novos cursos ficam 'Em análise'."

SearchInput "Buscar por nome".

Grid 3 colunas de **cards de curso** (gap 16). Cada card:
- Capa 92px com iniciais 34 display 600 muted sobre padrão listrado 135° 10/20px em `#EEE9E1` sobre `#F4F3EF`.
- StatusChip no canto superior direito da capa.
- Corpo padding 16: nome 15/600 (2 linhas máx, line-clamp), instituição 13 muted. Linha de meta: `date_range` + período, `schedule` + horário, `timer` + carga. Barra de vagas: h 5 radius 999 fundo `#EEE9E1` + preenchimento acento (ou muted se lotado), + texto "Vagas X/Y" ou "Vagas X/Y · lotado" 12 muted abaixo.

Clicar no card navega pra `/cursos/:id`. Dados: `Component.js.cursos`.

### 11.10 `CursoDetalhe` — `/cursos/:id` (DEPPI, PROFESSOR, ADMIN)

Breadcrumb "Cursos > {nome}". Capa alta 200px com iniciais 88 display 600 e StatusChip no canto. H1 nome do curso. Linha de meta "IFCE · Campus X — Cidade/UF" muted.

Grid 4 StatCards: Período (ícone `date_range`), Horário (`schedule`), Carga horária (`timer`), Instituição (`apartment`). + 2 StatCards: Vagas (ícone `group`, texto "40 no total · 9 disponíveis"), Inscrições (`fact_check`, "31 recebidas").

Botões no topo direito (só DEPPI): "Editar" (secondary, → `/cursos/:id/editar`) + "Excluir" (danger ghost).

Clicar excluir abre Modal "Excluir curso": "{nome} será excluído permanentemente." Se tem inscrições, mostra banner `--danger-soft` com "Não foi possível excluir: este curso tem inscrições vinculadas." Botões "Voltar" e "🗑 Excluir curso" (danger, disabled se tem inscrições).

### 11.11 `NovoCurso` — `/cursos/novo` (DEPPI)

Breadcrumb "Cursos > Novo curso". H1 "Novo curso", subtítulo 'O curso é criado com status "Em análise".'

Banner atenção: "P6 · Se a lista de instituições não carregar, o campo vira texto para você informar o ID da instituição."

2 colunas:

Coluna esquerda — Card "Informações":
- Input "Nome do curso"
- Select "Instituição" (lista do store)
- Grid 2 cols: Input "Carga horária (horas)" (number) + Input "Vagas" (number)
- Grid 2 cols: Input "Data de início" (date) + Input "Data de fim" (date, hint erro quando fim < início: "A data de fim deve ser igual ou posterior à de início.")
- Grid 2 cols: Input "Horário de início" (time) + Input "Horário de fim" (time)

Coluna direita — Card "Resumo" com preview dos dados preenchidos.

Botões no final: "Cancelar" (navega pra `/cursos`) e "Criar curso" (primary, cria e navega pra `/cursos/:id`).

### 11.12 `InscricoesPage` — `/inscricoes` (DEPPI)

Topo: H1 "Inscrições", subtítulo "Analise, defira ou indefira as inscrições dos alunos."

Abas horizontais (sublinhado 2 acento no ativo + contador em chip): Pendentes 412, Deferidas 1.480, Indeferidas 298, Canceladas 127, Todas 2.317. Dados `Component.js.abas`.

Tabela: Avatar + Nome, E-mail, Matrícula (mono), Curso, Data (mono), + StatusChip da inscrição. Dados `Component.js.inscricoes` + mocks. Clicar linha → `/inscricoes/:id`.

Rodapé "Mostrando 8 de 412 pendentes".

### 11.13 `InscricaoDetalhe` — `/inscricoes/:id` (DEPPI)

Breadcrumb "Inscrições > {nome do aluno}". H1 nome do aluno + StatusChip grande ao lado. Subtítulo "{curso} · inscrita em {data}".

3 cards em grid:
- Card "Aluno": E-mail, Matrícula (mono), CPF (mono), Nascimento (mono). Dados `Component.js.dadosAluno`.
- Card "Curso": Nome, Vagas disponíveis (mono).
- Card "Documentos": Lista `Component.js.docsDeppi`: ícone pdf/img, categoria, nome mono, tamanho muted à direita.

Botões (quando status PENDENTE): "Deferir inscrição" (primary com `check_circle`) e "Indeferir inscrição" (danger com `cancel`).

**Deferir** abre Modal "Deferir inscrição": 'A inscrição de **{nome}** em **{curso}** passará para "Deferida".' Chama `deferirInscricao(id)`. Se retornar `ok: false`, mostra banner `--danger-soft` com "Não há vagas disponíveis neste curso." e desabilita botão "Deferir". Senão fecha modal.

**Indeferir** abre Modal "Indeferir inscrição": textarea "Motivo (opcional)" com placeholder "Comprovante de renda ilegível. Reenvie em PDF com boa resolução.", hint "Entre 3 e 255 caracteres" + contador "{X} / 255". Botões "Voltar" e "Indeferir inscrição" (danger).

### 11.14 `ProfessoresPage` — `/professores` (DEPPI)

Topo: H1 "Professores", subtítulo "{total} professores". Botão primary "+ Novo professor" → `/professores/novo`.

SearchInput "Buscar por nome ou SIAPE".

Tabela: Avatar + Nome, SIAPE (mono), E-mail institucional. Clicar → `/professores/:id`.

### 11.15 `ProfessorDetalhe` — `/professores/:id` (DEPPI)

Breadcrumb "Professores > {nome}". Chip "SIAPE {num}" mono em cima. H1 nome.

Abas: "Dados funcionais" e "Dados de conta".

**Dados funcionais:** Card com Titulação, Escolaridade, Participa do PGD (toggle visual), E-mail SIAPE.

**Dados de conta:** Card com Nome usual, E-mail institucional, E-mail secundário, E-mail SIAPE, E-mail de notificações, E-mail do Classroom.

Coluna direita: Card "Telefones" com Institucional + Pessoais e botão "+ Adicionar".

### 11.16 `NovoProfessor` — `/professores/novo` (DEPPI)

Breadcrumb "Professores > Novo professor". H1 "Novo professor", subtítulo "Vincule um usuário existente e informe os dados funcionais."

Banner atenção: "P4 · Ainda não dá para criar o usuário do professor por aqui. Informe o ID de um usuário já cadastrado."

Card "Vínculo": Input "ID do usuário" (mono, placeholder UUID), hint "UUID do usuário. O administrador encontra em Usuários."

Card "Dados funcionais": SIAPE, E-mail SIAPE (opcional), Titulação (select, opcional), Escolaridade (select, opcional), Toggle "Participa do PGD" com descrição "Programa de Gestão e Desempenho".

Botões: "Cancelar" e "Cadastrar professor" (primary).

### 11.17 `InicioProfessor` — `/inicio` (PROFESSOR)

H1 "Bom dia, {primeiro nome}" + subtítulo "Cursos de extensão cadastrados".

SearchInput "Buscar por nome".

Grid 3 colunas dos cards de curso (mesmo componente do CursosDeppi), filtrado por... na verdade mostra todos (como diz o mockup: "O sistema ainda não registra quem criou cada curso, por isso todos aparecem aqui.").

Banner atenção no final: a mensagem acima.

### 11.18 `CursosProfessor` — `/cursos` (PROFESSOR)

Mesma coisa do InicioProfessor. É literalmente a mesma tela.

### 11.19 `EditarCurso` — `/cursos/:id/editar` (PROFESSOR, DEPPI)

Breadcrumb "Cursos > {nome} > Editar". H1 "Editar curso" + subtítulo com nome.

Mesmo form de `NovoCurso` preenchido com dados atuais. Botões "Cancelar" (→ `/cursos/:id`) e "Salvar alterações" (primary com `check`).

### 11.20 `InicioAluno` — `/inicio` (ALUNO)

H1 "Olá, {primeiro nome}" + subtítulo com data.

2 cards grandes lado a lado:
- Card "Ver cursos": ícone `school` 32 acento, texto "{N} cursos com inscrições abertas", seta `arrow_forward`. Clica → `/cursos`.
- Card "Minhas inscrições": ícone `assignment` 32 acento, texto "{N} inscrição · faltam {X} documentos" (dinâmico). Clica → `/minhas-inscricoes`.

Abaixo, seção "Cursos em andamento": H2 + grid 3 colunas de cards de curso (mesmos cards).

### 11.21 `CatalogoCursos` — `/cursos` (ALUNO)

H1 "Cursos", subtítulo "Cursos com inscrições abertas".

Banner atenção: "P1 · Até a correção da API, esta lista pode aparecer vazia."

SearchInput + grid 3 cols dos cards de curso. Clicar → `/cursos/:id`.

### 11.22 `CursoAluno` — `/cursos/:id` (ALUNO)

Igual ao `CursoDetalhe` mas sem botões Editar/Excluir. No lugar, 1 botão grande "Inscrever-se" (primary lg) **se o aluno não está inscrito** e o curso tem vagas. Se já inscrito, mostra StatusChip "Inscrito" verde desabilitado.

Clicar "Inscrever-se" abre Modal "Confirmar inscrição":
- Texto: "Você vai se inscrever em **{nome}**. Depois, informe a renda familiar e envie seus documentos."
- Grid 2 cols: Período + Horário.
- Botões "Voltar" e "Confirmar inscrição" (primary).

Confirmar chama `criarInscricao(...)` com dados do user atual (prepopular com o aluno logado) e navega pra `/minhas-inscricoes/:id` da inscrição recém-criada.

### 11.23 `MinhasInscricoes` — `/minhas-inscricoes` (ALUNO)

H1 "Minhas inscrições", subtítulo "Acompanhe suas inscrições e envie os documentos pendentes."

Banner atenção: "P2 · Enquanto a API não expõe suas inscrições, só aparecem as feitas neste navegador e a situação fica indefinida."

Tabela: Curso, Instituição, Inscrita em (mono), StatusChip. Clicar linha → `/minhas-inscricoes/:id`. Filtradas por `alunoId === user.id`.

### 11.24 `InscricaoAluno` — `/minhas-inscricoes/:id` (ALUNO)

Breadcrumb "Minhas inscrições > {nome do curso}". Texto mono "Inscrição #{id curto}". H1 nome do curso.

Banner atenção: "P2 · Enquanto a API não expõe suas inscrições, a situação abaixo pode não aparecer. Documentos e renda ficam neste navegador."

2 colunas:

Esquerda:
- Card "Situação": StatusChip grande + timeline vertical com 2 passos: "Inscrição realizada {data} · {hora}" (dot acento) + "Análise do DEPPI — Aguardando documentos e renda" (dot vazio).
- Card "Renda familiar": Input "Renda mensal da família" (money), Input "Pessoas na casa" (number com botões - +), card interno "Renda per capita R$ 660,00" (calculada). Botão "Salvar renda" (primary).

Direita:
- Card "Documentos": grid 2 cols de checkboxes `Component.js.checklist` (RG, CPF, Comprovante de residência, Comprovante de renda, Histórico escolar, Outro). Checkbox marcado = verde + ícone `check_circle`.
- Área de upload: borda tracejada 1.5, radius 10, padding 26, ícone `cloud_upload` 44 r 10, texto "Arraste o arquivo aqui ou clique", hint "PDF, JPG ou PNG · até 5 MB". Select "Categoria" (opcional).
- Lista de arquivos enviados (`Component.js.docsAluno`): ícone + nome mono + categoria muted + data mono muted à direita.

### 11.25 `PerfilPage` — `/perfil` (todos os cargos)

H1 "Perfil", subtítulo "Seus dados e sua senha de acesso."

Card superior: Avatar grande 56 + Nome 20/600 + E-mail muted. Chip de cargo em mono. SIAPE ou Matrícula em mono. "Conta criada em {data}" muted. Botão "Editar perfil" (secondary).

Card "Trocar senha": Input "Nova senha" (password), hint "Mínimo de 8 caracteres." Botão "Trocar senha" (primary).

Em modo edit: campos editáveis em vez de texto estático.

### 11.26 `PlaceholderPage` (fallback — não usar em nenhuma rota se possível)

Página simples: H1 "Em construção" + parágrafo "Esta tela ainda não está implementada."

---

## 12. Decisões já tomadas (não perguntar)

- Idioma: pt-BR.
- Tema: apenas claro. Botão de dark mode fica visual sem função.
- Sidebar sempre expandida (232px). Botão `menu` sem função.
- Sem backend: dados em store Zustand em memória, mocks em `shared/data/mocks.ts`.
- Sem testes.
- Desktop-first. Breakpoint mínimo 1024px. Mobile fica pra entrega futura.
- Datas em pt-BR: `Intl.DateTimeFormat('pt-BR', ...)`.
- Máscaras: CPF `000.000.000-00`, CNPJ `00.000.000/0000-00`, telefone `(00) 00000-0000`. Implementar inline em cada input que precisar (não precisa biblioteca).
- Dinheiro: `Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' })`.
- Upload de arquivo: visual apenas (sem envio real, sem storage). Clicar não faz nada. Arrastar não faz nada.
- Cadastro passo 2: apenas visual, não persiste.

---

## 13. Checklist mínimo de aceite

Rodar antes de dar por pronto:

- [ ] `npm run dev` sobe sem erro.
- [ ] `npm run build` passa sem erros TypeScript.
- [ ] Login com cada um dos 4 usuários mockados leva pra `/inicio` da role correspondente.
- [ ] Credencial inválida mostra banner de erro.
- [ ] Sidebar mostra apenas os itens da role.
- [ ] Acessar `/instituicoes` como ALUNO redireciona `/403`.
- [ ] Acessar qualquer rota sem sessão redireciona `/login`.
- [ ] Logout limpa sessão e volta pra `/login`. Reload mantém deslogado.
- [ ] Reload logado mantém sessão.
- [ ] Dashboard ADMIN mostra 7 StatCards, barras horizontais, donut.
- [ ] CRUD de instituição funcional em memória.
- [ ] CRUD de curso funcional em memória.
- [ ] Deferir inscrição sem vagas mostra erro.
- [ ] Inscrever-se como aluno cria registro visível em `/minhas-inscricoes`.
- [ ] Nenhum warning crítico no console.
- [ ] Fontes carregadas (Space Grotesk, Inter Tight, JetBrains Mono, Material Icons Round).

---

## 14. Ordem de execução

Faça em sequência. Depois de cada bloco, rode `npm run build` pra garantir que nada quebrou. Se quebrar, conserte antes de seguir.

**Bloco 1 — Fundação:**
1. Scaffold Vite + install das versões fixas.
2. `tsconfig.json` com `"strict": true` e `"paths": { "@/*": ["src/*"] }`.
3. `vite.config.ts` com alias `@` → `src`.
4. `index.html` com fontes e título.
5. `index.css` com tokens e reset.
6. `shared/routes.ts`.
7. `shared/types.ts` (reexporta tipos do domain).
8. `shared/data/mocks.ts` com dados do Component.js.
9. `shared/data/domain.store.ts`.
10. `features/auth/mock-users.ts` e `session.store.ts`.
11. `shared/guards/RequireAuth.tsx` e `RequireRole.tsx`.
12. Build check.

**Bloco 2 — Componentes compartilhados:**
13. `shared/components/Icon.tsx`, `Button.tsx`, `Input.tsx`, `Select.tsx`, `Modal.tsx`, `Card.tsx`, `StatCard.tsx`, `StatusChip.tsx`, `Avatar.tsx`, `Table.tsx`, `SearchInput.tsx`, `Breadcrumb.tsx`, `EmptyState.tsx`.
14. Build check.

**Bloco 3 — Layout:**
15. `shared/layout/AppShell.tsx`, `Sidebar.tsx`, `Header.tsx`.
16. Build check.

**Bloco 4 — Auth e páginas públicas:**
17. `features/auth/LoginPage.tsx`, `CadastroPage.tsx`.
18. `pages/ForbiddenPage.tsx`.
19. `app/router.tsx` com apenas as rotas públicas por enquanto.
20. `main.tsx` conectando o Router.
21. Testar manualmente login dos 4 usuários.
22. Build check.

**Bloco 5 — ADMIN:**
23. `features/admin/InicioAdmin.tsx` + CSS.
24. `features/admin/InstituicoesPage.tsx` + CSS + modais.
25. `features/admin/UsuariosPage.tsx` + CSS + modal.
26. `features/admin/RelatoriosPage.tsx` + CSS.
27. Adicionar rotas no router.
28. Build + testar admin.

**Bloco 6 — DEPPI:**
29. `features/deppi/InicioDeppi.tsx`.
30. `features/deppi/CursosDeppi.tsx`.
31. `features/deppi/CursoDetalhe.tsx`.
32. `features/deppi/NovoCurso.tsx`.
33. `features/deppi/InscricoesPage.tsx`.
34. `features/deppi/InscricaoDetalhe.tsx` + modais deferir/indeferir.
35. `features/deppi/ProfessoresPage.tsx`.
36. `features/deppi/ProfessorDetalhe.tsx`.
37. `features/deppi/NovoProfessor.tsx`.
38. Adicionar rotas.
39. Build + testar deppi.

**Bloco 7 — PROFESSOR:**
40. `features/professor/InicioProfessor.tsx`, `CursosProfessor.tsx`, `EditarCurso.tsx`.
41. Adicionar rotas.
42. Build + testar professor.

**Bloco 8 — ALUNO:**
43. `features/aluno/InicioAluno.tsx`, `CatalogoCursos.tsx`, `CursoAluno.tsx` + modal confirmar.
44. `features/aluno/MinhasInscricoes.tsx`, `InscricaoAluno.tsx`.
45. Adicionar rotas.
46. Build + testar aluno.

**Bloco 9 — Perfil e refinamentos:**
47. `features/perfil/PerfilPage.tsx`.
48. Rodar todo o checklist 13.
49. Criar/atualizar `README.md`.
50. Reportar: "pronto, build OK, X/Y itens do checklist passando. Pendências: {lista}".

Faça tudo. Não pare no meio. Se um erro for impedir o progresso, conserte localmente e siga; se for impossível de resolver, deixe um comentário `// TODO:` no arquivo e continue.