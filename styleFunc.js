//阻止冒泡
function stopBubble (e) {
	//console.log("NoMoreBubbles!");
	if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true;
}

//长按事件
function longFocus (qObj, callback) {
	var timer = null;
	call = callback;

	qObj.on({
		touchstart:function(){
			qid = $(this).attr("id");
			timer = setTimeout('call(qid)', 500)
		},
		touchend:function(){
			clearTimeout( timer );
		}
	})
}

/*AJAX HTML LOADING OPTIMIZE*/
var ajaxLoad = function(){
	var load_backface = false;
	var global_url;
	var main = "#body1", back = "#body2";
	//var val = "100%";

	$("#body1").on("webkitAnimationEnd",function(e){
		//console.log(main+" "+back);
		if(e.target == this){
			$(back).removeClass();	$(main).removeClass();
			$(main).css("display", "none").html("");
		}
	});

	this.judgement = function(){
		if (load_backface){
			main = "#body2";
			back = "#body1";
		}
		else{
			main = "#body1";
			back = "#body2";
		}
	}

	this.pageLoad = function(url, callback){
		$.post(url, null, function(data){
			global_url = url;
			callback(data);
		})
	};

	this.preLoad = function(url, callback){
		that = this;
		this.pageLoad(url, function(data){
			that.judgement();

			$(back).html(data);

			if(callback) callback(data);
		})
	}

	this.reload = function(url){
		var re_url = (url)?url:global_url;
		this.judgement();
		this.pageLoad(re_url, function(data){
			$(main).html(data);
		})
	}

	this.switchPage = function(onward){
		$(back).css("display", "block");

		if(onward){
			$(back).addClass("slide-in");
			$(main).addClass("slide-out");
		}
		else{
			$(back).addClass("slide-reverse-in");
			$(main).addClass("slide-reverse-out");
		}

		load_backface = !load_backface;
	};

	this.move = function(url, onward){
		that = this;
		this.preLoad(url, function(data){
			that.switchPage(onward);
		});
	}
}
