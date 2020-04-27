const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null
	try {
		response = await models.Voluntario.adiciona(models, {
			endereco: req.body.endereco,
			cidade: req.body.cidade,
			bairro: req.body.bairro,
			pessoa: req.body.pessoa,
			especialidade: req.body.especialidade
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
		response = await models.Voluntario.pesquisaVoluntarioCompleto(models, req.query.id)

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
			response = await models.Voluntario.pesquisa(req.query.id)
		else
			response = await models.Voluntario.lista()

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
			endereco: req.body.endereco,
			cidade: req.body.cidade,
			bairro: req.body.bairro,
			pessoa: req.body.pessoa,
			especialidade: req.body.especialidade,
			voluntarioId: req.body.voluntarioId
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