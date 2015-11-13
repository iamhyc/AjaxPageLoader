
var imgView = function(config){
	this.imgBox = "#" + config.imgBox;
	this.imgContain = "." + config.imgContain;
	this.on();
}

imgView.prototype = {
	on: function(){
		var oldX, oldY, startX, startY, startWidth, startHeight, 
			initWidth, initHeight, gapHeight,
			clientHeight, clientWidth;
		var that = this;
		var moveD;
		var isMove = false;
		var isZoom = false;
		var lastClickTime = 0;

		$(that.imgBox).load(function(){
			initWidth = $(that.imgBox).width();
			initHeight = $(that.imgBox).height();
			clientHeight = $(that.imgContain).height();
			clientWidth = $(that.imgContain).width();

			console.log(clientHeight+" "+initHeight);
			//$("#imgHeight").css("width", clientWidth+px);
			gapHeight = (clientHeight - initHeight)/2;
			$(that.imgBox).css("top", gapHeight+"px");

			var target = that.imgBox.slice(1);
			document.getElementById(target).addEventListener("touchstart", img_mousedown, false);
			document.getElementById(target).addEventListener("touchend", img_mouseup, false);
			document.getElementById(target).addEventListener("touchmove", img_mousemove, false);
		});

		function get_distance(x1, y1, x2, y2){
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
		}


		function img_mousedown(e){
			if (e.touches.length == 1){
				var nowTime = Math.round(new Date().getTime());
				x = $(that.imgBox).position().left;
				y = $(that.imgBox).position().top;
				if (nowTime - lastClickTime < 500 && Math.abs(x - startX) < 20 && Math.abs(y - startY) < 20){
					if (startWidth > initWidth){
						$(that.imgBox).width(initWidth);
						$(that.imgBox).height(initHeight);
						$(that.imgBox).css('left', 0);
						$(that.imgBox).css('top', gapHeight+"px");
						startWidth = 0;	startHeight = 0;
					}
					else{
						startWidth = 2*initWidth;
						startHeight = 2*initHeight;
						$(that.imgBox).width(startWidth);
						$(that.imgBox).height(startHeight);
						$(that.imgBox).css('left', -initWidth/2);
						$(that.imgBox).css('top', -initHeight/2+gapHeight);
					}
				}
				lastClickTime = nowTime;
			}
			else if (e.touches.length >= 2){
				isMove = false;
				isZoom = true;
				x1 = e.touches[0].pageX;	y1 = e.touches[0].pageY;
				x2 = e.touches[1].pageX;	y2 = e.touches[1].pageY;

				startX = $(that.imgBox).position().left;
				startY = $(that.imgBox).position().top;
				startWidth = $(that.imgBox).width();
				startHeight = $(that.imgBox).height();

				moveD = get_distance(x1, y1, x2, y2);

				return;
			}

			isMove = true;
			oldX = e.touches[0].pageX;
			oldY = e.touches[0].pageY;
			startX = $(that.imgBox).position().left;
			startY = $(that.imgBox).position().top; 
			e.preventDefault();
			e.stopPropagation();
			//return false;
		}

		function img_mouseup(e){
			isZoom = false;
			isMove = false;
		}

		function verticeJudge(){
			var tmp = $(that.imgBox);
			var up_vt_top = tmp.position().top,
				up_vt_left = tmp.position().left,
				btm_vt_top = up_vt_top + tmp.height(),
				btm_vt_left = up_vt_left + tmp.width();

			var move_orient = {
				"up":true,	"down":true,	"left":true,	"right":true
			}
			if(up_vt_top > 0) move_orient.down = false;
			if(up_vt_left > 0) move_orient.right = false;
			if(btm_vt_top < clientHeight) move_orient.up = false;
			if(btm_vt_left < clientWidth) move_orient.left = false;
			//console.log(move_orient)
			return move_orient;
		}

		function img_mousemove(e){
			if (isZoom){
			//targetTouches changedTouches touches
				if (e.touches.length >= 2){
					var x1, y1, x2, y2, d1;
					x1 = e.touches[0].pageX;	y1 = e.touches[0].pageY;
					x2 = e.touches[1].pageX;	y2 = e.touches[1].pageY;
					d1 = get_distance(x1, y1, x2, y2);
				
					var rate = d1 / moveD;
					var w = startWidth * rate;
					var h = startHeight * rate;
					if (w<initWidth||w>5*initWidth) return;
					$(that.imgBox).width(w);
					$(that.imgBox).height(h);
					$(that.imgBox).css('left', (startWidth - w) / 2 + startX + 'px');
					$(that.imgBox).css('top', (startHeight - h) / 2 + startY + 'px');
				}

				return;
			}

			if (!isMove) return;

			var move_orient = verticeJudge();
			var moveX = e.changedTouches[0].pageX - oldX,
				moveY =	e.changedTouches[0].pageY - oldY;

			if (move_orient.left&&moveX<0 || move_orient.right&&moveX>0){
				$(that.imgBox).css('left', moveX + startX + 'px');
			}
				
			if (move_orient.up&&moveY<0 || move_orient.down&&moveY>0){
				$(that.imgBox).css('top', moveY + startY + 'px');
			}
			
		}

	}
};

		



