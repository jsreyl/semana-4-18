/* un Ejemplo  de como se veria la ruta listar - modelo del  servicio*/
const routerx = require('express-promise-router');
const serviciosController = require('../controllers/ServiciosController');
const auth = require('../middlewares/auth');

const router = routerx();

//router.get('/list', serviciosController.list);
//Request to api/auth/ returns a list of the users registered on the database
router.get('/list', serviciosController.list)

// api/auth/register, this is the function executed when a request is sent to /api/use/register
router.post('/add', auth.verificarVendedor, serviciosController.add)

router.put('/update', auth.verificarVendedor, serviciosController.update)
router.put('/activate', auth.verificarVendedor, serviciosController.activate)
router.put('/deactivate', auth.verificarVendedor, serviciosController.deactivate)

module.exports = router;