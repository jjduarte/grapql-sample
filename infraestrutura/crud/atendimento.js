const executaQuery = require('../database/queries')

class Atendimento {
  lista() {
    const sql = `SELECT a.id, a.data, a.status, a.observacoes, 
    s.id as servicoId, s.nome as servicoNome, s.descricao as servicoDescricao, s.preco as servicoPreco,
    p.id as petId, p.nome as petNome, p.tipo as petTipo, p.observacoes as petObs, 
    c.id as donoId, c.nome as donoNome, c.cpf as donoCpf
    FROM Atendimentos AS a 
    INNER JOIN Clientes as c ON a.clienteId = c.id
    INNER JOIN Pets as p ON a.petId = p.id
    INNER JOIN Servicos as s ON a.servicoId = s.id`

    return executaQuery(sql).then(atendimentos =>
      atendimentos.map(atendimento => ({
        id: atendimento.id,
        data: atendimento.data,
        status: atendimento.status,
        observacoes: atendimento.observacoes,
        servico: {
          id: atendimento.servicoId,
          nome: atendimento.servicoNome,
          descricao: atendimento.servicoDescricao,
          preco: atendimento.servicoPreco
        },
        pet: {
          id: atendimento.petId,
          nome: atendimento.petNome,
          tipo: atendimento.petTipo,
          observacoes: atendimento.petObs
        },
        cliente: { 
          id: atendimento.donoId,
          nome: atendimento.donoNome,
          cpf: atendimento.donoCpf
        }
      })) 
    )
  }

  buscaPorId(id) {
    const sql = `SELECT a.id, a.data, a.status, a.observacoes, 
    s.id as servicoId, s.nome as servicoNome, s.descricao as servicoDescricao, s.preco as servicoPreco,
    p.id as petId, p.nome as petNome, p.tipo as petTipo, p.observacoes as petObs, 
    c.id as donoId, c.nome as donoNome, c.cpf as donoCpf
    FROM Atendimentos AS a 
    INNER JOIN Clientes as c ON a.clienteId = c.id
    INNER JOIN Pets as p ON a.petId = p.id
    INNER JOIN Servicos as s ON a.servicoId = s.id WHERE a.id=${parseInt(id)}`

    return executaQuery(sql).then(atendimentos =>{
      const result = atendimentos.map(atendimento => ({
        id: atendimento.id,
        data: atendimento.data,
        status: atendimento.status,
        observacoes: atendimento.observacoes,
        servico: {
          id: atendimento.servicoId,
          nome: atendimento.servicoNome,
          descricao: atendimento.servicoDescricao,
          preco: atendimento.servicoPreco
        },
        pet: {
          id: atendimento.petId,
          nome: atendimento.petNome,
          tipo: atendimento.petTipo,
          observacoes: atendimento.petObs
        },
        cliente: {
          id: atendimento.donoId,
          nome: atendimento.donoNome,
          cpf: atendimento.donoCpf
        }
      }))
      return result[0];
    })
  }

  adiciona(item) {
    const { cliente, pet, servico, status, observacoes } = item
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${cliente}, ${pet}, ${servico}, '${date}', '${status}', '${observacoes}'); SELECT * FROM Clientes WHERE id=${cliente}; SELECT * FROM Servicos WHERE id=${servico}; SELECT * FROM Pets WHERE id=${pet};`

    return executaQuery(sql).then(data => {
      const cliente = data[1][0]
      const servico = data[2][0]
      const pet = data[3][0]
      const atendimentoId = data[0].insertId;

      const obj = {
        ...item,
        id: atendimentoId,
        data: date,
        cliente,
        servico,
        pet
      }

      return obj;
    })
  }

  atualiza(novoItem) {
    const { id, clienteId, petId, servicoId, status, observacoes } = novoItem
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const sql = `UPDATE Atendimentos SET clienteId=${clienteId}, petId=${petId}, servicoId=${servicoId}, data='${date}', status='${status}', observacoes='${observacoes}' WHERE id=${id}; SELECT * FROM Pets WHERE id=${petId}; SELECT * FROM Clientes WHERE id=${clienteId}; SELECT * FROM Servicos WHERE id=${servicoId};`

    return executaQuery(sql).then(dados => {
      const pet = dados[1][0]
      const cliente = dados[2][0]
      const servico = dados[3][0]

      return ({
        ...novoItem,
        pet,
        cliente,
        servico
      })
    })
  }

  deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql).then(() => id);
  }
}

module.exports = new Atendimento
