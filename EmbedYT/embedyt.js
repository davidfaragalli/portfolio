(function ($) {
    $.fn.extend({
        EmbedYT: function (params) {
            if (!params.video_id || !params.width || !params.height) {
                console.log('EmbedYT: 1 or more required fields are undefined.  Please verify below:');
                console.log('EmbedYT: video_id: - ' + params.video_id);
                console.log('EmbedYT: width: - ' + params.width);
                console.log('EmbedYT: height: - ' + params.height);
                return;
            }
            var defaults = {
                autohide: 2,
                autoplay: 0,
                color: 'red',
                controls: 1,
                fs: 1,
                iv_load_policy: 3,
                loop: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                theme: 'dark',
                version: 3,
                wmode: 'opaque'
            };
            var $this = $(this);
            $.extend(defaults, params);
            var so = swfobject;
            var ua = navigator.userAgent.toLowerCase();
            var fVersion = '8';
            var url = 'http://www.youtube.com/v/' + defaults.video_id;
            var par = {
                allowScriptAccess: 'always',
                wmode: defaults.wmode,
                allowFullScreen: Boolean(defaults.fs)
            };
            var att = {};
            var p = '?';
            $.each(defaults, function (key, val) {
                if (key !== 'video_id' && key !== 'width' && key !== 'height') {
                    url += p + key + '=' + val;
                    p = '&';
                }
            })
            if (ua.indexOf('ipad') != -1 || ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1) {
                var fn = function () {
                    att = {
                        data: url,
                        width: defaults.width,
                        height: defaults.height
                    };
                    var myObject = so.createSWF(att, par, $this.attr('id'));
                };
                so.addDomLoadEvent(fn);
            } else {
                so.embedSWF(url, $this.attr('id'), defaults.width, defaults.height, fVersion, null, null, par, att);
            }
            $this.show();
        }
    })
})(jQuery);