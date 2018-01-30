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
