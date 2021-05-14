const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')

class Pet {
    adicionaTeste(pet,res) {
        const sql = 'INSERT INTO Pets SET ?'
            
        conexao.query(sql, pet, erro => {
                if(erro) {
                    res.status(400).json(erro)
                    // error 400 stands for client side error, meaning the user did something wrong
                } else {
                    res.status(201).json(pet)
                    // using httpstatuses.com we can inform better the error or success
                }
            })
    }

    adiciona(pet, res) {
        uploadDeArquivo(pet.imagem, pet.nome, (erro, finalPath) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                const novoPet = {nome: pet.nome, imagem: finalPath}
                 // receives the final Path for the image 
                const sql = 'INSERT INTO Pets SET ?'
                conexao.query(sql, novoPet, erro => {
                    if(erro) {
                        res.status(400).json(erro)
                        // error 400 stands for client side error, meaning the user did something wrong
                    } else {
                        res.status(201).json(novoPet)
                        // using httpstatuses.com we can inform better the error or success
                    }
                })
            } 
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM Pets'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = 'SELECT * FROM Pets WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            const pet = resultados[0]
            // Returning the object itself and not an array with only one object as resultado would return
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(pet)
            }
        })
    }

    altera(id, valores, res) {

        const sql = 'UPDATE Pets SET ? WHERE id = ?'

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
        const sql = 'DELETE FROM Pets WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Pet