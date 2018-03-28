
var cassandra = require('cassandra-driver');
var PropertiesReader = require('properties-reader');

/*var properties = PropertiesReader('PropertiesReader.js');
var host =  properties.get('db.host');
var port = properties.get('db.port');
var keyspace = properties.get('db.keyspace');*/


var host =  process.env.CASSANDRA_HOST;
var port = process.env.CASSANDRA_PORT;
var keyspace = process.env.CASSANDRA_KEYSPACE;

/*
console.log('host: ' +host);
console.log('port: ' +port);*/




var client = new cassandra.Client({contactPoints: [host+':'+port], keyspace: keyspace});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});


/*
 * GET trans listing .
 */



/*
 * GET one trans.
 */
exports.list_one = function (req, res) {

    var id = req.params.id;
    console.log('trans: viewing one');

    client.execute("SELECT * from transactions WHERE id = " + id + " ALLOW FILTERING", [], function (err, result) {
        if (err) {
            console.log('trans: viewing one err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('trans: viewing one succ:');
            res.render('transactionViewOne', {page_title: "Transactions Details", data: result.rows});
        }
    });

};

/*
 * GET trans listing .
 */
exports.list_transection = function (req, res) {

    console.log('alltransaction: list');
    client.execute('SELECT * FROM transactions LIMIT 10', [], function (err, result) {
        if (err) {
            console.log('alltransaction: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('alltransaction: list succ:', result.rows);
            res.render('alltransaction', {page_title: "All Transactions", data: result.rows})
        }
    });

};

/*
 * GET one tra.
 */
exports.list_search = function (req, res) {

    // var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
    var validate = require('uuid-validate');

    console.log(input);
    console.log('pending transaction: list_search');
    if (validate(input.id)) {
        client.execute("SELECT * from transactions WHERE id = " + input.id + " ALLOW FILTERING", [], function (err, result) {
            if (err) {
                console.log(' transaction: search one err:', err);
                res.status(404).send({msg: err});
                res.render('alltransaction', {page_title: "Transaction Details",});
                //  allblocks();
            } else {
                console.log(' transaction: search one succ:');
                res.render('alltransaction', {page_title: "Transaction Details", data: result.rows});
            }
        });
    }
    else
    {
        var result=[];
        res.render('alltransaction', {page_title: "Transaction Details", data:result});

    }
};


/*
 * GET cheques listing pagging next.
 */
exports.list_paging_next = function (req, res) {

    console.log('alltransaction: list');
    var id = req.params.id;

    console.log('id:  ' +id );
    client.execute("SELECT * FROM transactions WHERE id > "+ id + "LIMIT 10 ALLOW FILTERING", [], function (err, result) {
        if (err) {""
            console.log('alltransaction: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('alltransaction: list succ:', result.rows);
            res.status(200).send(result.rows);
           // res.render('alltransaction', {page_title: "All Transactions", data: result.rows})

        }
    });

};

/*
 * GET cheques listing pagging previous.
 */
exports.list_paging_previous = function (req, res) {

    console.log('alltransaction: list');
    var id = req.params.id;
    console.log('id:', id);
    client.execute("SELECT * FROM transactions WHERE expr(transaction_lucene_index," +"\'{ sort: [ {type: \"simple\", field: \"id\", reverse: true} ] }"+"\') AND bank='sampath' AND id <"+ id + " LIMIT 10 ALLOW FILTERING", [], function (err, result) {
        if (err) {""
            console.log('alltransaction: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('alltransaction: list succ:', result.rows);
            res.render('alltransaction', {page_title: "All Transactions", data: result.rows})
        }
    });

};

