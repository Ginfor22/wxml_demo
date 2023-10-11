var mysql = require('mysql');

//导出一个查询全部的方法
module.exports.selectAll = function(sql,rollback){
    //创建连接对象
    var connection = mysql.createConnection({
    host: 'localhost',
    database: 'shixun',
    user: 'root',
    password: '123456'
    });
        
    //使用连接对象连接mysql数据库
    connection.connect(function(err){
        if (err) {
            console.log('数据库连接失败');
            console.log(err);
        }
    });

    connection.query(sql,rollback);

    connection.end(function(err){
        if (err) {
            console.log('连接关闭失败');
            console.log(err);
        }
    })
}

module.exports.queryByParam = function(sql,params,rollback){
    //创建连接对象
var connection = mysql.createConnection({
   host: 'localhost',
   database: 'shixun',
   user: 'root',
   password: '123456'
   });
       
   //使用连接对象连接mysql数据库
   connection.connect(function(err){
       if (err) {
           console.log('数据库连接失败');
           console.log(err);
       }
   });

   connection.query(sql,params,rollback);
   
   connection.end(function(err){
       if (err) {
           console.log('连接关闭失败');
           console.log(err);
       }
   })
}