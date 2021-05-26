const express = require('express');
const app = express();
const data = require('./data.json'); 
const projects = data.projects;
const router = express.Router();

app.use('/', router);
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
	res.render('index', { projects });
});

app.get('/about', (req, res) => {
	res.render('about');
});

router.get('/:id', (req, res) => {
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

app.listen(3000, () => {
	console.log('The application is running on localhost:3000.');
});