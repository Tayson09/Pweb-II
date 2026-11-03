export type Role = 'ALUNO' | 'PROFESSOR' | 'DEPPI' | 'ADMIN';

export type NavItem = {
  path: string;
  label: string;
  icon: string;
  roles: Role[];
};

export const NAV_ITEMS: NavItem[] = [
  { path: '/inicio',            label: 'Início',            icon: 'home',       roles: ['ALUNO', 'PROFESSOR', 'DEPPI', 'ADMIN'] },
  { path: '/cursos',            label: 'Cursos',            icon: 'school',     roles: ['ALUNO', 'PROFESSOR', 'DEPPI', 'ADMIN'] },
  { path: '/instituicoes',      label: 'Instituições',      icon: 'apartment',  roles: ['ADMIN'] },
  { path: '/usuarios',          label: 'Usuários',          icon: 'group',      roles: ['ADMIN'] },
  { path: '/inscricoes',        label: 'Inscrições',        icon: 'fact_check', roles: ['DEPPI'] },
  { path: '/professores',       label: 'Professores',       icon: 'badge',      roles: ['DEPPI'] },
  { path: '/minhas-inscricoes', label: 'Minhas inscrições', icon: 'assignment', roles: ['ALUNO'] },
  { path: '/relatorios',        label: 'Relatórios',        icon: 'bar_chart',  roles: ['ADMIN'] },
  { path: '/perfil',            label: 'Perfil',            icon: 'person',     roles: ['ALUNO', 'PROFESSOR', 'DEPPI', 'ADMIN'] },
];

export function navForRole(role: Role): NavItem[] {
  return NAV_ITEMS.filter(i => i.roles.includes(role));
}

export function canAccess(path: string, role: Role): boolean {
  const item = NAV_ITEMS.find(i => path === i.path || path.startsWith(i.path + '/'));
  if (!item) return true;
  return item.roles.includes(role);
}
