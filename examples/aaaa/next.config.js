const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[local]_[hash:base64:5]',
	},
	// webpack: config => {
	//   // Fixes npm packages that depend on `fs` module
	//   config.node = {
	//     fs: 'empty'
	//   }

	//   return config
	// }
})
