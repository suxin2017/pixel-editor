const CracoLessPlugin = require('craco-less');
const { ModuleFederationPlugin } = require('webpack').container;
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
