import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShell } from '../shared/layout/AppShell';
import { RequireAuth } from '../shared/guards/RequireAuth';
import { RequireRole } from '../shared/guards/RequireRole';
import { LoginPage } from '../features/auth/LoginPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

import { InicioAdmin } from '../features/admin/InicioAdmin';
import { InicioProfessor } from '../features/professor/InicioProfessor';
import { InicioAluno } from '../features/aluno/InicioAluno';
import { InicioDeppi } from '../features/deppi/InicioDeppi';
import { CursosDeppi } from '../features/deppi/CursosDeppi';
import { InscricoesPage } from '../features/deppi/InscricoesPage';
import { ProfessoresPage } from '../features/deppi/ProfessoresPage';
import { NovoProfessor } from '../features/deppi/NovoProfessor';
import { ProfessorDetalhe } from '../features/deppi/ProfessorDetalhe';
import { CursosAluno } from '../features/aluno/CursosAluno';
import { CursoDetalheAluno } from '../features/aluno/CursoDetalheAluno';
import { CursosProfessor } from '../features/professor/CursosProfessor';
import { NovoCurso } from '../features/deppi/NovoCurso';
import { EditarCurso } from '../features/deppi/EditarCurso';
import { CursoDetalhe } from '../features/professor/CursoDetalhe';
import { Perfil } from '../features/perfil/Perfil';

import { useSession } from '../features/auth/session.store';
import type { Role } from '../shared/routes';

function InicioRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'ADMIN') return <InicioAdmin />;
  if (user.role === 'PROFESSOR') return <InicioProfessor />;
  if (user.role === 'ALUNO') return <InicioAluno />;
  if (user.role === 'DEPPI') return <InicioDeppi />;
  return <PlaceholderPage />;
}

function CursosRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'PROFESSOR') return <CursosProfessor />;
  if (user.role === 'ALUNO') return <CursosAluno />;
  if (user.role === 'DEPPI') return <CursosDeppi />;
  return <PlaceholderPage />;
}

function CursoDetalheRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'ALUNO') return <CursoDetalheAluno />;
  return <CursoDetalhe />;
}

// Telas ainda não entregues: mantêm a restrição por cargo e mostram "Em construção".
const emConstrucao = (roles: Role[]) => ({
  element: <RequireRole roles={roles} />,
  children: [{ index: true, element: <PlaceholderPage /> }],
});

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
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
          {
            path: '/cursos/novo',
            element: <RequireRole roles={['PROFESSOR', 'DEPPI', 'ADMIN']} />,
            children: [{ index: true, element: <NovoCurso /> }],
          },
          {
            path: '/cursos/:id',
            element: <RequireRole roles={['ALUNO', 'PROFESSOR', 'DEPPI', 'ADMIN']} />,
            children: [{ index: true, element: <CursoDetalheRouter /> }],
          },
          {
            path: '/cursos/:id/editar',
            element: <RequireRole roles={['PROFESSOR', 'DEPPI', 'ADMIN']} />,
            children: [{ index: true, element: <EditarCurso /> }],
          },

          { path: '/instituicoes', ...emConstrucao(['ADMIN']) },
          { path: '/usuarios', ...emConstrucao(['ADMIN']) },
          { path: '/relatorios', ...emConstrucao(['ADMIN']) },

          {
            path: '/inscricoes',
            element: <RequireRole roles={['DEPPI']} />,
            children: [{ index: true, element: <InscricoesPage /> }],
          },
          { path: '/inscricoes/:id', ...emConstrucao(['DEPPI']) },
          {
            path: '/professores',
            element: <RequireRole roles={['DEPPI']} />,
            children: [{ index: true, element: <ProfessoresPage /> }],
          },
          {
            path: '/professores/novo',
            element: <RequireRole roles={['DEPPI']} />,
            children: [{ index: true, element: <NovoProfessor /> }],
          },
          {
            path: '/professores/:id',
            element: <RequireRole roles={['DEPPI']} />,
            children: [{ index: true, element: <ProfessorDetalhe /> }],
          },

          { path: '/minhas-inscricoes', ...emConstrucao(['ALUNO']) },
          { path: '/minhas-inscricoes/:id', ...emConstrucao(['ALUNO']) },

          { path: '/perfil', element: <Perfil /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/403" replace /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
