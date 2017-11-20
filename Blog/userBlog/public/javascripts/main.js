function Main(){
	this.inti=function(){
		var _this=this;
		$.ajax({
			url:'/list',
			method:'get',
			data:{limit:4,skip:0},
			success:function(result){
				console.log(result);
				_this.renderList(result.resultList);
				_this.paginate(result.total);
			}
		})
	}
	//全部列表
	this.renderList=function(result){
        for(var i=0;i<result.length;i++){
			var li=$('<li>').html(`
				<div class="media">
				  <div class="media-left">
				    <a href="#">
				      <img class="media-object" src='http://localhost:3000${result[i].pathname}' >
				    </a>
				  </div>
				  <div class="media-body">
				    <h4 class="media-heading">${result[i].title}</h4>
				    ${result[i].context}
				  </div>
				</div>`);
			$('.list ').append(li);
		}
	}

var count=0;//作为表示

	//分页列表
	this.paginate=function(number){
		var _this=this;
		var num=Math.ceil(number/4);

		//上一页
		var li1=$('<li>').html(`
			<a href="#" aria-label="Previous">
	            <span aria-hidden="true">&laquo;</span>
	          </a>`);
		li1.on('click',function(){
			_this.Previous();
		})
		$('.pagination').append(li1);

		for(var i=0;i<num;i++){
			var li=$('<li>').html(`<a>${i+1}</a>`);
			li.on('click',function(){
				console.log(parseInt($(this).text()-1))
				 //var val=parseInt($(this).text()-1)
				count=parseInt($(this).text()-1)
				_this.rerenderList(count);
			})
			$('.pagination ').append(li);
		}
		 
		//下一页
		var li2=$('<li>').html(`
			<a href="#" aria-label="Next">
	            <span aria-hidden="true">&raquo;</span>
	          </a>`);
		li2.on('click',function(){
			_this.Next();
		})
		$('.pagination').append(li2);
	}
    	

	//重新渲染分页列表
	this.rerenderList=function(index){
		$('.list').empty()
		var _this=this;
		$.ajax({
			url:'/list',
			method:'get',
			data:{limit:4,skip:index*4},
			success:function(result){
				console.log(result);
				_this.renderList(result.resultList);
				
			}
		})
	}

	//上一页
	
	this.Previous=function(){
		if(count<=0){
			count=0;
		}else{
			count--;
		}
		
		console.log(count)
		$('.list').empty()
		var _this=this;
		$.ajax({
			url:'/list',
			method:'get',
			data:{limit:4,skip:count*4},
			success:function(result){
				console.log(result);
				_this.renderList(result.resultList);
				
			}
		})
	}
	//下一页
	this.Next=function(){
		if(count>=3){
			count=3;
		}else{
			count++;
		}
		
		console.log(count)
		$('.list').empty()
		var _this=this;
		$.ajax({
			url:'/list',
			method:'get',
			data:{limit:4,skip:count*4},
			success:function(result){
				console.log(result);
				_this.renderList(result.resultList);
				
			}
		})
	}
}



var a=new Main();
a.inti();