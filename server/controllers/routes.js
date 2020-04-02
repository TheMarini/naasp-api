const express = require('express');
const router = express.Router();
const moment = require('moment')

// const itemController = require('./ItemController')
// const entidadeController = require('./entidadeController')
const acolhidoController = require('./acolhidoController')


var successStatus = 200


router.get('/', function (req, res) {
    res.status(successStatus).json({
        message: 'API NAASP',
        timestamp: moment().unix()
    })
})

// ROTAS DO ITEM
router.post('/acolhido', acolhidoController.post)

router.get('/acolhido/completo', acolhidoController.getFull)

router.get('/acolhido', acolhidoController.get)

router.put('/acolhido', acolhido.put)

router.delete('/acolhido', acolhidoController.delete)

// ROTAS DO ENTIDADE
// router.get('/entidade/sentido', entidadeController.getBySentido)

// router.get('/entidade', entidadeController.get)

// router.post('/entidade', entidadeController.post)

// router.put('/entidade', entidadeController.put)

// router.delete('/entidade', entidadeController.delete)


// ROTAS DO DOACAO
// router.get('/doacao/dia', doacaoController.readByDay)

// router.get('/doacao', doacaoController.get)

// router.post('/doacao', doacaoController.post)

// router.put('/doacao', doacaoController.put)

// router.delete('/doacao', doacaoController.delete)



module.exports = router;