const models = require('../models')

var successStatus = 200

exports.post = async function (req, res) {
	let response = null

	try {
		let param = {
			pessoaParam: 		req.body.Pessoa,
			acolhidoParam: 		req.body.Acolhido,
			familiaresParam: 	req.body.Acolhido.Familiares
		}
		
		if(req.body.Pessoa.Endereco){
			param.enderecoParam = req.body.Pessoa.Endereco
			param.cidadeParam = req.body.Pessoa.Endereco.Cidade.nome
			param.bairroParam = req.body.Pessoa.Endereco.Bairro.nome
		}
		
		if(req.body.Pessoa.Religiao)
			param.religiaoParam = req.body.Pessoa.Religiao.nome


		response = await models.Acolhido.adiciona(models, param)
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
			pessoaParam: 		req.body.Pessoa,
			enderecoParam: 		req.body.Pessoa.Endereco,
			cidadeParam: 		req.body.Pessoa.Endereco.Cidade.nome,
			bairroParam: 		req.body.Pessoa.Endereco.Bairro.nome,
			religiaoParam: 		req.body.Pessoa.Religiao.nome,
			acolhidoParam: 		req.body.Acolhido,
			familiaresParam: 	req.body.Acolhido.Familiares
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