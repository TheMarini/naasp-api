const express = require('express');
const router = express.Router();
const moment = require('moment')

// const itemController = require('./ItemController')
const voluntarioController = require('./voluntarioController')
const acolhidoController = require('./acolhidoController')


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

// ROTAS DO DOACAO
// router.get('/doacao/dia', doacaoController.readByDay)

// router.get('/doacao', doacaoController.get)

// router.post('/doacao', doacaoController.post)

// router.put('/doacao', doacaoController.put)

// router.delete('/doacao', doacaoController.delete)



module.exports = router;