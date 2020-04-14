const express = require('express');
const router = express.Router();
const moment = require('moment')

const voluntarioController = require('./voluntarioController')
const acolhidoController = require('./acolhidoController')
const pessoaController = require('./pessoaController')


var successStatus = 200


router.get('/', function (req, res) {
    res.status(successStatus).json({
        message: 'API NAASP',
        timestamp: moment().unix()
    })
})

// ROTAS DO ACOLHIDO
router.post('/acolhido', acolhidoController.post)

router.get('/acolhido/completo', acolhidoController.getFull)

router.get('/acolhido', acolhidoController.get)

router.put('/acolhido', acolhidoController.put)

router.delete('/acolhido', acolhidoController.delete)

// ROTAS DO VOLUNTÁRIO  
router.post('/voluntario', voluntarioController.post)

router.get('/voluntario/completo', voluntarioController.getFull)

router.get('/voluntario', voluntarioController.get)

router.put('/voluntario', voluntarioController.put)

router.delete('/voluntario', voluntarioController.delete)

// ROTAS DE PESSOA
router.post('/pessoa', pessoaController.post)

router.get('/pessoa', pessoaController.get)

router.put('/pessoa', pessoaController.put)

router.delete('/pessoa', pessoaController.delete)

// ROTAS DE ENDERECO
router.post('/endereco', pessoaController.postEndereco)

router.get('/endereco', pessoaController.getEndereco)

router.put('/endereco', pessoaController.putEndereco)

router.delete('/endereco', pessoaController.deleteEndereco)



module.exports = router;