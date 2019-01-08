window.onload = function () {

    var liNodes = document.querySelectorAll('.nav li');
    var arrow = document.querySelector('.arrow');
    var downNodes = document.querySelectorAll('.down');
    var arrowWidth = arrow.offsetWidth / 2;

    var contentList = document.querySelector('.contentList');
    var content = document.querySelector('.content');
    var contentHeight = content.offsetHeight;
    var nowIndex = 0;
    var wheelTimer = null;

  var carouselLiNodes = document.querySelectorAll('.home-carousel li');
  var pointLiNodes = document.querySelectorAll('.home-point li');
  var homeNode = document.querySelector('.Home');

  var timer = null;
  var lastIndex = 0;
  var lastTime = 0;

    //头部JS
    header();
    function header() {
     arrow.style.left = liNodes[0].offsetLeft + liNodes[0].offsetWidth / 2
            - arrowWidth + 'px';
        downNodes[0].style.width = '100%';
        for (var i = 0; i < liNodes.length; i++) {
            //保存每一个LI的索引
            liNodes[i].index = i;
            //给每一个li添加单击事件
            liNodes[i].onclick = function () {
                nowIndex = this.index;
                move(this.index);
            }
        }
    }

    //公共移动函数
    move(1);
    function move(nowIndex) {
        for (var j = 0; j < downNodes.length; j++) {
            downNodes[j].style.width = '0';

        }
        downNodes[nowIndex].style.width = '100%';
        //点击那个LI就让箭头到那个LI下面
        arrow.style.left = liNodes[nowIndex].offsetLeft + liNodes[nowIndex].offsetWidth / 2
            - arrowWidth + 'px';
        contentList.style.top = - nowIndex * contentHeight + 'px';
    }


    //滚动事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll', wheel);
    function wheel(event) {
        event = event || window.event;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function () {
            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            }

            switch (flag) {
                case 'up' :
                    if (nowIndex > 0) {
                        nowIndex--;
                        move(nowIndex);
                    }
                    break;
                case 'down' :
                    if (nowIndex < 4) {
                        nowIndex++;
                        move(nowIndex);
                    }
                    break;
            }
        }, 200)
        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

    //优化窗口大小事件
    window.onresize = function () {
        arrow.style.left = liNodes[nowIndex].offsetLeft + liNodes[nowIndex].offsetWidth / 2
            - arrowWidth + 'px';
        contentList.style.top = -nowIndex * contentHeight + 'px';
    }

    //轮播图
    for (var i = 0; i < pointLiNodes.length; i++) {



        pointLiNodes[i].index = i;
        pointLiNodes[i].onclick = function () {
            //函数节流
            var nowTime = Date.now();
            if (nowTime - lastTime > 2000) return;
            lastTime = nowTime;

            nowIndex = this.index;

            if (nowIndex = lastIndex)return;

            if (nowIndex > lastIndex) {
                //右图出现
                carouselLiNodes[nowIndex].className = 'common-title rightShow';
                carouselLiNodes[lastIndex].className = 'common-title leftHide';
            } else {
                //左图出现
                carouselLiNodes[nowIndex].className = 'common-title leftShow';
                carouselLiNodes[lastIndex].className = 'common-title rightHide';
            }
            //小圆点切换
            pointLiNodes[lastIndex].className = '';
            this.className = 'active';
            lastIndex = this.index;
        }
    }

    //鼠标移入停止计时器
    homeNode.onmouseenter = function () {
        clearInterval(timer);
    };
    homeNode.onmouseleave = autoplay;

    //自动轮播
    autoplay();
    function autoplay() {
        timer = setInterval(function () {
            nowIndex++;
            if (nowIndex >= 4) nowIndex = 0;
            //右图出现
            carouselLiNodes[nowIndex].className = 'common-title rightShow';
            carouselLiNodes[lastIndex].className = 'common-title leftHide';
            //小圆点切换
            pointLiNodes[lastIndex].className = '';
            pointLiNodes[nowIndex].className = 'active';

            lastIndex = nowIndex;
        }, 2000)
    }

    //第五屏
  lastView();
  function lastView() {
    var teamUlNode = document.querySelector('.team-list');
    var teamLiNodes = document.querySelectorAll('.team-list li');

    var width = teamLiNodes[0].offsetWidth;
    var height = teamLiNodes[0].offsetHeight;

    var canvas = null;
    var createArcTimer = null;
    var paintingTimer = null;
    //给所有LI绑定移入事件
    for (var i = 0; i < teamLiNodes.length; i++) {
      teamLiNodes[i].index = i;
      teamLiNodes[i].onmouseenter = function () {
        for (var j = 0; j < teamLiNodes.length; j++) {
          teamLiNodes[j].style.opacity = 0.5;
        }
        this.style.opacity = 1;

        if(!canvas){
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.className = 'myCanvas';
          bubble(canvas);
          teamUlNode.appendChild(canvas);
        }
        canvas.style.left = this.index * width +'px';

      }
    }
    //给UL添加移出事件
    teamUlNode.onmouseleave = function () {
      for (var i = 0; i < teamLiNodes.length; i++) {
        teamLiNodes[i].style.opacity = 1;
      }
      canvas.remove();
      canvas = null;
      clearInterval(createArcTimer);
      clearInterval(paintingTimer);

    }
  }
    //气泡运动函数
  function bubble(canvas) {


    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    var arr = [];

    //生成圆
    createArcTimer = setInterval(function () {


      var r = Math.round(Math.random()*255);
      var g = Math.round(Math.random()*255);
      var b = Math.round(Math.random()*255);

      var c_r = Math.round(Math.random()*8+2);
      var s = Math.round(Math.random()*30+20);

      var x = Math.round(Math.random()*width);
      var y = height+c_r;
      arr.push({
        x:x,
        y:y,
        r:r,
        g:g,
        b:b,
        deg:0,
        c_r:c_r,
        s:s
      })

    },80);

    //画圆
    paintingTimer = setInterval(function () {
      ctx.clearRect(0,0,width,height);

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        item.deg += 4;
        var rad = item.deg * Math.PI / 180;
        var x = item.x + Math.sin(rad) * item.s;
        var y = item.y - rad*item.s;

        if(y <= -item.c_r){
          arr.splice(i,1);
          continue;
        }
        ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
        ctx.beginPath();
        ctx.arc(x,y,item.c_r,0,2*Math.PI);
        ctx.fill();
      }
    },1000/60)
  }























}