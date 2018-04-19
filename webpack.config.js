const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 })

const isDev = process.env.NODE_ENV !== 'production'

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',

    output: {
        filename: 'cms.[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader?modules=true&localIdentName=[path][name]__[local]--[hash:base64:4]',
                    'stylus-loader'
                ],
                exclude: { or: [ /node_modules/, /global/ ] }
            }, {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ],
                include: [ path.join(__dirname, './src/styles/global') ]
            }, {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|ogg)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            _: 'lodash'
        }),

        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true
        }),

        // new HappyPack({
        //     id: 'js',
        //     threadPool: happyThreadPool,
        //     loaders: [ 'babel-loader' ]
        // }),

        // new HappyPack({
        //     id: 'stylus',
        //     threadPool: happyThreadPool,
        //     loaders: [
        //         'style-loader',
        //         'css-loader?modules=true&localIdentName=[path][name]__[local]--[hash:base64:4]',
        //         'stylus-loader'
        //     ]
        // })
    ],

    stats: {
        children: false
    },

    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, './src'),
            path.join(__dirname, './node_modules')
        ],
        alias: {
            common: path.join('common'),
            constant: path.join('constants'),
            container: path.join('containers'),
            component: path.join('components'),
            style: path.join('styles'),
            image: path.join('images')
        }
    }
}

if (isDev) {
    config.devtool = 'cheap-module-source-map'

    config.plugins.push(new CopyWebpackPlugin([{ from: 'mock', to: 'mock' }]))

    config.devServer = {
        proxy: {
            '/~': {
                target: 'http://localhost:8080',
                router: req => req.url.split('/')[1].replace('~', 'http://'),
                pathRewrite: path => path.replace(/^\/~[^\/]+/, '')
            },
            '/mock': {
                target: 'http://localhost:8080',
                onProxyReq: req => {
                    req.method = 'GET'
                    req.setHeader('Access-Control-Allow-Origin', true)
                }
            }
        }
    }
}

module.exports = config