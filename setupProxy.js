const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',  // Substitua pelo endereço do seu servidor backend
      changeOrigin: true,
    })
  );
};
