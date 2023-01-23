# Imobiliária Back-End
Este é um serviço de back-end desenvolvido para gerenciar uma imobiliária. Ele foi construído usando Node.js, Express, Typescript e TypeORM.

## Recursos
- Gerenciamento de imóveis (cadastro, edição, exclusão)
- Gerenciamento de clientes (cadastro, edição, exclusão)
- Gereciamento de agendamento a imoveis(cadastro)

## Instalação sem usar Docker
Para instalar este serviço sem usar Docker, você precisará ter o Node.js e o npm (gerenciador de pacotes do Node) instalados.

- Clone este repositório para sua máquina: 
```
git clone git@github.com:fjrjdev/imobiliaria-backend.git
```
- Entre na pasta do projeto: cd imobiliaria-backend
- Instale as dependências: npm install ou yarn install
- Configure as suas credenciais do banco de dados no arquivo .env
- Execute as migrations: npx typeorm migration:run ou yarn typeorm migration:run
- Inicie o servidor: npm start ou yarn start
- Para rodar os testes automatizados: npm test ou yarn test

## Instalação usando Docker
Para instalar este serviço usando Docker, você precisará ter o Docker e o Docker Compose instalados em sua máquina.

- Clone este repositório para sua máquina: 
```
git clone git@github.com:fjrjdev/imobiliaria-backend.git
```
- Entre na pasta do projeto: cd imobiliaria-backend
- Configure as suas credenciais do banco de dados no arquivo docker-compose.yml
- Execute o comando docker-compose build para criar a imagem do projeto
- Execute as migrations: docker-compose run --rm app npx typeorm migration:run ou docker-compose run --rm app yarn typeorm migration:run
- Inicie o servidor: docker-compose up
- Para rodar os testes automatizados: docker-compose run --rm app npm test ou docker-compose run --rm app yarn test

## Rotas

### POST - /users
Esta rota é responsável por criar um novo usuário com os seguintes dados:

- name: string
- email: string
- password: string (mas armazenada como uma hash gerada com bcrypt)
- isAdm: boolean
- isActive: boolean (padrão = true, não passado como parâmetro, mas gerado durante a validação de dados)
- createdAt: Date (não passado como parâmetro, mas gerado durante a validação de dados)
- updatedAt: Date (não passado como parâmetro, mas gerado durante a validação de dados, começa com o mesmo valor de createdAt e atualizado sempre que o usuário é atualizado)
- id: uuidv4 (não passado como parâmetro, mas gerado durante a validação de dados)

A rota retorna todos os dados, exceto a hash de senha.

Não é possível registrar dois usuários com o mesmo e-mail.

#### Exemplos
``` Requisição:

{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "mysecretpassword"
}

Resposta:

{
    "id": "6a9f6b9c-b2e6-4f7e-8a3f-d1a9e1f3f9f9",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "isAdm": false,
    "isActive": true,
    "createdAt": "2022-01-01T10:00:00.000Z",
    "updatedAt": "2022-01-01T10:00:00.000Z"
}
```

#### Respostas de Erro
- 400 Bad Request: Dados inválidos fornecidos
- 409 Conflict: E-mail já em uso

```
Requisição:

{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "mysecretpassword"
}

Resposta:

{
    "error": "E-mail já em uso"
}

```

### POST - /properties
Esta rota é responsável por criar um novo imóvel com os seguintes dados:

- value: number
- size: number
- address: um objeto com os seguintes dados:
  - district: string
  - zipCode: string
  - number: string
  - city: string
  - state: string
- categoryId: string
- id: uuidv4 (não passado como parâmetro, mas gerado durante a validação de dados)
- sold: boolean (padrão = false, não passado como parâmetro, mas gerado durante a validação de dados)
- createdAt: Date (não passado como parâmetro, mas gerado durante a validação de dados)
- updatedAt: Date (não passado como parâmetro, mas gerado durante a validação de dados, começa com o mesmo valor de createdAt e atualizado sempre que o imóvel é atualizado)

Não é possível registrar dois imóveis com o mesmo endereço.

A rota só pode ser acessada por administradores.

Não é permitido cadastrar imóveis com o campo state maior que 2 dígitos.

Não é permitido cadastrar imóveis com o campo zipCode maior que 8 dígitos.

#### Exemplos 

```
Requisição:

{
    "value": 100000,
    "size": 100,
    "address": {
        "district": "Centro",
        "zipCode": "12345678",
        "number": "123",
        "city": "São Paulo",
        "state": "SP"
    },
    "categoryId": "12345678-1234-1234-1234-1234567890ab"
}

Resposta:

{
    "id": "6a9f6b9c-b2e6-4f7e-8a3f-d1a9e1f3f9f9",
    "value": 100000,
    "size": 100,
    "address": {
        "district": "Centro",
        "zipCode": "12345678",
        "number": "123",
        "city": "São Paulo",
        "state": "SP"
    },
    "categoryId": "12345678-1234-1234-1234-1234567890ab",
    "sold": false,
    "createdAt": "2022-01-01T10:00:00.000Z",
    "updatedAt": "2022-01-01T10:00:00.000Z"
}

```
Respostas de Erro
- 400 Bad Request: Dados inválidos fornecidos
- 409 Conflict: Endereço já em uso
- 401 Unauthorized: Acesso negado, somente administradores podem acessar esta rota




