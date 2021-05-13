const { restart } = require('nodemon')
const Pet = require('../models/pets')
// Getting the Atendimento object from the models

module.exports = app => {

    app.post('/pets', (req, res) => {
        const pet = req.body
        // takes the data from the body
        Pet.adiciona(pet, res)
        // Uses the data to add a new atendimento  
    })

    app.post('/petsTeste', (req, res) => {
        const pet = req.body
        // takes the data from the body
        Pet.adicionaTeste(pet, res)
        // Uses the data to add a new atendimento  
    })

    app.get('/pets', (req, res) => {
        Pet.lista(res)
    })

    app.get('/pets/:id', (req, res) => {
        const id = parseInt(req.params.id)
        // Turns user data into number

        Pet.buscaPorId(id,res)
    })

    app.patch('/pets/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Pet.altera(id,valores,res)
    })

    app.delete('/pets/:id', (req,res) => {
        const id = parseInt(req.params.id)
        
        Pet.deleta(id,res)
    })
} 