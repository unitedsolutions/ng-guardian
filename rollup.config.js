export default {
  input: 'dist/ng-guardian.js',
  name: 'ngGuardian',
  output: {
    file: 'dist/ng-guardian.umd.js',
    format: 'umd'
  },
  sourceMap: false,
  globals: {
    'lodash': '_',
    'rxjs': 'Rx',
    'ng-http-client-plus': 'ngHttpClientPlus',
    '@angular/core': 'ng.core',
    '@angular/router': 'ng.router'
  },
  external: [
    'lodash',
    'rxjs',
    'ng-http-client-plus',
    '@angular/core',
    '@angular/router'
  ]  
};
