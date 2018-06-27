const router = require('koa-router')();
const userController = require('../../app/controllers/userController');

router.get('/', userController.getUser);

router.get('/getUser', userController.getUser);

router.post('/registerUser', userController.registerUser);

module.exports = router;
