let express = require("express");
let app = express();
let expressHbs = require("express-handlebars");
let bodyParser = require("body-parser");
let hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/Layouts",
  partialsDir: __dirname + "/views/Partials",
});
app.use("", require("./Router/home.route"));
app.use("/admin/order", require("./Router/order.route"));

app.use(bodyParser.urlencoded({ extended: true }));
//set public static folder
app.use(express.static(__dirname + "/Public"));
//use view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.use("", require("./Router/home.route"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port ${process.env.PORT || 3000}`);
});
