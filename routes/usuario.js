/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const userController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

//router.get('/list', articuloController.list);
//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', auth.verificarVendedor, userController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/register', userController.register)

// api/auth/signin
router.post('/login', userController.login)

router.put('/update', auth.verificarAdministrador, userController.update)
router.put('/activate', auth.verificarAdministrador, userController.activate)
router.put('/deactivate', auth.verificarAdministrador, userController.deactivate)



module.exports = router;