const { dependencies } = require('./package.json');

module.exports = {
	name: 'remote',
	exposes: {
		'./Button': './src/App',
	},
	remotes: {
		remote: 'remote@http://localhost:3002/remoteEntry.js',
	},
	filename: 'remoteEntry.js',
	shared: {
		// ...dependencies,
		react: {
			singleton: true,
			//   requiredVersion: dependencies['react'],
		},
		'react-dom': {
			singleton: true,
			//   requiredVersion: dependencies['react-dom'],
		},
	},
};