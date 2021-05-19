// Models - Regras de negócio

// Tools import
const moment = require('moment')
// Files import
// comentário só pra upar dnv
const repositorio = require('../repositorios/atendimento.js')

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => {
            console.log(data + " e a data criação: " +dataCriacao)
            return moment(data).isSameOrAfter(dataCriacao,'year')
        }
            
        // Basicamente aqui dentro você está recebendo um objeto
        // Logo, o que você está comparando com >= 5 é um objeto, não um número
        // Algo como { tamanho: 5 } >= 5
        // O que sempre retorna false
        // No caso, dentro desse objeto você tem a propriedade tamanho
        // Você pode receber o objeto e pegar a propriedade tamanho dele assim
        // (campo) => campo.tamanho >= 5
        // Ou pegar direto como parâmetro o tamanho usando destructuring, assim
        // ({ tamanho }) => tamanho >= 5
        // FUNÇÃO ANTIGA this.clienteEhValido = (tamanho) => tamanho >= 5
        // PS.: sugiro por ora criar as funções usando chaves, assim
        this.clienteEhValido = campo => {
        return campo.tamanho >= 5
        }
        // Porque aí fica mais fácil de debuggar, por exemplo
        // this.clienteEhValido = campo => {
        //   console.warn('campo', campo)
        //   return campo.tamanho >= 5
        // }
        // Pra ver o que tem dentro do campo
        // Só lembra que usando chaves, você tem que lembrar de dar return

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