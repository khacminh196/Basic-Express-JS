var dotenv = require('dotenv').config();

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var port = 3000;

var userRouter = require('./Routers/user.router');
var productRouter = require('./Routers/product.router');
var authRouter = require('./Routers/auth.router');
var cartRouter = require('./Routers/cart.router');

var loginMiddlewares = require('./middlewares/userLogin.middleware');
var cookieParser = require('cookie-parser');
var sessionMiddlewares = require('./middlewares/session.middleware');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'))
app.use(sessionMiddlewares);

app.set('view engine', 'pug');
app.set('Views', './Views');

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/users',loginMiddlewares, userRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
	console.log("Server listening on port", port);
});