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
			acolhidoParam: req.body.acolhido
		})
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}

}

// exports.get = async function (req, res) {
// 	let response = null
// 	try {
// 		if (req.query.itemId) {
// 			response = await itemModel.readById(req.query.itemId)
// 		}
// 		else
// 			response = await itemModel.readAll()

// 		res.status(successStatus).json(response)
// 	} catch (error) {
// 		res.status(error.code).json(error.message)
// 	}

// }

// exports.put = async function (req, res) {
// 	let response = null
// 	try {
// 		response = await itemModel.update(req.body)
// 		res.status(successStatus).json(response)
// 	} catch (error) {
// 		res.status(error.code).json(error.message)
// 	}

// }

// exports.delete = async function (req, res) {
// 	try {
// 		let response = await itemModel.destroy(req.query.itemId)
// 		res.status(successStatus).json(response)
// 	} catch (error) {
// 		res.status(error.code).json(error.message)
// 	}
// }