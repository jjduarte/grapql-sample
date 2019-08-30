const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');
const Operacoes = require('./infraestrutura/operations');
const resolverServico = require('./controllers/servico');
const resolverAtendimento = require('./controllers/atendimento');
const resolverPet = require('./controllers/pet');
const resolverCliente = require('./controllers/cliente');

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const defaultResolvers = {
  Date:{},
  Query: {
    status: () => `Servidor rodando`,
  },
  Mutation: {
  }
}

const resolvers = _.merge(
  defaultResolvers, 
  resolverServico, 
  resolverAtendimento, 
  resolverPet,
  resolverCliente);

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

servidor.start(() => {
  console.log('Servidor ouvindo')
});