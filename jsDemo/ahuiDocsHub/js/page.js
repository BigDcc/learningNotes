/**
 * Created by  prettyRain on 2018/11/22.
 */
//分页对象 存放：当前页、总页数、当前页数据、每页显示几天
function PageBean(currentPage) {
    this.currentPage = currentPage;
    this.list = [];
    this.totalPage;
    this.config = {
        pageSize: 6,
        obj: window.document.querySelector("#content"),
        flootpages: document.querySelector("#flootpages")
    }

}

PageBean.prototype = {
    //拼接数据
    clientPage: function (currentPage) {
        if (!!currentPage) {
            this.currentPage = currentPage;
        }
        this.list = [];
        this.serverPage(function (that) {
            var list = that.list;

            //拼接当页数据
            var str = '';
            for (i in list) {
                str += '<li>' +
                    '<span>' + list[i].firstName + '</span>' +
                    '<span>' + list[i].middleName + '</span>' +
                    '<span class="sc">收藏|移除</span>' +
                    '</li>';
            }
            that.config.obj.innerHTML = str;

            //拼接页码
            var pagestr = '';
            //上一页
            if (parseInt(that.currentPage) > 1) {
                pagestr += '<li class="page_item" onclick = "toPage(' + (parseInt(that.currentPage) - 1) + ')">＜上一页</li>'
            }
            //中间页数
            var startPage = parseInt(that.currentPage - 2) > 1 ? parseInt(that.currentPage - 2) : 1;
            var endPage = parseInt(that.totalpages) - parseInt(that.currentPage) > 3 ? (parseInt(that.currentPage) + 3) : parseInt(that.totalpages);
            for (var i = startPage; i <= endPage; i++) {
                if (parseInt(that.currentPage) == i) {
                    pagestr += '<li class="current page_item">' + i + '</li>';
                } else {
                    pagestr += '<li class="page_item" onclick="toPage(' + i + ')">' + i + '</li>';
                }
            }
            //下一页
            if (parseInt(that.currentPage) < parseInt(that.totalpages)) {
                pagestr += '<li class="page_item" onclick = "toPage(' + (parseInt(that.currentPage) + 1) + ')">＜下一页</li>';
            }
            that.config.flootpages.innerHTML = pagestr;
        });
    },
    //请求数据
    serverPage: function (fn) {
        var httpRequest;
        var this_ = this;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (httpRequest != null) {
            httpRequest.onreadystatechange = function (data) {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var resultJson = JSON.parse(data.currentTarget.responseText);
                    //计算出总页数
                    this_.totalpages = resultJson.programmers.length % parseInt(this_.config.pageSize) == 0 ? resultJson.programmers.length / parseInt(this_.config.pageSize) : parseInt(resultJson.programmers.length / parseInt(this_.config.pageSize)) + 1;
                    //取出当前页要显示的数据
                    var startNum = (parseInt(this_.currentPage) - 1) * parseInt(this_.config.pageSize);
                    var endNum = parseInt(this_.currentPage) * parseInt(this_.config.pageSize);

                    for (var i = startNum; i < endNum; i++) {
                        this_.list.push(resultJson.programmers[i]);
                    }
                    //执行回调
                    fn && fn(this_);
                }
            };
            httpRequest.open("GET", "../demo/index.json", true);
            httpRequest.send(null);
        }
    }
}
// 初始化数据
var pb = new PageBean(1);

function toPage(currentPage) {
    pb.clientPage(currentPage);
}
//执行分页
toPage();