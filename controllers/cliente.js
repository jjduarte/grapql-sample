const Operations = require('../infraestrutura/operations')

const Clientes = new Operations('cliente')

module.exports = {
  Query: {
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params),
    deletaCliente: (root, { id }) => Clientes.deleta(id),
    atualizaCliente: (root, params) => Clientes.atualiza(params)
  }
}

