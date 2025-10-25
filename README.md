# Tarot API

Uma API REST simples implementada com **Node.js**, **TypeScript**, **Express** e **MongoDB** para gerenciar cartas de tarot e realizar leituras de 3 cartas.

## Pré-requisitos

Para executar esta API, você precisará ter instalado:

*   **Node.js** (versão 18+)
*   **npm** (gerenciador de pacotes do Node.js)
*   Um servidor **MongoDB** em execução (local ou remoto)

## Configuração

1.  **Clone o repositório** (simulação):
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd tarot-api
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**:
    Crie um arquivo chamado `.env` na raiz do projeto e adicione a sua URI de conexão com o MongoDB e a porta do servidor.

    **.env**
    ```bash
    # Substitua pela sua URI de conexão com o MongoDB
    MONGO_URI=mongodb://localhost:27017/tarotdb
    PORT=3000
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento (usando `ts-node`):

```bash
npm run dev
# ou
npm start
```

O servidor estará rodando em `http://localhost:3000` (ou na porta que você configurou).

## Endpoints da API

Todos os endpoints estão prefixados com `/api/v1`.

### 1. Cartas de Tarot (CRUD)

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) | Resposta de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/cards` | Cria uma nova carta de tarot. | `{ "name": "...", "suit": "...", "meaning_upright": "...", "meaning_reversed": "...", "keywords": ["...", "..."], "number": 0, "arcana": "Major" }` | `201 Created` + Objeto da carta criada |
| `GET` | `/api/v1/cards` | Lista todas as cartas cadastradas. | N/A | `200 OK` + Array de objetos de cartas |
| `GET` | `/api/v1/cards/:id` | Busca uma carta pelo ID. | N/A | `200 OK` + Objeto da carta |
| `PUT` | `/api/v1/cards/:id` | Atualiza uma carta existente. | Objeto com campos a serem atualizados | `200 OK` + Objeto da carta atualizada |
| `DELETE` | `/api/v1/cards/:id` | Exclui uma carta pelo ID. | N/A | `204 No Content` |

**Modelo de Dados (`ITarotCard`):**

| Campo | Tipo | Descrição | Obrigatório | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `String` | Nome da carta (único). | Sim | `O Mago` |
| `suit` | `String` | Naipe da carta. | Sim | `Arcanos Maiores` |
| `meaning_upright` | `String` | Significado na posição normal. | Sim | `Ação, poder, iniciativa` |
| `meaning_reversed` | `String` | Significado na posição invertida. | Sim | `Inação, manipulação, falta de poder` |
| `keywords` | `String[]` | Palavras-chave para interpretação. | Sim | `["Criação", "Vontade", "Habilidade"]` |
| `number` | `Number` | Número da carta. | Sim | `1` |
| `arcana` | `String` | Tipo de arcano (`Major` ou `Minor`). | Sim | `Major` |

### 2. Leitura de Tarot

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) | Resposta de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/read` | Realiza uma leitura de 3 cartas aleatórias. | N/A | `200 OK` + Objeto da leitura |

**Resposta da Leitura:**

A resposta inclui um array de 3 cartas, onde cada carta possui, além dos dados originais, a `position` (`Normal` ou `Invertida`) e o `meaning` correspondente.

```json
{
  "message": "Sua leitura de Tarot de 3 cartas:",
  "reading": [
    {
      "_id": "...",
      "name": "A Força",
      "suit": "Arcanos Maiores",
      "number": 8,
      "arcana": "Major",
      "position": "Invertida",
      "meaning": "Fraqueza, falta de confiança, insegurança",
      "keywords": ["Força", "Coragem", "Paciência"]
    },
    // ... mais duas cartas
  ]
}
```

## Teste Rápido (Exemplo com cURL)

Para testar a criação de uma carta (após iniciar o servidor e ter o MongoDB rodando):

```bash
# Exemplo de criação da carta "O Louco"
curl -X POST http://localhost:3000/api/v1/cards \
-H "Content-Type: application/json" \
-d '{
  "name": "O Louco",
  "suit": "Arcanos Maiores",
  "meaning_upright": "Início, espontaneidade, inocência, potencial",
  "meaning_reversed": "Imprudência, negligência, risco, falta de direção",
  "keywords": ["Início", "Liberdade", "Aventura"],
  "number": 0,
  "arcana": "Major"
}'

# Exemplo de leitura de tarot (requer 3+ cartas no banco)
curl http://localhost:3000/api/v1/read
```
