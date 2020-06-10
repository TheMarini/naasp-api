const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null
	try {
		response = await models.TentativaContato.adiciona(models, req.body)
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
			response = await models.TentativaContato.pesquisa(models, req.query.id)
		else if (req.query.acolhidoId)
            response = await models.TentativaContato.listaPorAcolhido(models, acolhidoId)
        else if (req.query.usuarioId)
            response = await models.TentativaContato.listaPorUsuario(models, usuarioId)
        else 
            response = await models.TentativaContato.lista(models)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.put = async function (req, res) {
	let response = null
	try {
        response = await models.TentativaContato.edita(models, req.body)

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