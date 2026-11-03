import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShell } from '../shared/layout/AppShell';
import { RequireAuth } from '../shared/guards/RequireAuth';
import { RequireRole } from '../shared/guards/RequireRole';
import { LoginPage } from '../features/auth/LoginPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

import { InicioAdmin } from '../features/admin/InicioAdmin';
import { InicioProfessor } from '../features/professor/InicioProfessor';
import { CursosProfessor } from '../features/professor/CursosProfessor';
import { NovoCurso } from '../features/deppi/NovoCurso';

import { useSession } from '../features/auth/session.store';
import type { Role } from '../shared/routes';

function InicioRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'ADMIN') return <InicioAdmin />;
  if (user.role === 'PROFESSOR') return <InicioProfessor />;
  return <PlaceholderPage />;
}

function CursosRouter() {
  const user = useSession(s => s.user)!;
  if (user.role === 'PROFESSOR') return <CursosProfessor />;
  return <PlaceholderPage />;
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
          { path: '/cursos/:id', element: <PlaceholderPage /> },
          { path: '/cursos/:id/editar', ...emConstrucao(['PROFESSOR', 'DEPPI', 'ADMIN']) },

          { path: '/instituicoes', ...emConstrucao(['ADMIN']) },
          { path: '/usuarios', ...emConstrucao(['ADMIN']) },
          { path: '/relatorios', ...emConstrucao(['ADMIN']) },

          { path: '/inscricoes', ...emConstrucao(['DEPPI']) },
          { path: '/inscricoes/:id', ...emConstrucao(['DEPPI']) },
          { path: '/professores', ...emConstrucao(['DEPPI']) },
          { path: '/professores/novo', ...emConstrucao(['DEPPI']) },
          { path: '/professores/:id', ...emConstrucao(['DEPPI']) },

          { path: '/minhas-inscricoes', ...emConstrucao(['ALUNO']) },
          { path: '/minhas-inscricoes/:id', ...emConstrucao(['ALUNO']) },

          { path: '/perfil', element: <PlaceholderPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/403" replace /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
