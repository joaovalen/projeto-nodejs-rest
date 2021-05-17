const axios = require('axios')
const moment = require('moment')
// biblioteca para lidar com datas
const { restart } = require('nodemon')
// Nodemon
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    // Creating the Atendimento object and its functions
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
        // DUVIDA! Como essa parte funciona
        const existemErros = erros.length 

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            // DUVIDAAAA Aqui criamos um array contendo as novas informações, pq os 3 pontos antes???
            // destructure pega o objeto original e adiciona os 2 campos novos 

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, erro => {
                if(erro) {
                    res.status(400).json(erro)
                    // error 400 stands for client side error, meaning the user did something wrong
                } else {
                    res.status(201).json(atendimento)
                    // using httpstatuses.com we can inform better the error or success
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            const atendimento = resultados
            //const cpf = atendimento.cliente
            // Returning the object itself and not an array with only one object as resultado would return
            if(erro) {
                res.status(400).json(erro)
            } else {
                //const {data} = await axios.get(`https://localhost:8082/${cpf}`)
                // Using an simulated external API to get data based on the cpf
                //atendimento.cliente = data
                // Adicionamos o nome do cliente e data de nascimento baseado no cpf
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