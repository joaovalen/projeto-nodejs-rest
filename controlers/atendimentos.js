const { restart } = require('nodemon')
const atendimentos = require('../models/atendimentos')
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

        Atendimento.adiciona(atendimento, res)
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