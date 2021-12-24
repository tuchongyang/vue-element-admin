const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/assets/scss/variable.scss';
          @import '@/assets/scss/mixins.scss';
        `,
      },
    },
  },
})
