const { defineConfig } = require('@vue/cli-service')
const { ESLint } = require('eslint')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //代理
  // devServer: {
	//   proxy: {
	//     '/api': {
	//       target: "http://localhost:3000",
	//       changeOrigin: true,
	//       pathRewrite: {
	//         '^/api': '/api'
	//       }
	//     }
	//   },
	// },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'cell-font-size': '18px',
            'button-primary-background-color': '#f97745',
            'button-primary-border-color': '#f97745',
            'nav-bar-icon-color': '#969799',
            'nav-bar-arrow-size': '20px',
            'divider-margin': '10px',
          },
        },
      },
    },
  },
})
