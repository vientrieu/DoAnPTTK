let express = require('express');
let app = express();
let expressHbs = require('express-handlebars');

//set public static folder
app.use(express.static(__dirname + '/Public'));
//use view engine
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'client',
    layoutsDir: __dirname + '/views/Layouts',
    partialsDir: __dirname + '/views/Partials'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.send("hahahaha");
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port ${process.env.PORT || 3000}`);
});