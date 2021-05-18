// Controlers são responsáveis por falar para onde vamos enviar o usuário dependendo da rota que ele chega
// Além disso o controler responde o cliente, é o nosso intermediário entre as duas partes
// Validações de segurança são feitas aqui pois não afetam nossas regras de negócio
const Atendimento = require('../models/atendimentos')

module.exports = app => {

    // GET 
    app.get('/atendimentos', (req,res) => {
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            // res.json sends http status 200 by default
            .catch(erros => res.status(400).json(erros))
    })

    // GET/:id
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        // Turns URL data into an Integer
        Atendimento.buscaPorId(id,res)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    // POST
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erros => res.status(400).json(erros))  
    })

    // PATCH
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id,valores)
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    // DELETE
    app.delete('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        
        Atendimento.deleta(id,res)
            .then(resultados => res.status(202).json(resultados))
            .catch(erros => res.status(400).json(erros))
    })
} 