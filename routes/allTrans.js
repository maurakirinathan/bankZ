var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'cchain'});
client.connect(function (err, result) {
    console.log('cchain: cassandra connected');
});


/*
 * GET trans listing .
 */
exports.list_trans = function (req, res) {

    console.log('alltrans: list');
    client.execute('SELECT * FROM trans', [], function (err, result) {
        if (err) {
            console.log('alltrans: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('alltrans: list succ:', result.rows);
            res.render('alltrans', {page_title: "BANK Z", data: result.rows})
        }
    });

};


/*
 * GET one trans.
 */
exports.list_one = function (req, res) {

    var id = req.params.id;
    console.log('trans: viewing one');

    client.execute("SELECT * from trans WHERE id = " + id + " ALLOW FILTERING", [], function (err, result) {
        if (err) {
            console.log('trans: viewing one err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('trans: viewing one succ:');
            res.render('transViewOne', {page_title: "Trans Details", data: result.rows});
        }
    });

};

/*
 * GET trans listing .
 */
exports.list_trans_display = function (req, res) {

    console.log('alltrans: list');
    client.execute('SELECT * FROM trans', [], function (err, result) {
        if (err) {
            console.log('alltrans: list err:', err);
            res.status(404).send({msg: err});
        } else {
            console.log('alltrans: list succ:', result.rows);
            res.render('alltransdisplay', {page_title: "BANK Z", data: result.rows})
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
                console.log('pending transaction: search one err:', err);
                res.status(404).send({msg: err});
                res.render('alltransdisplay', {page_title: "Transaction Details",});
                //  allblocks();
            } else {
                console.log('pending transaction: search one succ:');
                res.render('alltransdisplay', {page_title: "Transaction Details", data: result.rows});
            }
        });
    }
    else
    {
        var result=[];
        res.render('alltransdisplay', {page_title: "Transaction Details", data:result});

    }
};

