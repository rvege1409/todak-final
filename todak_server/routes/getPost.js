var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    'host' : 'todak-db-new.cdlwjflps9v9.ap-northeast-2.rds.amazonaws.com', 
    'user' : 'master', 
    'password' : '1q2w3e4r', 
    'database' : 'todak_db',
});
//오늘 받을 게시글 가져오기
router.get('/getPost/:mem_id', function (request, response) {
    connection.query('select * from post where post_date > curdate() and mem_id != ? order by rand() limit 1;', [request.params.mem_id], function(error, cursor){
        if (cursor.length > 0) {
                    res.json({
                        result : true, 
                        post_id : cursor[0].post_id, 
                        post_date : cursor[0].post_date,
                        post_content : cursor[0].post_content,
                        post_photo : cursor[0].post_photo,
                        keyword1 : cursor[0].keyword1,
                        keyword2 : cursor[0].keyword2,
                        keyword3 : cursor[0].keyword3,
                        mem_id : cursor[0].mem_id,
                    });
        }
        else
            response.status(503).json({ result : false, reason : "Cannot find selected post"});
    });
    
});




module.exports = router;