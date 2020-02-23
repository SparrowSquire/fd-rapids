const app = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: __dirname + '/src',
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public'
    },
};

const lib = {
    entry: './src/rapids.js',
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'rapids.js'
    },
};

const libIntl = {
    entry: './src/rapids-intl.js',
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'rapids-intl.js'
    },
};

module.exports = [app, lib, libIntl];