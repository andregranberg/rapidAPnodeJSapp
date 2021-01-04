const { Console } = require('console');
const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
const path = require('path')




var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {function: 'GLOBAL_QUOTE', symbol: 'TSLA'},
  headers: {
    'x-rapidapi-key': 'key_goes_here',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

var obj;
var x;
var myJSON;

axios.request(options).then(function (response) {
  obj = response.data;
  x = obj[Object.keys(obj)[0]];
  x = x[Object.keys(x)[0]];
  myJSON = JSON.stringify(x);  
  console.log(response.data);
}).catch(function (error) {
	console.error(error);
});







const PORT = process.env.PORT || 3000;

// Set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: myJSON
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log("Server listening on port" + PORT));
