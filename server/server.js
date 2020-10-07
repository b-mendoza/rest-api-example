var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var eventsRouter = require('./routers/events-router');

var app = express();
var port = 4000;

app.use(morgan('dev'));
app.use(express.static('docs'));

// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept,recording-session'
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/events', eventsRouter);

app.listen(process.env.PORT);
console.log('Running app on port port. Visit: http://localhost:' + port + '/');
