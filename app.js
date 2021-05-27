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

app.get('/:id', (req, res) => {    // dynamically renders each project page through the id number
	res.render('project', {
		id: req.params.id,
		name: projects[req.params.id].project_name,
		description: projects[req.params.id].description,
		technologies: projects[req.params.id].technologies,
		live_link: projects[req.params.id].live_link,
		github_link: projects[req.params.id].github_link,
		image_urls: projects[req.params.id].image_urls
	});
});

app.use((req, res, next) => {   // 404 handler
	const err = new Error("Page Not Found");
	err.status = 404;
	console.log(err.message, err.status);
	next(err);
});

app.use((err, req, res, next) => {   // error handler
	res.locals.error = err;
	res.status(err.status);
	console.log(err.message, err.status);
});

app.listen(3000, () => {  // listening on 3000 and logging the info
	console.log('The application is running on localhost:3000.');
});