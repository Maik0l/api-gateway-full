
# API Gateway com Node.js, Express e JWT

Este projeto é um API Gateway desenvolvido em Node.js usando Express, com autenticação via JWT (JSON Web Token). Ele serve como ponto central de entrada para múltiplos microsserviços — neste caso, os serviços de Pedidos (orders) e Produtos (products).

#### O Gateway é responsável por:
- Autenticar usuários antes de permitir acesso às rotas protegidas;
- Redirecionar (proxy) as requisições para os microsserviços corretos;
- Centralizar logs e controle de acesso;
- Facilitar a comunicação entre os serviços sem que o cliente precise conhecer as URLs individuais.

## Instalação

#### Pré-requisitos:
- Node.js (versão 18 ou superior)
- npm (geralmente já vem junto com o Node)
- Visual Studio Code (ou outro editor de preferência)
- Postman (para testar as rotas)

```bash
  git clone https://github.com/Maik0l/api-gateway-full.git
  cd api-gateway-project
```
#### Instalando as dependências

Em cada pasta (gateway, orders-service, products-service), rode:

```bash
  npm install
```

#### Configurando as variáveis de ambiente

```bash
  PORT=3000
  ORDERS_URL=http://localhost:4000/orders
  PRODUCTS_URL=http://localhost:5000/products
  JWT_SECRET=supersecret
```

#### Executando os serviços

```bash
  # Terminal 1 (Gateway)
  cd gateway
  npm start

  # Terminal 2 (Orders Service)
  cd orders-service
  npm start

  # Terminal 3 (Products Service)
  cd products-service
  npm start
```


# Endpoints e Métodos REST

#### Autenticação

**POST** `/login`\
Cria um token JWT (válido por 1 hora).\
**Body JSON:**

```json
{
    "username": "admin",
    "password": "12345"
}
```

**Resposta:**

```json
{
    "token": "<jwt-gerado>"
}
```

### Microsserviço de Pedidos `(/orders)`

| Método | Endpoint | Descrição |
| :----- | :------- | :-------- |
| `GET`  | `/orders` | Lista todos os pedidos |
| `POST` | `/orders/create` | Cria um novo pedido |
| `PUT`  | `/orders/update/:id` | Atualiza um pedido existente |
| `DELETE` | `/orders/:id` | Exclui um pedido pelo ID |

### Microsserviço de Produtos `(/products)`

| Método | Endpoint | Descrição |
| :----- | :------- | :-------- |
| `GET`  | `/products` | Lista todos os produtos |
| `POST` | `/products/create` | Adiciona um novo produto |
| `PUT`  | `/products/update/:id` | Atualiza um produto existente |
| `DELETE` | `/products/:id` | Remove um produto pelo ID |

# Testando no Postman

1. Faça uma requisição **POST** em `http://localhost:3000/login` com o corpo:

```json
{
  "username": "admin",
  "password": "12345"
}
```

2. Copie o **token** retornado.

3. Em qualquer outra rota, adicione no **header**:
```http
Authorization: Bearer <seu-token>
```
4. Teste os endpoints /orders e /products normalmente.
# Stack utilizada

- Node.js
- Express
- Axios
- JSON Web Token (JWT)
- Morgan (logs)
- CORS

# Conceitos Envolvidos

- API Gateway: Ponto central que recebe e redireciona requisições entre microsserviços.
- JWT (JSON Web Token): Mecanismo de autenticação que permite identificar usuários de forma segura.
- REST API: Padrão de arquitetura para comunicação entre sistemas via HTTP.
- Proxy: O Gateway atua como um intermediário entre o cliente e os microsserviços.

## 🚀 Sobre a equipe
Desenvolvedores:
- Laiane Martins
- Maikol Moraes
- Nicole Costa
- Pedro Nogueira

