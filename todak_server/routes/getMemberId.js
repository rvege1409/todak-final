var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.get('/getMemberId/:hash', function(req, res, next) {
    connection.query('select mem_id from board where hash=?;', [req.params.hash], function (error, cursor) {
        if (cursor.length > 0)// cursor 
            res.json(cursor[0]);
        else
            res.status(503).json({ result : false, reason : "Cannot find selected article" });
    });
});

module.exports = router;