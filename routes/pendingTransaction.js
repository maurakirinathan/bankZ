var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'cchain'});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});


/*
 * GET pending transaction listing.
 */
exports.list = function (req, res) {

    console.log('allblocks: list');
    client.execute('SELECT * FROM transactions', [], function (err, result) {
        if (err) {
            console.log('pending transaction: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('pending transaction: list succ:', result.rows);
            res.render('pendingTransaction', {page_title: "BANK Z", data: result.rows})
        }
    });

};

/*
 * GET one pending transaction.
 */
exports.list_one = function (req, res) {

    var id = req.params.id;
    console.log('transactions: viewing one');

    client.execute("SELECT * from transactions WHERE id = " + id + " ALLOW FILTERING", [], function (err, result) {
        if (err) {
            console.log('transactions: viewing one err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('transactions: viewing one succ:');
            res.render('transactionViewOne', {page_title: "Transaction Details", data: result.rows});
        }
    });

};

/*
 * GET one block.
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
                console.log('pending transaction: search one err:', err);
                res.status(404).send({msg: err});
                res.render('pendingTransaction', {page_title: "Transaction Details",});
                //  allblocks();
            } else {
                console.log('pending transaction: search one succ:');
                res.render('pendingTransaction', {page_title: "Transaction Details", data: result.rows});
            }
        });
    }
    else
    {
        var result=[];
        res.render('pendingTransaction', {page_title: "Transaction Details", data:result});

    }
};


