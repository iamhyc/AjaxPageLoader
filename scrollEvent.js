/*=====================
 * 名称: appTouch
 * 功能: web app滑动模拟组件
 * 参数: 相关配置
 ======================*/

var appTouch = function(config, callback) {
    this.touchContain = config.tContain;
    this.touchMove = config.tMove;
    this.callbackfn = callback;
    this.move();
}
 
appTouch.prototype = {
    move : function(e) {
        var monitor = document.getElementById(this.touchContain), //监听容器
            target = document.getElementById(this.touchMove), //移动目标
            sheight , //自定义滚动条的长度
            st , //移动块对应滚轮单位长度

            ex_range = 80, //允许超出范围
            tslow = 4, //到顶/底减基数
            tMove = 0, //滑块到顶top值
            tMoveL = tMove + ex_range, //到顶允许下拉范围
            bMove, //滑块到底top值
            bMoveL = bMove - ex_range, //到底允许上滑范围
            callbackfn = this.callbackfn, //回调函数
            flg = false, //标记是否滑动
            startY, //标记起始位置
            startTop, //标记滑动起始时的高度值
            move = 0; //移动距离

        //移动设备触摸事件注册
        addEvent(target, 'touchstart', moveStart);
        addEvent(target, 'touchmove', moveIn);
        addEvent(target, 'touchend', moveEnd);
        /**
         *外观/门面模式包装
         */
        /*事件监听 */
        function addEvent(el, type, fn) {
            if (el.addEventListener) {
                el.addEventListener(type, fn, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + type, fn);
            } else {
                el['on' + type] = fn;
            }
        }
 
        //取消浏览器默认行为
        function stop(e) {
            //Opera/Chrome/FF
            if (e.preventDefault)
                e.preventDefault();
            //IE
            e.returnValue = false;
        }
        //包装结束

        /**
         *操作函数
         */
        //惯性缓动参数
        var lastMoveTime = 0;
        var lastMoveStart = 0;
        var stopInertiaMove = false;
        /*移动触发*/
        function moveStart(e) {
            //stop(e);

            bMove = monitor.offsetHeight - target.offsetHeight;
            st = (target.offsetHeight - monitor.offsetHeight) / (monitor.offsetHeight - sheight);
            sheight = monitor.offsetHeight / target.offsetHeight * monitor.offsetHeight;

            if (e.touches)
                e = e.touches[0];
            startY = e.clientY;
            startTop = target.style.top || 0;
            //惯性缓动
            lastMoveStart = startY;
            lastMoveTime = new Date().getTime();
            stopInertiaMove = true;
 
        }
 
        /*移动过程中*/
        function moveIn(e) {
            flg = true;
                stop(e);
                if (e.touches)
                    e = e.touches[0];
                move = e.clientY - startY + parseInt(startTop);
                if (move > tMove) {
                    (move - tMove) / tslow + tMove > tMoveL ? move = tMoveL : move = (move - tMove) / tslow + tMove;
                } else if (move < bMove){
                    (bMove - move) / tslow + bMove > bMoveL ? move = bMoveL : move = (move - bMove) / tslow + bMove;
                }

                target.style.top = move + 'px';
                //惯性缓动
                var nowTime = new Date().getTime();
                stopInertiaMove = true;
                if (nowTime - lastMoveTime > 300) {
                    lastMoveTime = nowTime;
                    lastMoveStart = e.clientY;
                }
            
        }
 
        /*移动结束*/
        function moveEnd(e) {
            //stop(e);
            if(!flg) return;
            if (e.touches)
                e = e.changedTouches[0];
            //惯性缓动
            var contentTop = target.style.top.replace('px', '');
            var contentY = (parseInt(contentTop) + e.clientY - lastMoveStart);
            var nowTime = new Date().getTime();
            var v = (e.clientY - lastMoveStart) / (nowTime - lastMoveTime);
            //最后一段时间手指划动速度
            stopInertiaMove = false;

            (
                function(v, startTime, contentY) {
                    var dir = v > 0 ? -1 : 1;
                    //加速度方向
                    var deceleration = dir * 0.005;
                    
                    function inertiaMove() {
                        if (stopInertiaMove)  return;
                        var nowTime = new Date().getTime();
                        var t = nowTime - startTime;
                        var nowV = v + t * deceleration;
                        var moveY = (v + nowV) / 2 * t;
                        // 速度方向变化表示速度达到0了
                        if (dir * nowV > 0) {
                            if (move > tMove) {
                                callbackfn('top');
                                target.style.top = tMove + 'px';
                            } else if (move < bMove && bMove < 0) {
                                callbackfn('bottom');
                                target.style.top = bMove + 'px';
                            }
                            return;
                        }
                    
                        move = contentY + moveY;
                        if (move > tMove) {
                            t /= 20;
                            move = (move - tMove) / 10 + tMove;
                        } else if (move < bMove) {
                            t /= 20;
                            move = (move - bMove) / 10 + bMove;
                        }
                    
                        target.style.top = move + "px";
                        setTimeout(inertiaMove, 10);
                }
 
                inertiaMove();
            })(v, nowTime, contentY);
            move = 0;
            flg = false;
        }
 
        //操作结束
        /**
         *相关初始化
         */
        //初始化结束
    },
    otherInteract : function() {
        //其他功能扩充
    }
}