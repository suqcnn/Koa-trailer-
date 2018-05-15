const Bundler = require('parcel-bundler')
const views = require('koa-views')
const stati = require('koa-static')
const {resolve} = require('path')

const r = path => resolve(__dirname, path)

const bundler = new Bundler(r('../../../index.html'), {
  publicUrl: '/',
  watch: true
})

export const dev = async app => {
  bundler.addAssetType('vue', 'parcel-plugin-vue/src/VueAsset');
  bundler.addPackager('js', 'parcel-plugin-vue/src/packagers/JSPackager');
  await bundler.bundle()
  
  app.use(stati(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })
  
  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}