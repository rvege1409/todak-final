var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});


router.get('/getShareList', function (request, response) {
    connection.query('select * from post where TO_DAYS(NOW()) - TO_DAYS(post_date) <= 7 order by rand() limit 10;', [request.params.mem_id], function(error, cursor){
    if (cursor.length > 0)// cursor 
            res.json(cursor);
        else
            res.status(503).json({ result : false, reason : "Cannot find selected article" });
    });
});    

module.exports = router;