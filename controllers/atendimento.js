const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const Operations = require('../infraestrutura/operations')

const Atendimentos = new Operations('atendimento')

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    atendimentos: () => Atendimentos.lista(),
    atendimento: (root, { id }) => Atendimentos.buscaPorId(id)
  },
  Mutation: {
    adicionaAtendimento: (root, params) => Atendimentos.adiciona(params),
    atualizaAtendimento: (root, params) => Atendimentos.atualiza(params),
    deletaAtendimento: (root, { id }) => Atendimentos.deleta(id)
  }
}
