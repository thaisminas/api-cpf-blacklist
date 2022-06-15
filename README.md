<h1 align="center"> Desafio CPF Blacklist </h1>

## 📕 Índice

- [Sobre](#sobre)
- [Especificações do Desafio](#especificações-do-desafio)
- [Requisitos Obrigatórios](#requisitos-obrigatórios)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Swagger](#swagger)

<hr>


<!-- About -->

# Sobre

<p align="left"> 📡 API Rest em Node.js utilizando o framework NestJS e banco de dados Postgres. 

A API possui endpoint que realiza a verificação do status de um determinado número de CPF em uma blacklist. Também conta com outros endpoints para adicionar, remover CPF e realizar algumas consultas especificas dos CPFs registrados na blacklist.  </p>
<br/><br/>

# Especificações do Desafio

<p align="left"> 
Desenvolva uma aplicação Node.js que seja acessível localmente e verifique se um determinado número
de CPF está em uma Blacklist.

Ser acessível como serviço através de endpoints que permitam:
   
* Consultar a situação do CPF informado, retornando FREE se o CPF não estiver na Blacklist e BLOCK
se o CPF estiver na Blacklist;

* Incluir um cpf na Blacklist;

* Remover um cpf na Blacklist; </p>

<p align="left"> Aceitar uma rota de suporte (exemplo: http://127.0.0.1:3000/status), que retorne:

  * As informações de uptime do servidor;

  *  Quantidade de consultas realizadas desde o último restart;

  *  Quantidade de CPFs na blacklist.
  
<br/><br/>

# Requisitos Obrigatórios

&#9745; As chamadas diretas ao endpoint, devem retornar em formato JSON;

&#9745; Validação do CPF/máscara na consulta e inclusão;
Utilização do Node.js 12 ou superior na construção dos recursos;

&#9745; Criação de testes unitários;

&#9745; Criação de um arquivo README descrevendo detalhadamente as dependências e como o projeto foi
estruturado;

&#9745; Utilização de containers Docker para construção do ambiente (incluir Dockerfile e qualquer outra
dependência para execução no projeto)

<b></br>


<!-- TECHNOLOGIES -->

# Tecnologias Utilizadas

- 🧩 **Tecnologias**

  - [Typescript](https://www.typescriptlang.org/)
  - [NodeJS](https://nodejs.org/en/)
  - [NestJS](https://nestjs.com/)
  - [Postgres](https://www.postgresql.org/)
  - [ORM Sequelize](https://sequelize.org/)
  - [Docker](https://docs.docker.com/)



<b></br>
<b></br>

# Instalação



1. Comando para subir o projeto:

   ```sh
   sudo docker-compose up -d --build --force recreate
   ```


   
<b></br>

<b></br>

# Endpoints

Com a API em funcionamento, vamos rodar os testes conforme as especificações que foram pedidos para o desafio via Insomnia (ou algum similar).


Um ponto importante é que para testar as rotas deverá  gerar um  CPF válido, do contrário ocorrerá erros.

Gerador de CPF: https://www.4devs.com.br/gerador_de_cpf

<b></br>




 *POST*:

- __<u>Incluir CPF na blacklist </u>__ - rota: *http://localhost:3080/blacklist*  
  Preencher o JSON, conforme exemplo:
  

  ```
  {
	"cpf":"818.540.137-34"
  }

  ```

  RETORNO:
   ```
   {
	"id": 17,
	"cpf": "818.540.137-34",
	"updatedAt": "2022-01-02T00:48:09.149Z",
	"createdAt": "2022-01-02T00:48:09.149Z"
   }
   ```
   * Caso o CPF já tenha sido adicionado na blaklist, será retornado um erro HTTP 404 - Bad Request e uma mensagem "CPF Already Exists!"

<b></br>

*GET*:

- __<u>Consultar CPF na blacklist </u>__ - rota: *http://localhost:3080/blacklist/818.540.137-34*  
  
   Possíveis retornos no JSON:
  
   - Caso o CPF informado esteja na blacklist será retornado um status "BLOCK" 
    
   ```
      {
         "status": "BLOCK"
      }
   ```
  
    - Caso o CPF informado não esteja na blacklist será retornado um status "FREE".
    <b><br>
  

  ```
      {
         "status": "FREE"
      }
    ```

<b></br>

*DELETE*:

- __<u>Deleta um CPF da blacklist </u>__ - rota: *http://localhost:3080/blacklist/818.540.137-34*  

  
  - Caso o CPF informado esteja na blacklist será lançado um código HTTP 200-OK  e retornado uma mensagem "CPF successfully removed!" 
   ```
   {
	"message": "CPF successfully removed!"
   }
   ```
    - Caso o CPF informado não esteja na blacklist, será lançado um código HTTP 404-Bad Request e será retornado uma mensagem  "CPF does not exist on the blacklist!".
    <b><br>
  

  ```
   {
   "message": "CPF does not exist on the blacklist!"
   }
    ```

<b><br>

*GET*:

- __<u>Rota de Suporte</u>__ - rota: *http://localhost:3080/status/*  
   Será retornado um JSON com as seguintes informações:
   - Tempo de atividade do servidor. 
   - Quantidade de consultas realizadas desde último restart.
   - Quantidade de CPFs que estão registrados na blaklist.
    
   ```
   {
      "uptime_server": "00:00:17",
      "quantity_consults": 1,
      "quantity_cpf": 5
   }
   ```


    <b><br>





# Swagger
   Para visualizar a documentação do projeto no swagger acessar a rota: 
*http://localhost:3080/* 




  <b><br>
