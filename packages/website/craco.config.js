const CracoLessPlugin = require('craco-less');
const cracoModuleFederation = require('craco-module-federation');


module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: cracoModuleFederation
    }
  ],
};
