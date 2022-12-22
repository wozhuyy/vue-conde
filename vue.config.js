const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 如果部署到 github 的二级目录下 那么需要设置  publicPath
  // 在生产阶段公共路径修改为 /code/
  publicPath: process.env.NODE_ENV === 'production'
  ? '/code/'
  : '/'
})
