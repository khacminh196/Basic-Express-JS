var dotenv = require('dotenv').config();

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var port = 3000;

var userRouter = require('./Routers/user.router');
var productRouter = require('./Routers/product.router');
var authRouter = require('./Routers/auth.router');
var loginMiddlewares = require('./middlewares/userLogin.middleware');
var cookieParser = require('cookie-parser');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'))

app.set('view engine', 'pug');
app.set('Views', './Views');

app.get('/', loginMiddlewares, (req, res) => {
	res.render('index');
});

app.use('/users',loginMiddlewares, userRouter);
app.use('/products', loginMiddlewares, productRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
	console.log("Server listening on port", port);
});