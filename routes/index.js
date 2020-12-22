//Router Index
const router = require('express').Router();
//const { route } = require('./api/auth');
//One router manager per item in the route, i.e /api/auth, /api/users, /api/articles, etc.
const apiRouterUser = require('./api/user')
const apiRouterCategoria = require('./api/categorias')
const apiRouterArticulo = require('./api/articulos')
const servicioRouter = require('./api/servicio.js');

router.use('/usuario', apiRouterUser);
router.use('/articulo', apiRouterArticulo);
router.use('/categoria', apiRouterCategoria);
router.use('/servicio', servicioRouter);
//.com/api/auth
//.com/api/auth/signin

module.exports = router;