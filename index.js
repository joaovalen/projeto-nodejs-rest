const customExpress = require('./config/customExpress')
// imports express

const conexao = require('./infraestrutura/database/conexao')
// imports the db conection file

const Tabelas = require('./infraestrutura/database/tabelas')

// tries connecting to the db using conect() trought our conexao file data
conexao.connect((erro) => {
    if(erro){
        console.log(erro)
    } else {
        console.log('conectado com sucesso')

        Tabelas.init(conexao)

        const app = customExpress()
        // creates app const using customExpress

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
        // sets the app to listening 
    }
})
// tries connecting 



