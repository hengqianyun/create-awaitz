import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // 入口文件
  entries: ['src/index'],
  clean: true,
  // 生成ts声明文件
  declaration: false,
  // 警告是否会引发报错
  failOnWarn: false,
  // rollup配置
  rollup: {
    // 生成cjs
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      // 压缩代码
      minify: true,
    },
    resolve: {
      exportConditions: ['node'],
    },
  },
})