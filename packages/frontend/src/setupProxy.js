const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target: 'http://backend:1337',
            changeOrigin: true
        })
    );
};
