var path = require("path");
var config = {
    entry: {
        content: "./src/content/index.tsx",
        popup: "./src/popup/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js",
        publicPath: "/output"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        // alias: {
        //     'react': 'preact/compat',
        //     'react-dom': 'preact/compat'
        // },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less?$/,
                use: ["style-loader", "css-loader", "less-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    mode: "development",
    devServer: {
        contentBase: "./testing/test-sites/simple",
        publicPath: "/output",
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        historyApiFallback: true,
        index: "index.html"
    }
}

module.exports = config;