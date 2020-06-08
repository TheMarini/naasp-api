const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null

	try {
		response = await models.Acolhido.adiciona(models, {
			pessoaParam: 		req.body.pessoa,
			enderecoParam: 		req.body.pessoa.endereco,
			cidadeParam: 		req.body.pessoa.endereco.cidade.nome,
			bairroParam: 		req.body.pessoa.endereco.bairro.nome,
			acolhidoParam: 		req.body.acolhido,
			religiaoParam: 		req.body.acolhido.religiao.nome,
			familiaresParam: 	req.body.acolhido.familiares,
			medicamentosParam: 	req.body.acolhido.medicamentos,
			doencaFamiliaParam: req.body.acolhido.doencaFamilia
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
			response = await models.Acolhido.pesquisa(models, req.query.id)
		else
			response = await models.Acolhido.lista(models)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.put = async function (req, res) {
	let response = null
	try {
		response = await models.Acolhido.edita(models, {
			pessoaParam: 		req.body.pessoa,
			enderecoParam: 		req.body.pessoa.endereco,
			cidadeParam: 		req.body.pessoa.endereco.cidade.nome,
			bairroParam: 		req.body.pessoa.endereco.bairro.nome,
			acolhidoParam: 		req.body.acolhido,
			religiaoParam: 		req.body.acolhido.religiao.nome,
			familiaresParam: 	req.body.acolhido.familiares,
			medicamentosParam: 	req.body.acolhido.medicamentos,
			doencaFamiliaParam: req.body.acolhido.doencaFamilia
		})

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

exports.postReligiao = async function (req, res) {
	let response = null
	try {
		response = await models.Religiao.adiciona(req.body.nome, null)
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}

}

exports.getReligiao = async function (req, res) {
	let response = null
	try {
		if (req.query.id)
			response = await models.Religiao.pesquisa(req.query.id)
		else
			response = await models.Religiao.lista()

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.putReligiao = async function (req, res) {
	let response = null
	try {
		response = await models.Religiao.edita(req.body.id, req.body.nome)

		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}

exports.deleteReligiao = async function (req, res) {
	try {
		let response = await models.Religiao.deleta(req.query.id)
		res.status(successStatus).json(response)
	} catch (error) {
		console.log("\n", error, "\n")
		res.status(error.code).json(error.message)
	}
}