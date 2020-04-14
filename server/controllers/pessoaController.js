const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
    let response = null
    try {
        response = await models.Pessoa.adiciona(models, null, {
            pessoa: {
                rg: req.body.pessoa.rg,
                estado_civil: req.body.pessoa.estado_civil,
                cpf: req.body.pessoa.cpf,
                sexo: req.body.pessoa.sexo,
                nacionalidade: req.body.pessoa.nacionalidade,
                naturalidade: req.body.pessoa.naturalidade,
                situacao_profissional: req.body.pessoa.situacao_profissional,
                escolaridade: req.body.pessoa.escolaridade,
                nome: req.body.pessoa.nome,
                data_nascimento: req.body.pessoa.data_nascimento
            },
            endereco: req.body.endereco,
            cidade: req.body.cidade,
			bairro: req.body.bairro
        })
        res.status(successStatus).json(response)
    } catch (error) {
        console.log("\n", error, "\n")
        res.status(error.code).json(error.message)
    }
}

exports.get = async function (req, res) {
    let response = null
    try {
        if (req.query.id)
            response = await models.Pessoa.pesquisa(req.query.id)
        else
            response = await models.Pessoa.lista()

        res.status(successStatus).json(response)
    } catch (error) {
        console.log("\n", error, "\n")
        res.status(error.code).json(error.message)
    }
}

exports.put = async function (req, res) {
    let response = null
    try {
        response = await models.Pessoa.edita(models, null, {
            pessoa: {
                id: req.body.pessoa.id,
                rg: req.body.pessoa.rg,
                estado_civil: req.body.pessoa.estado_civil,
                cpf: req.body.pessoa.cpf,
                sexo: req.body.pessoa.sexo,
                nacionalidade: req.body.pessoa.nacionalidade,
                naturalidade: req.body.pessoa.naturalidade,
                situacao_profissional: req.body.pessoa.situacao_profissional,
                escolaridade: req.body.pessoa.escolaridade,
                nome: req.body.pessoa.nome,
                data_nascimento: req.body.pessoa.data_nascimento
            },
            endereco: req.body.endereco,
            cidade: req.body.cidade,
			bairro: req.body.bairro
        })

        res.status(successStatus).json(response)
    } catch (error) {
        console.log("\n", error, "\n")
        res.status(error.code).json(error.message)
    }
}

exports.delete = async function (req, res) {
    try {
        let response = await models.Pessoa.deleta(req.query.id)
        res.status(successStatus).json(response)
    } catch (error) {
        console.log("\n", error, "\n")
        res.status(error.code).json(error.message)
    }
}