/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();

//router.get('/list', articuloController.list);
//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', auth.verificarVendedor, articuloController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', auth.verificarVendedor, articuloController.add)

router.put('/update', auth.verificarVendedor, articuloController.update)
router.put('/activate', auth.verificarVendedor, articuloController.activate)
router.put('/deactivate', auth.verificarVendedor, articuloController.deactivate)

module.exports = router;