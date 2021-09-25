// const gulp = require('gulp');

const rollup = require('rollup');
const { getBabelOutputPlugin } = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve').default;
const rollupTypescript = require('@rollup/plugin-typescript');
const path = require('path')
const postcss = require('rollup-plugin-postcss');

const rootDir = __dirname;

// see below for details on the options

/**
 * @type {rollup.RollupOptions}
 */
const inputOptions = {
	input: path.resolve(rootDir, '../template/src/index.tsx'),
	plugins: [
		resolve(),
		rollupTypescript({
			tsconfig: path.resolve(rootDir, '../template/tsconfig.json')
		}),
		postcss(
			{
				extract: true,
			}
		)
	],
	external(id) {
		return id.indexOf('node_modules') >= 0;
	}
};
/**
 * @type {rollup.OutputOptions}
 */
const outputOptions = {
	dir: path.resolve(rootDir, '../template/es'),
	format: 'es',
	plugins: [getBabelOutputPlugin({
		plugins: ["@babel/plugin-transform-modules-systemjs"]
	})]
};

async function build() {
	// create a bundle
	const bundle = await rollup.rollup(inputOptions);

	console.log(bundle.watchFiles); // an array of file names this bundle depends on

	// generate output specific code in-memory
	// you can call this function multiple times on the same bundle object
	const { output } = await bundle.generate(outputOptions);

	for (const chunkOrAsset of output) {
		if (chunkOrAsset.type === 'asset') {
			// For assets, this contains
			// {
			//   fileName: string,              // the asset file name
			//   source: string | Uint8Array    // the asset source
			//   type: 'asset'                  // signifies that this is an asset
			// }
			console.log('Asset', chunkOrAsset);
		} else {
			console.log(chunkOrAsset.imports)
			// For chunks, this contains
			// {
			//   code: string,                  // the generated JS code
			//   dynamicImports: string[],      // external modules imported dynamically by the chunk
			//   exports: string[],             // exported variable names
			//   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
			//   fileName: string,              // the chunk file name
			//   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
			//   imports: string[],             // external modules imported statically by the chunk
			//   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
			//   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
			//   isEntry: boolean,              // is this chunk a static entry point
			//   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
			//   map: string | null,            // sourcemaps if present
			//   modules: {                     // information about the modules in this chunk
			//     [id: string]: {
			//       renderedExports: string[]; // exported variable names that were included
			//       removedExports: string[];  // exported variable names that were removed
			//       renderedLength: number;    // the length of the remaining code in this module
			//       originalLength: number;    // the original length of the code in this module
			//       code: string | null;       // remaining code in this module
			//     };
			//   },
			//   name: string                   // the name of this chunk as used in naming patterns
			//   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
			//   type: 'chunk',                 // signifies that this is a chunk
			// }
			console.log('Chunk', chunkOrAsset.modules);
		}
	}

	// or write the bundle to disk
	await bundle.write(outputOptions);

	// closes the bundle
	//   await bundle.close();
}

build();