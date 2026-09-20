# Gestão de Veículos e Concessionárias

Aplicação full stack desenvolvida para realizar o cadastro, a consulta, a atualização e a exclusão de veículos e concessionárias. O sistema também permite associar veículos às concessionárias e filtrar os veículos pela concessionária responsável.

## Funcionalidades

### Concessionárias

- Cadastro de concessionárias
- Listagem de concessionárias
- Edição de dados
- Exclusão de registros
- Validação dos campos

### Veículos

- Cadastro de veículos
- Listagem de veículos
- Edição e cancelamento da edição
- Exclusão com confirmação
- Associação entre veículo e concessionária
- Alteração da concessionária associada
- Filtro de veículos por concessionária
- Feedback de carregamento e erro

## Tecnologias

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- PostgreSQL
- JUnit

### Frontend

- React
- TypeScript
- Vite
- TanStack Query
- React Hook Form
- Zod
- React Router

### Infraestrutura

- Docker
- Docker Compose

## Arquitetura

```text
Usuário
   |
   v
Frontend React + TypeScript
   |
   | API REST
   v
Backend Spring Boot
   |
   | JPA / Hibernate
   v
PostgreSQL
