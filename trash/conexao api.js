// Essa função era usada para gerar um nome e data de nascimento gerados aleatoriamente através do npm usando o axios, 

const axios = require('axios')

const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

conexao.query(sql, async (erro, resultadWos) => {
    const atendimento = resultados[0]
    const cpf = atendimento.cliente
    if (erro) {
        res.status(400).json(erro)
    } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        // Api needs to be runin, to run it use node clientes.js on the servicos folder cmd

        atendimento.cliente = data

        res.status(200).json(atendimento)
    }
}) 