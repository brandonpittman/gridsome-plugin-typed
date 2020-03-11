const {resolve} = require('path');

function TypescriptPlugin(api) {
  api.chainWebpack((config) => {
    config
      .resolve
      .extensions
      .prepend('.ts')
      .prepend('.tsx')

    const tsRule = config.module.rule('ts').test(/\.ts$/)
    const tsxRule = config.module.rule('tsx').test(/\.tsx$/)

    tsRule
      .use('babel-loader')
      .loader(require.resolve('babel-loader'))

    tsxRule
      .use('babel-loader')
      .loader(require.resolve('babel-loader'))

    tsRule
      .use('ts-loader')
      .loader(require.resolve('ts-loader'))
      .options({
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      });

    tsxRule
      .use('ts-loader')
      .loader(require.resolve('ts-loader'))
      .options({
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      });

    // make sure to append TSX suffix
    tsxRule.use('ts-loader').loader(require.resolve('ts-loader')).tap(options => {
      options = Object.assign({}, options)
      delete options.appendTsSuffixTo
      options.appendTsxSuffixTo = ['\\.vue$']
      return options
    })

    config
      .plugin('fork-ts-checker')
      .use(require('fork-ts-checker-webpack-plugin'), [{
        vue: true,
        // tslint: projectOptions.lintOnSave !== false && fs.existsSync(api.resolve('tslint.json')),
        // formatter: 'codeframe',
        // // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
        // checkSyntacticErrors: useThreads
      }])


    config.resolve.alias
      .set('vue$', resolve(process.cwd(), './node_modules/vue/dist/vue.esm.js'));
  });
}

module.exports = TypescriptPlugin;
