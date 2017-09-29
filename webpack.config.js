let webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: './src/ng-guardian.ts',

  output: {
    path: './dist',
    publicPath: '/',
    filename: 'ng-guardian.umd.js',
    library: 'ngGuardian',
    libraryTarget: 'umd'
  },

  externals: {
    'lodash': {
      root: '_', 
      commonjs: 'lodash', 
      commonjs2: 'lodash', 
      amd: 'lodash'
    },
    'rxjs': {
      root: 'Rx',
      commonjs: 'rxjs',
      commonjs2: 'rxjs',
      amd: 'rxjs'
    },
    'ng-http-client-plus': {
      root: 'ngHttpClientPlus',
      commonjs: 'ng-http-client-plus',
      commonjs2: 'ng-http-client-plus',
      amd: 'ng-http-client-plus'
    },
    '@angular/core': {
      root: ['ng', 'core'], 
      commonjs: '@angular/core', 
      commonjs2: '@angular/core', 
      amd: '@angular/core'
    },
    '@angular/router': {
      root: ['ng', 'router'],
      commonjs: '@angular/router',
      commonjs2: '@angular/router',
      amd: '@angular/router'
    }
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader'
    }]
  },

  plugins: [
    // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, './src')
  ]
};
