const Operations = require('../infraestrutura/operations')

const Pets = new Operations('pet')


module.exports = {
  Query: {
    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id)
  },
  Mutation: {
    adicionarPet: (root, params) => Pets.adiciona(params),
    atualizaPet: (root, params) => Pets.atualiza(params),
    deletaPet: (root, { id }) => Pets.deleta(id)
  }
}

