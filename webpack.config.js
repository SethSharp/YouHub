const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

//npx webpack --mode=development --watch

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "app.bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.(png|svg|jpg|gif)$/i,
                loader: 'file-loader',
                options: {outputPath: 'assets', esModule: false}
            }, {
                test: /\.html$/i,
                loader: "html-loader",
                options: {esModule: false},
            }, { 
                test: /\.handlebars$/, 
                loader: "handlebars-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin()
    ]
}