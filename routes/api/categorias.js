const router = require('express').Router();//To manage the routes
const categoriaController = require('../../controllers/CategoriaController.js') //Here are our methods
const auth = require('../../middlewares/auth')

//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', categoriaController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', categoriaController.add)

router.put('/update', auth.verificarAdministrador, categoriaController.update)
router.put('/activate', auth.verificarAdministrador, categoriaController.activate)
router.put('/deactivate', auth.verificarAdministrador, categoriaController.deactivate)

module.exports = router;