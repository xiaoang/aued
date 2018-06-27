const router = require('koa-router')()
const userRouter = require('./userRouter');

router.use('/api/students', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
