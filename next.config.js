const withSass = require('@zeit/next-sass')
const withPWA = require('next-offline')
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = withSass(withPWA({
    dir: './src',
    webpack: (config, opts) => {
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsWebpackPlugin())
        } else {
            config.resolve.plugins = [new TsconfigPathsWebpackPlugin()]
        }

        return config
    }
}))