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
    move(2);
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

    //获取
    var carouselLiNodes = document.querySelectorAll('.home-carousel li');
    var pointLiNodes = document.querySelectorAll('.home-point li');
    var homeNode = document.querySelector('.Home');

    var timer = null;
    var lastIndex = 0;
    var lastTime = 0;
    var nowIndex = 0;
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



}