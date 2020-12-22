const router = require('express').Router();//To manage the routes
const articuloController = require('../../controllers/ArticuloController.js') //Here are our methods
const auth = require('../../middlewares/auth')

//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', articuloController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', articuloController.add)

router.put('/update', auth.verificarAdministrador, articuloController.update)
router.put('/activate', auth.verificarAdministrador, articuloController.activate)
router.put('/deactivate', auth.verificarAdministrador, articuloController.deactivate)

module.exports = router;