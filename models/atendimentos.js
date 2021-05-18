// Models - Regras de negócio

// Tools import
const moment = require('moment')
// Files import
// comentário só pra upar dnv
const repositorio = require('../repositorios/atendimento.js')

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    
    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format(
            'YYYY-MM-DD HH:MM:SS'
        )

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        // NAME VALIDATION NOT WORKING
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado).then(resultados => {
                const id = resultados.insertId
                return { ...atendimento, id }
            })
        }
    }

    altera(id, valores) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
            const parametros = {
                data: {data, dataCriacao},
                cliente: {tamanho: valores.cliente.length}
            }
            const erros = this.valida(parametros)
            const existemErros = erros.length 
    
            if(existemErros) {
                return new Promise((reject) => reject(erros))
            } else {
                const alteraçãoDatada = {...valores,dataCriacao,data}
                
                return repositorio.altera(id, alteraçãoDatada)
                    .then(resultados => {
                        return {...valores, id}
                    })
            }
    }

    deleta(id) {
        return repositorio.deleta(id)
            .then(resultados => {
                return ("Deletado atendimento de id: " + id)
            })
    }

}

module.exports = new Atendimento 