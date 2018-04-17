
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var session = require('express-session');
var http = require('http');
var path = require('path');

var cassandra = require('cassandra-driver');
var PropertiesReader = require('properties-reader');


//load cassandra route
var cassandrainfo = require('./routes/cassandrainfo');

//load blocks route
var allblocks = require('./routes/allblocks');

//load pending transaction
var processingTransaction = require('./routes/processingTransaction');

//load cheques transaction
var allpromizes = require('./routes/promizes');

//load all trans
var allTransactions = require('./routes/allTransactions');

var app = express();

var index = require('./routes/index');


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

/*var properties = PropertiesReader('PropertiesReader.js');
var host =  properties.get('db.host');
var port = properties.get('db.port');
var keyspace = properties.get('db.keyspace');*/


var host =  process.env.CASSANDRA_HOST;
var port = process.env.CASSANDRA_PORT;
var keyspace = process.env.CASSANDRA_KEYSPACE;


var client = new cassandra.Client({contactPoints: [host+':'+port], keyspace: keyspace});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});

//var cassandra = require('cassandra-driver');

//const client = new cassandra.Client({contactPoints: ['localhost:9042'], keyspace: 'cchain' });

// all environments
app.set('port', process.env.PORT || 8082);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));


// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session && req.session.user === "admin" && req.session.admin)
        //
        console.log("there : 200");
    else
        console.log("there is a prob : 401");
   // return  res.sendStatus(401);

};


/*app.get('/', routes.index);*/
//---------------------------------------
app.get('/',index.index);
app.get('/allblocks',allblocks.list);
app.get('/allblocks/:id',allblocks.list_one);
app.post('/allblocks_search',allblocks.list_search);
app.post('/alltransaction_blocks',allblocks.list_alltransaction_blocks);

//app.get('/allblocks_previous/:id',allblocks.list_paging_previous);
app.get('/allblocks_next/:id',allblocks.list_paging_next);



app.get('/allpromizes',allpromizes.list);
app.get('/alltransaction_promize',allpromizes.transactions_for_promize);
//app.get('/allpromizes_previous/:id',allpromizes.list_paging_previous);
app.get('/allpromizes_next/:id',allpromizes.list_paging_next);
app.get('/promizesview/:id',allpromizes.list_one);
app.post('/allpromizes_search',allpromizes.list_search);


app.get('/processingTransaction',processingTransaction.list);
app.get('/processingTransaction/:id',processingTransaction.list_one);
app.post('/processingTransaction_search',processingTransaction.list_search);
//app.get('/processingTransaction_previous/:id',pendingTransaction.list_paging_previous);
app.get('/processingTransaction_next/:id',processingTransaction.list_paging_next);


//app.get('/alltrans',allTransactions.list_trans);
app.get('/alltransaction',allTransactions.list_transection);
app.post('/transection_search',allTransactions.list_search);
app.get('/transectionview/:id',allTransactions.list_one);
app.get('/allTransaction_previous/:id',allTransactions.list_paging_previous);
app.get('/allTransaction_next/:id',allTransactions.list_paging_next);






// Login endpoint
app.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');
    } else if(req.query.username === "admin" && req.query.password === "admin") {
     //   res.send("login success!");
       req.session.user = "admin";
       req.session.admin = true;
       // res.render('index', { page_title: 'Hello Container World' });
        //res.render('allblocks',auth,allpromizes.list);
      //  res.send("login success!");
        client.execute('SELECT * FROM blocks LIMIT 10', [], function (err, result) {
            if (err) {
                console.log('allblocks: list err:', err);
                res.status(404).send({msg: err});
            } else {
                console.log('allblocks: list succ:', result.rows);
                res.render('allblocks', {page_title: "All Blocks", data: result.rows})
            }
        });
    }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy(auth(req,res));
    //res.render('logout', { page_title: 'Hello Container World' });
    res.render('index', { page_title: 'Hello Container World' });
    //res.send("logout success!");
});


//app.get('/cassandrainfo', cassandrainfo.init_cassandra);

app.get('/', routes.index);


//----------------------------

//app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
