let express = require('express');
let app = express();
let expressHbs = require('express-handlebars');
let mysqlconnect = require('./database/mysql');
var hoadon = require('./Models/hoadon.model')

//set public static folder
app.use(express.static(__dirname + '/Public'));
//use view engine
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/Layouts',
    partialsDir: __dirname + '/views/Partials'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.redirect('/function-1');
});
app.get('/function-1', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/function-2', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/function-3', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/function-4', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.get('/function-5', (req, res) => {
    res.render('./Admin/profile', {
        page: 'Profile',
        profile: 'active'
    })
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port ${process.env.PORT || 3000}`);
});