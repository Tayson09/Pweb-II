# DEPPI-WEB

Portal de cursos de extensão do IFCE. Frontend em React + TypeScript, com dados mockados em memória (sem backend). Entrega 1 da disciplina de Programação Web II.

## O que esta entrega contém

- Login e logout, com sessão fake.
- Permissões por cargo (ALUNO, PROFESSOR, DEPPI, ADMIN):
  - o menu lateral mostra apenas o que o cargo pode acessar;
  - sem login, o acesso volta para `/login`;
  - sem permissão, o acesso vai para a página 403.
- Início do ADMIN: totais e gráficos resumidos.
- Início do PROFESSOR: lista e busca de cursos.
- Página de criar curso (`/cursos/novo`), disponível para PROFESSOR, DEPPI e ADMIN. O curso é criado com status "Em análise".

As demais telas aparecem como "Em construção" e serão entregues de forma gradual.

## Rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Login de teste

Sessão e login são fake. Os usuários ficam em `src/features/auth/mock-users.ts`.

| Cargo     | E-mail                      | Senha    | Telas disponíveis nesta entrega        |
|-----------|-----------------------------|----------|----------------------------------------|
| ADMIN     | admin@deppi.local           | admin123 | Início, criar curso                    |
| DEPPI     | marcia.holanda@ifce.edu.br  | deppi123 | Criar curso (somente pela URL)         |
| PROFESSOR | paulo.viana@ifce.edu.br     | prof123  | Início, cursos, criar curso            |
| ALUNO     | ana.rocha@aluno.ifce.edu.br | aluno123 | Apenas "Em construção"                 |

A sessão é guardada em `localStorage`. Os dados de domínio vivem num store Zustand em memória e são resetados ao recarregar a página.

> **Atenção:** como a sessão fica no `localStorage` e o cargo vem junto, qualquer pessoa consegue alterá-la no navegador. Os guards servem só para a experiência de uso. A autorização de verdade precisa ficar no backend.

## Organização

- `src/app` — router (rotas e guards por cargo).
- `src/features` — telas por cargo (`auth`, `admin`, `deppi`, `professor`).
- `src/shared` — componentes, layout, guards, store de domínio e mocks.
- `src/pages` — página 403 e página "Em construção".

`src/shared/routes.ts` define os itens do menu lateral e o título do cabeçalho por cargo. As restrições de acesso às rotas ficam em `src/app/router.tsx`. Ao alterar permissões, atualize os dois arquivos.