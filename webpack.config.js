var path = require("path");

module.exports = {
    entry: "./app/Start.jsx",
    output: {
        path: "./public/js",
        filename: "app.js"
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.jsx$/,
            loader: "jsx-loader?insertPragma=React.DOM"
        }]
    },
    resolve: {
        fallback: [
            __dirname,
            path.join(__dirname, "app")
        ],
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    }
};