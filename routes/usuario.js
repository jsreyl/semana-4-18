/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const userController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

//router.get('/list', articuloController.list);
//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', auth.verifyUsuario, userController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', auth.verifyUsuario, userController.register)

// api/auth/signin
router.post('/login', userController.login)

router.put('/update', auth.verifyUsuario, userController.update)
router.put('/activate', auth.verifyUsuario, userController.activate)
router.put('/deactivate', auth.verifyUsuario, userController.deactivate)



module.exports = router;