import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import webpack from 'webpack';

interface Configuration extends WebpackConfiguration {
    devServer?: {
        contentBase: string;
        compress: boolean;
        port: number;
        proxy: { [key: string]: string };
    };
}

const config: Configuration = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './client/index.tsx'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': 'http://localhost:5000'
        }
    }
};

export default config;