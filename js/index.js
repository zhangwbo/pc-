window.onload = function () {
    var liNodes = document.querySelectorAll('.nav li');
    var arrow = document.querySelector('.arrow');
    var downNodes = document.querySelectorAll('.down');
    var arrowWidth = arrow.offsetWidth/2;
    header();
    function header() {


        arrow.style.left = liNodes[0].offsetLeft + liNodes[0].offsetWidth/2
            - arrowWidth +'px';
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
    function move() {
        for (var j = 0; j < downNodes.length; j++) {
            downNodes[j].style.width = '0';

        }
        downNodes[nowIndex].style.width = '100%';
        //点击那个LI就让箭头到那个LI下面
        arrow.style.left = liNodes[nowIndex].offsetLeft + liNodes[nowIndex].offsetWidth/2
            - arrowWidth +'px';
        contentList.style.top = - nowIndex* contentHeight+'px';
    }

    var contentList = document.querySelector('.contentList');
    var content = document.querySelector('.content');
    var contentHeight = content.offsetHeight;
    var nowIndex = 0;
    var wheelTimer = null;

    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    function wheel(event) {
        event = event || window.event;
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
                    if(nowIndex >0){
                        nowIndex--;
                        move(nowIndex);
                    }
                    break;
                case 'down' :
                    if(nowIndex < 4){
                        nowIndex++;
                        move(nowIndex);
                    }
                    break;
            }
        },200)
        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

    window.onresize = function () {
        arrow.style.left = liNodes[nowIndex].offsetLeft + liNodes[nowIndex].offsetWidth/2
            - arrowWidth +'px';
        contentList.style.top = - nowIndex* contentHeight+'px';
    }



























































































}