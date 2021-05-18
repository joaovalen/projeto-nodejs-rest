// Controlers são responsáveis por falar para onde vamos enviar o usuário dependendo da rota que ele chega
// Além disso o controler responde o cliente, é o nosso intermediário entre as duas partes
// Validações de segurança são feitas aqui pois não afetam nossas regras de negócio
const { restart } = require('nodemon')
const Atendimento = require('../models/atendimentos')
// Getting the Atendimento object from the models

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })
    // Listening for GET

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        // Turns user data into number

        Atendimento.buscaPorId(id,res)
    })
    // Search using ID

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        // takes the data from the body

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => 
                res.status(201).json(atendimentoCadastrado)
            )
            .catch(erro => 
                res.status(400).json(erros))
        // Uses the data to add a new atendimento  
    })
    // Listening for POST

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id,valores,res)
    })

    app.delete('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        
        Atendimento.deleta(id,res)
    })
} 