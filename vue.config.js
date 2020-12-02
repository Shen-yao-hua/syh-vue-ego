module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3060',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}