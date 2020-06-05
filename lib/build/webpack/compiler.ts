import * as webpack from 'webpack';
import { Configuration, Stats } from 'webpack';
import { Environment } from '../../config';

const compilerHandler = (err: Error, stats: Stats): void => {
    if (err) {
        const reason = err?.toString()
        if (reason) {
            throw new Error(reason)
        } else {
            throw new Error(`There was an error when running the webpack compiler: ${err}`);
        }
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
    }));
}

export const compile = (config: Configuration, env: Environment): void => {
    const compiler = webpack(config);
    if (env === Environment.DEVELOPMENT) {
        compiler.watch({ ignored: /node_modules/ }, compilerHandler);
    } else {
        compiler.run(compilerHandler);
    }
}