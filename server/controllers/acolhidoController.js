const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null
	try {
		response = await models.Acolhido.adiciona(models, {
			endereco: req.body.endereco,
			cidade: req.body.cidade,
			bairro: req.body.bairro,
			pessoa: req.body.pessoa,
			religiao: req.body.religiao,
			acolhidoParam: req.body.acolhido,
			familiares: req.body.familiares,
			medicamentos: req.body.medicamentos,
			doencaFamilia: req.body.doencaFamilia
		})
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}

}

exports.getFull = async function (req, res) {
	let response = null
	try {
		response = await models.Acolhido.pesquisaAcolhidoCompleto(models, req.query.id)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}

}

exports.get = async function (req, res) {
	let response = null
	try {
		if(req.query.id)
			response = await models.Acolhido.pesquisa(req.query.id)
		else
			response = await models.Acolhido.lista()

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.put = async function (req, res) {
	let response = null
	try {
		if(req.query.id)
			response = await models.Acolhido.atualiza(req.query.id)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.delete = async function (req, res) {
	try {
		let response = await models.Acolhido.deleta(req.query.id)
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}