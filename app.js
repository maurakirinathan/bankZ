
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load cassandra route
var cassandrainfo = require('./routes/cassandrainfo');

//load blocks route
var allblocks = require('./routes/allblocks');

//load pending transaction
var pendingTransaction = require('./routes/pendingTransaction');

//load cheques transaction
var allcheques = require('./routes/allcheques');

//load all trans
var allTransactions = require('./routes/allTransactions');

var app = express();

var cassandra = require('cassandra-driver');

const client = new cassandra.Client({contactPoints: ['localhost:9042'], keyspace: 'ks1' });

// all environments
app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', routes.index);*/
//---------------------------------------
app.get('/', allblocks.list);
app.get('/allblocks',allblocks.list);
app.get('/allblocks/:id',allblocks.list_one);
app.post('/allblocks_search',allblocks.list_search);
app.get('/allblocks_previous/:id',allblocks.list_paging_previous);
app.get('/allblocks_next/:id',allblocks.list_paging_next);



app.get('/allcheques',allcheques.list);
app.get('/allcheques_previous/:id',allcheques.list_paging_previous);
app.get('/allcheques_next/:id',allcheques.list_paging_next);
app.get('/chequeview/:id',allcheques.list_one);
app.post('/allCheque_search',allcheques.list_search);


app.get('/pendingTransaction',pendingTransaction.list);
app.get('/pendingTransaction/:id',pendingTransaction.list_one);
app.post('/pendingTransaction_search',pendingTransaction.list_search);
app.get('/pendingTransaction_previous/:id',pendingTransaction.list_paging_previous);
app.get('/pendingTransaction_next/:id',pendingTransaction.list_paging_next);


app.get('/alltrans',allTransactions.list_trans);
app.get('/alltrasdisplay',allTransactions.list_trans_display);
app.post('/transection_search',allTransactions.list_search);
app.get('/transview/:id',allTransactions.list_one);
app.get('/allTransaction_previous/:id',allTransactions.list_paging_previous);
app.get('/allTransaction_next/:id',allTransactions.list_paging_next);




//app.get('/cassandrainfo', cassandrainfo.init_cassandra);

//app.get('/', routes.index);


//----------------------------

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
