const
  mongoose = require('mongoose'),
  config = require('config'),
  templateRoutes = require('./routes/templatesRoutes'),
  express = require('express');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const DB_CONNECTION = (process.env.DB_CONNECTION) ? process.env.DB_CONNECTION : config.get('connectionString');
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var apiRoutes = express.Router();


templateRoutes(apiRoutes);



apiRoutes.get('/pages/:pageName' ,function(req,res){
  var pageName = req.params.pageName;
  res.json(pageName);
});

app.use(apiRoutes);

process.on('unhandledRejection', function (reason, promise) {
  console.error('unhandled promise rejection:', reason.message || reason)
})

app.listen(app.get('port'), function() {
  console.log('My Links Wall is running on port', app.get('port'));
});

module.exports = app;
