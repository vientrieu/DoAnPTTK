let express = require('express');
let app = express();
let expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 
//set public static folder
app.use(express.static(__dirname + '/Public'));
//use view engine
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/Layouts',
    partialsDir: __dirname + '/views/Partials'
});
app.use('', require('./Router/home.route'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port ${process.env.PORT || 3000}`);
});