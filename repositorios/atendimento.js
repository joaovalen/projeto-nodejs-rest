const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql, atendimento)
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos'
        return query(sql)
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ?`
        return query(sql,id)
    }

    altera(id, alteraçãoDatada) {
        const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`
        // ALTERAÇÃO NECESSÁRIA - MODIFICAR PARA NÃO SER SUJEITO A SQL INJECT
        return query(sql, alteraçãoDatada)
    }

    deleta(id) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        return query(sql, id)
    }
}

module.exports = new Atendimento()