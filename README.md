# Indice

- [Sobre](#-sobre)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como baixar o projeto](#-como-baixar-o-projeto)

## Lista Rango

## 🔖&nbsp; Sobre



---

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)

---

## 🗂 Como baixar o projeto

# Backend
```bash

    # Clonar o repositório
    $ git clone https://github.com/LeonardoGabrielSanches/Goomer-Lista-Rango_desafio

    # Entrar no diretório
    $ cd Goomer-Lista-Rango_desafio

    # Instalar as dependências
    $ yarn install
```

## Ambiente do projeto

# Para realizar a configuração do ambiente é necessário que sejam feitas algumas mudanças no arquivo ormconfig.json que está na raiz do projeto.
```bash

{
  "type": "mysql",
  "host": "localhost", 
  "port": 3306, --Informe a porta usada pelo mysql
  "username": "root", -- Informe o usuário utilizado pelo mysql
  "password": "password", -- Informe a senha para o acesso ao banco de dados
  "database": "goomer_rango", -- Crie um banco de dados com este nome ou qualquer outro que quiser, apenas se lembre de trocar a propriedade
  "entities": [
    "./src/modules/**/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}


```
Após isso será necessário rodar um comando para que as "migrations" sejam executadas no banco de dados. E então rode o comando para dar um start no servidor.

```bash
	yarn typeorm migration:run
	yarn dev:server
```

## Rotas
 # Para os restaurantes:
	GET (Todos)- http://localhost:3333/restaurants
	GET (Apenas um) - http://localhost:3333/restaurants/{id}
	POST - http://localhost:3333/restaurants 
	PUT - http://localhost:3333/restaurants 
	PATCH - http://localhost:3333/restaurants/upload/{id} (Deverá ser enviado um arquivo de imagem com o nome "image") 
	DELETE - http://localhost:3333/restaurants/{id}

 # Exemplo de JSON
```bash
 #POST
	{
	"name":"Restaurante Número Um",
	"address":"Rua 1",
	"operations": [{
		"start_hour":"17:30",
		"end_hour":"22:50",
		"period_description": "Segunda à Sexta"
	}]
	}
 #PUT
	{
	"id": 1,
  	"name": "Restaurante Número um atualizado",
  	"address": "Rua 1 atualizada",
	"operations": [{
		"id": 1,
		"start_hour":"17:30",
		"end_hour":"23:50",
		"period_description": "Segunda à Quarta"
	}]
	}
```
 # Para os produtos
	GET (Todos por restaurante)- http://localhost:3333/products?restaurantId={id}
	POST - http://localhost:3333/products
	PUT - http://localhost:3333/products
	PATCH - http://localhost:3333/products/upload/{id} (Deverá ser enviado um arquivo de imagem com o nome "image") 
	DELETE - http://localhost:3333/products/{id}

 # Exemplo de JSON
```bash
 #POST
	{
	"name":"Pão a",
	"price": 3.5,
	"category":"Comidas sólidas",
	"restaurant_id": 1,
	"sale": false
	}

	||

	{ 
	"name": "Teste 3.82",
   	"category": "Dry Food",
   	"price": 8.32,
   	"sale": true,
   	"restaurant_id": 1,
   	"sale_price": 2.5,
   	"sale_description": "HAPPY HOUR",
   	"operations": [
     	{
       	"start_hour": "17:30",
       	"end_hour": "18:30",
       	"period_description": "Segunda a sexta"
     	}
   	]
}	
 #PUT
	{
	 "id":1,
   	"name": "Teste 3.82",
   	"category": "Dry Food",
   	"price": 8.32,
   	"sale": true,
   	"restaurant_id": 1,
   	"sale_price": 2.5,
   	"sale_description": "HAPPY HOUR",
   	"operations": [
     	{
	"id":1
       	"start_hour": "17:30",
       	"end_hour": "18:30",
       	"period_description": "Segunda a sexta"
     	}
   	]
}
```

---

Desenvolvido Leonardo Gabriel Sanches