const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null
	try {
		response = await models.Voluntario.adiciona(models, {
			pessoaParam: 				 req.body.pessoa,
			enderecoParam:			  	 req.body.pessoa.endereco,
			cidadeParam: 				 req.body.pessoa.endereco.cidade.nome,
			bairroParam: 				 req.body.pessoa.endereco.bairro.nome,
			usuarioParam: 				 req.body.voluntario.usuario,
			especialidadeParam: 		 req.body.voluntario.especialidade.nome,
			faixaEtariaAtendimentoParam: req.body.voluntario.faixaEtariaAtendimento
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
			pessoaParam: 				 req.body.pessoa,
			enderecoParam:			  	 req.body.pessoa.endereco,
			cidadeParam: 				 req.body.pessoa.endereco.cidade.nome,
			bairroParam: 				 req.body.pessoa.endereco.bairro.nome,
			usuarioParam: 				 req.body.voluntario.usuario,
			especialidadeParam: 		 req.body.voluntario.especialidade.nome,
			faixaEtariaAtendimentoParam: req.body.voluntario.faixaEtariaAtendimento
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