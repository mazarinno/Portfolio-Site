const express = require('express');
const app = express();
const data = require('./data.json'); 
const projects = data.projects;


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {    // renders the home page, passing projects into it
	res.render('index', { projects });
});

app.get('/about', (req, res) => {   // renders the about page
	res.render('about');
});

app.get('/resume', (req, res) => {   // renders the resume page
	res.render('resume');
});

app.get('/project/:id', (req, res) => {    // dynamically renders each project page through the id number.
	res.render('project', {
		id: req.params.id,
		name: data.projects[req.params.id].project_name,
		description: data.projects[req.params.id].description,
		technologies: data.projects[req.params.id].technologies,
		live_link: data.projects[req.params.id].live_link,
		github_link: data.projects[req.params.id].github_link,
		image_urls: data.projects[req.params.id].image_urls
	});
});

app.use(function (req,res,next){
	res.status(404).send('Page Not Found');
	const err = new Error('Not found');
	err.status = 404;
	console.log(err.status, err.message);
	next(err);
});

app.use(function (err, req, res, next){   // error handler
	res.locals.error = err;
	res.status(err.status);
	if (err.status != 404) {  // this handler still caught 404s, so this stops there from being two logs for the same error
		err.message = "Something went wrong!"
		console.log(err.status, err.message);
	}
});

app.listen((process.env.PORT), () => {  // listening on 3000 and logging the info
	console.log('The application is running on localhost:3000.');
}); 