// Models - Regras de negócio

// Tools import
const axios = require('axios')
const { response } = require('express')
const moment = require('moment')
const { restart } = require('nodemon')
// Files import
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento.js')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        // moment() gets the time and format() sets it to Year-Month-Day
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        // takes the data field and its format inserted by the user and formats it to Year-Month-Day
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        // Checking if the assigned data is valid
        const clienteEhValido = atendimento.cliente.length >= 5
        // Checking if the client name is long enough 
        
        const validacoes = [
            // Creates and array with two objects 
            {
                nome: 'data',
                valido: dataEhValida,
                // boolean
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                // bolean
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length 
        if(existemErros) {
            return new Promise((resolve, reject) => reject(erros))
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            // destructure pega o objeto original e adiciona os 2 campos novos 

            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
        }
    }

    lista(res) {
        return repositorio.lista()
            .then(resultados => {
                return {atendimento}
            })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
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
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            // Returning the object itself and not an array with only one object as resultado would return
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores,id})
            }
        })
    }

    deleta(id,res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}
module.exports = new Atendimento 