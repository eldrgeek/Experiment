import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const compiler = webpack(config as webpack.Configuration);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output?.publicPath as string,
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const apiProxy = createProxyMiddleware({ target: 'http://localhost:9000', changeOrigin: true });

app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        apiProxy(req, res, next);
    } else {
        next();
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});