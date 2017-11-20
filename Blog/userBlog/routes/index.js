var express = require('express');
var router = express.Router();
var Context=require('../model/Context');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/list', function(req, res, next) {
	
	var limit=parseInt(req.query.limit);
	var skip=parseInt(req.query.skip);

	
     //查找全部记录数和根据条件查找两件事情是异步执行的，所以这时候我们要用promise
     //对象来解决异步问题，也就是：当所有的事情都执行完的时候，才去之后then的回调函数

	Promise.all([Context.count(),Context.find({},{},{limit:limit,skip:skip})]).then(result=>{
		
		res.send({
			total:result[0],
			resultList:result[1]
			//pageNum:skip/limit+1
		})
	})

});

module.exports = router;
