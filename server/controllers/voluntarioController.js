const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null
	try {
		response = await models.Voluntario.adiciona(models, {
			pessoaParam: 				 req.body.Pessoa,
			enderecoParam:			  	 req.body.Pessoa.Endereco,
			cidadeParam: 				 req.body.Pessoa.Endereco.Cidade.nome,
			bairroParam: 				 req.body.Pessoa.Endereco.Bairro.nome,
			usuarioParam: 				 req.body.Voluntario.Usuario,
			especialidadeParam: 		 req.body.Voluntario.Especialidade.nome,
			faixaEtariaAtendimentoParam: req.body.Voluntario.FaixaEtariaAtendimento
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
			response = await models.Voluntario.pesquisa(models, req.query.id)
		else
			response = await models.Voluntario.lista(models)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.put = async function (req, res) {
	let response = null
	try {
		response = await models.Voluntario.edita(models, {
			pessoaParam: 				 req.body.Pessoa,
			enderecoParam:			  	 req.body.Pessoa.Endereco,
			cidadeParam: 				 req.body.Pessoa.Endereco.Cidade.nome,
			bairroParam: 				 req.body.Pessoa.Endereco.Bairro.nome,
			usuarioParam: 				 req.body.Voluntario.Usuario,
			especialidadeParam: 		 req.body.Voluntario.Especialidade.nome,
			faixaEtariaAtendimentoParam: req.body.Voluntario.FaixaEtariaAtendimento,
			voluntarioId:				 req.body.Voluntario.id
		})

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.delete = async function (req, res) {
	try {
		let response = await models.Voluntario.deleta(req.query.id)
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}