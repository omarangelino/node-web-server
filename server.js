const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var maintenance = false;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} . ${req.url}`;
	console.log(log);
	
	fs.appendFile('server.log', log + '\n', (error) => {
		if(error){
				console.log(error);
		}
	});
	next();	
});

app.use((req, res, next) => {
	if(maintenance)
	{
		res.render('maintenance.hbs')
	}else{
		next();
	}
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})


app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');
	res.render('index.hbs', {
		pageTitle : 'Home Page',
		welcomeMessage: 'Welcome!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get('/proyects', (req, res) => {
	res.render('proyects.hbs', {
		pageTitle : 'Proyects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle Request'
	});
});


app.listen(3000, () => {
	console.log('Server is up and running at port 3000');
});