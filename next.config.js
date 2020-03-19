const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = withPlugins([[withSass]], {
    dir: './src',
    webpack: (config, opts) => {
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsWebpackPlugin())
        } else {
            config.resolve.plugins = [new TsconfigPathsWebpackPlugin()]
        }

        return config
    }
})