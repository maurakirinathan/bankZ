
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
var processingTransaction = require('./routes/processingTransaction');

//load cheques transaction
var allpromizes = require('./routes/promizes');

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




//app.get('/cassandrainfo', cassandrainfo.init_cassandra);

//app.get('/', routes.index);


//----------------------------

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
