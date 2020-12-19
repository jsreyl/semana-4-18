/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth');

const router = routerx();

//router.get('/list', articuloController.list);
//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', auth.verifyUsuario, categoriaController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', auth.verifyUsuario, categoriaController.add)

router.put('/update', auth.verifyUsuario, categoriaController.update)
router.put('/activate', auth.verifyUsuario, categoriaController.activate)
router.put('/deactivate', auth.verifyUsuario, categoriaController.deactivate)



module.exports = router;