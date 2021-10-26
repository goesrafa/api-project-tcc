# api-project-tcc

# Observação
- Prepare o ambiente para o banco de dados caso contrário
  vai estourar um erro na inicialização do servidor.

# separado em MVC (Model-View-Controller)
- routes
	- endpoint
- model
	- modelo das tabelas do Sequelize
- controller
	- lógica da aplicação
# no diretório libs/config.js
  Está a configuração do banco de dados
  como senha e nome do banco, a tabela
  é criada automáticamente pelo Sequelize
  no MySQL na inicialização do servidor.

# instalação
- npm install (instalar depedências do node)
- npm start (inicializa o servidor)
