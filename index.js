let express = require('express');
let app = express();
let expressHbs = require('express-handlebars');
let mysqlconnect = require('./database/mysql');
var F5controller = require('./Controllers/function5.controller')

//set public static folder
app.use(express.static(__dirname + '/Public'));
//use view engine
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/Layouts',
    partialsDir: __dirname + '/views/Partials'
});
app.use('', require('./Router/Home.admin'));



app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port ${process.env.PORT || 3000}`);
});