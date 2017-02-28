define([], function () {
    return {
        page: 1,
        offset: 15,
        init: function () {
            var that = this;
            $.getJSON("/photo/output.json", function (data) {
                that.render(that.page, data);

                that.scroll(data);
            });
            // that.bind();
        },

        render: function (page, data) {
            var that = this;
            var begin = (page - 1) * this.offset;
            var end = page * this.offset;
            if (begin >= data.length) return;
            var html, li = "";
            for (var i = begin; i < end && i < data.length; i++) {
                li += '<li><div class="img-box">' +
                    '<a class="img-bg" rel="example_group" href="http://odfrbfqhf.bkt.clouddn.com/' + data[i] + '?raw=true"></a>' +
                    '<img lazy-src="http://odfrbfqhf.bkt.clouddn.com/' + data[i] + '?imageView2/1/w/130/h/130/q/70&raw=true" />' +
                    '</li>';
            }

            $(".img-box-ul").append(li);
            $(".img-box-ul").lazyload();
            // that.changeSize();
            $("a[rel=example_group]").fancybox();
        },

        scroll: function (data) {
            var that = this;
            $(window).scroll(function() {
                var windowPageYOffset = window.pageYOffset;
                var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                var sensitivity = 0;

                var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                    that.render(++that.page, data);
                }
            })
        },

        changeSize: function () {
            if($(document).width() <= 600){
                $(".img-box").css({"width":"auto", "height":"auto"});
            }else{
                var width = $(".img-box-ul").width();
                var size = Math.max(width*0.26, 157);
                $(".img-box").width(size).height(size);
            }
        },

        bind: function() {
            var that = this;
            $(window).resize(function(){
                that.changeSize();
            });
        }
    }
});
