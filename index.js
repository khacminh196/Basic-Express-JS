var express = require('express');
var app = express();
var port = 3000;

var userRouter = require('./Routers/user.router');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('Views', './Views');

app.get('/', (req, res) => {
	res.render('index');
});



app.use('/users', userRouter);

app.listen(port, () => {
	console.log("Server listening on port", port);
});