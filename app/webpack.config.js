
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'index.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        port:3005
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                exclude:[/node_modules/],
                use: [
                    {
                        loader:'style-loader',
                        options: { esModule: false },
                    },
                    {
                        loader:'css-loader',
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    'autoprefixer',
                                ],
                            },
                        },
                    },
                    {
                        loader:'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|j?g|gif)?$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: ['babel-loader', '@svgr/webpack']
            }
        ]
    },
    resolve: {
        extensions:['.js','.jsx','css','scss'],
        mainFields:['browser','main','module'],
        alias: {
            pages: path.resolve(__dirname,'./pages'),
            styles: path.resolve(__dirname,'./styles'),
            icons: path.resolve(__dirname,'./icons'),
        },
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'public/index.html' ),
            filename: 'index.html'
        })
    ]
};