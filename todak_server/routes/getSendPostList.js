var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});

router.get('/getSendPostList/:mem_id', function (request, response) {
connection.query('select * from post where mem_id = ?; ', [request.params.mem_id], function (error, cursor){
         if (cursor.length > 0) {
                    res.json({
                        result : true, 
                        post_id : cursor[0].id, 
                        post_date : cursor[0].title,
                        post_content : cursor[0].timestamp,
                        post_photo : cursor[0].post_photo,
                        keyword1 : cursor[0].keyword1,
                        keyword2 : cursor[0].keyword2,
                        keyword3 : cursor[0].keyword3,
                        mem_id : cursor[0].mem_id,
            
                    });
                }
        else
            response.status(503).json({ result : false, reason : "Cannot find selected post"});
})

});


module.exports = router;