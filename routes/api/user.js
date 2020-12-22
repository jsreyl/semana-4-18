//The authentication component of the api, here is the logic (the methods) of this part of the page
const router = require('express').Router();//To manage the routes
const userController = require('../../controllers/UserController.js') //Here are our methods
const auth = require('../../middlewares/auth')

//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', userController.list) // Use  auth.verificarVendedor, as second argument to pass a token

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/register', userController.register)

// api/auth/signin
router.post('/login', userController.login)

router.put('/update', auth.verificarAdministrador, userController.update)
router.put('/activate', auth.verificarAdministrador, userController.activate)
router.put('/deactivate', auth.verificarAdministrador, userController.deactivate)

module.exports = router;