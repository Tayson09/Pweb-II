import type { User } from './session.store';

export const MOCK_USERS: Array<User & { password: string }> = [
  { id: '1', name: 'Administrador',          email: 'admin@deppi.local',           password: 'admin123', role: 'ADMIN',     initials: 'AD', criadoEm: '2026-01-10' },
  { id: '2', name: 'Márcia Holanda',         email: 'marcia.holanda@ifce.edu.br',  password: 'deppi123', role: 'DEPPI',     initials: 'MH', siape: '1840221', criadoEm: '2026-01-12' },
  { id: '3', name: 'Paulo Henrique Viana',   email: 'paulo.viana@ifce.edu.br',     password: 'prof123',  role: 'PROFESSOR', initials: 'PH', siape: '1928374', criadoEm: '2026-01-15' },
  { id: '4', name: 'Ana Beatriz Lima Rocha', email: 'ana.rocha@aluno.ifce.edu.br', password: 'aluno123', role: 'ALUNO',     initials: 'AB', matricula: '20261045230011', criadoEm: '2026-02-20' },
];

export async function fakeLogin(email: string, password: string): Promise<User> {
  await new Promise(r => setTimeout(r, 400));
  const found = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!found) throw new Error('E-mail ou senha inválidos.');
  return {
    id: found.id, name: found.name, email: found.email, role: found.role,
    initials: found.initials, siape: found.siape, matricula: found.matricula,
    criadoEm: found.criadoEm,
  };
}
