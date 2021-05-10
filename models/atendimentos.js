const moment = require('moment')
// biblioteca para lidar com datas
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    // Creating the Atendimento object and its add function
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        // moment() gets the time and format() sets it to Year-Month-Day
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        // takes the data field and its format inserted by the user and formats it to Year-Month-Day
        const atendimentoDatado = {...atendimento, dataCriacao, data}

        
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                // error 400 stands for client side error, meaning the user did something wrong
            } else {
                res.status(201).json(resultados)
                // using httpstatuses.com we can inform better the error or success
            }
        })
    }
}

module.exports = new Atendimento 