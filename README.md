# Callix SpaceX
Desafio técnico fullstack para exploração de dados da API SpaceX

## Executando o Projeto

### Instalação
```bash
# Instale as dependências do backend
cd ../backend
pnpm install

# Instale as dependências do frontend
cd ../frontend
pnpm install
```

### Executando em Desenvolvimento
```bash
# Terminal 1 - Backend (porta 3002)
cd backend
pnpm dev

# Terminal 2 - Frontend (porta 5173)
cd frontend
pnpm dev
```

Acesse http://localhost:5173 para visualizar a aplicação.

## Endpoints da API

O backend expõe uma API REST que consome a SpaceX API v5 e fornece os seguintes endpoints:

### `GET /api/spacex/next-launch`
Retorna informações sobre o próximo lançamento agendado.

### `GET /api/spacex/latest-launch`
Retorna informações sobre o último lançamento realizado.

### `GET /api/spacex/upcoming-launches`
Retorna uma lista de próximos lançamentos.

### `GET /api/spacex/past-launches`
Retorna uma lista de lançamentos passados.

### `GET /api/health`
Endpoint de saúde da API para monitoramento.
