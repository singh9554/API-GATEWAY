const express = require('express');

const rateLimit  = require('express-rate-limit')

const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 10, //  Limit each IP to 100 requests per `window` (here, per 2 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/flightService',createProxyMiddleware({
    target: serverConfig.FlightService,
    changeOrigin: true,
     pathRewrite: {'^/flightService' : '/'}
    }),);

app.use('/BookingService',createProxyMiddleware({
    target: serverConfig.BookingService,
    changeOrigin: true,
    pathRewrite: {'^/BookingService' : '/'}
}),);

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
