var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.get('/getShareListComment/:post_id', function (request, response) {
connection.query('select * from post p, comment c where p.post_id = c.post_id and post_id = ?;', [request.params.post_id], function (error, cursor){
         if (cursor.length > 0) {
                    res.json({
                        result : true, 
                        cmt_id : cursor[0].cmt_id, 
                        cmt_date : cursor[0].cmt_date,
                        cmt_content : cursor[0].cmt_content,
                        mem_id : cursor[0].mem_id,
                        post_id : cursor[0].post_id,
                    })
         }
        else
            response.status(503).json({ result : false, reason : "Cannot find selected comment"});
});

});

module.exports = router;