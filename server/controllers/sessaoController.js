const models = require('../models')

var successStatus = 200

exports.post = async function (req) {
	console.log(req)

	let response = null
	try {
		response = await models.Sessao.adiciona(models, {
			dataInicioSessao: req.dataInicioSessao,
			horaInicioSessao: req.horaInicioSessao,
			dataTerminoSessao: req.dataTerminoSessao,
			horaTerminoSessao: req.horaTerminoSessao,
			observacao: req.observacao,
			presenca: req.presenca,
			acolhidoId: req.AcolhidoId,
			voluntarioId: req.VoluntarioId,
			salaNome: req.salaNome
		})
		// res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		// res.status(error.code).json(error.message)
	}

}
exports.get = async function (req) {
	let response = null
	try {
		response = await models.Sessao.lista(models)
		return response;
		// res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		// res.status(error.code).json(error.message)
	}
}

exports.delete = async function (req) {
	try {
		let response = await models.Sessao.deleta(req.id)
		return response;
		// res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		// res.status(error.code).json(error.message)
	}
}
