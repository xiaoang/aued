exports.getUser = async (ctx, next) => {
    await ctx.render('./api/user', {
        title : 'xiaoang,info',
        userName: 'xiao ang',
        age: 30
  })
  /*ctx.body = {
    userName: 'xiao ang',
    age: 30
    }*/
}
exports.registerUser = async (ctx, next) => {
    ctx.body = {
        code : 1,
        message: 'welcome you register this web account',
        data:''
    }
}
