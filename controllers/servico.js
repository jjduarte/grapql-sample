const Operations = require('../infraestrutura/operations')

const Servicos = new Operations('servico')

module.exports = {
    Query: {
      servicos: () => Servicos.lista(),
      servico: (root, { id }) => Servicos.buscaPorId(id)
    },
    Mutation: {
      adicionaServico: (root, params) => Servicos.adiciona(params),
      deletaServico: (root, { id }) => Servicos.deleta(id),
      atualizaServico: (root, params) => Servicos.atualiza(params)
    }
}
