const Atendimento = require('../models/atendimentos')
// Getting the Atendimento object from the models

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        // takes the data from the body

        Atendimento.adiciona(atendimento, res)
        // Uses the data to add a new atendimento 
      
    })
} 