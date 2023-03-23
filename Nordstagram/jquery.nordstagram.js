(function ($) {
    $.fn.extend({
        Nordstagram: function (pars) {
            if (!pars.access_token || pars.access_token == '') {
                console.error('The required parameter "access_token" is missing.');
                return;
            }
            var
            ng = this,
                $this = $(ng),
                next_url = '',
                sizes = {
                    thumb: 'thumbnail',
                    low: 'low_resolution',
                    high: 'standard_resolution'
                }, methods = {
                    recent: 'users/self/media/recent',
                    liked: 'users/self/media/liked'
                }, defaults = {
                    size: 'thumb',
                    method: 'liked',
                    clickable: false,
                    linkOverride: '',
                    count: 10,
                    credit: false
                }, events = {
                    start: 'event_start',
                    success: 'event_success',
                    failure: 'event_failure',
                    complete: 'event_complete'
                }, params = {};
            maxLength = 25;
            $.extend(defaults, pars);
            params = {
                access_token: pars.access_token,
                count: defaults.count
            };
            ng.events = events;
            var GetFailed = function (error) {
                ng.trigger(events.failure, {
                    message: error
                });
            }
            var ShortenMe = function (text) {
                if (text.length > maxLength) {
                    text = text.substring(0, (maxLength - 3)) + '...';
                }
                return text;
            }
            var ParseResults = function (results) {
                ng.trigger(events.success);
                var
                size, hasNext = false,
                    $elements = $('<div />');
                $.each(results.data, function (index, set) {
                    size = set.images[sizes[defaults.size]].width;
                    $element = $('<div />', {
                        'class': 'nordstagram-element'
                    });
                    $element.append($('<img/>', {
                        'src': set.images[sizes[defaults.size]].url,
                        'alt': set.user.username,
                        'title': set.user.username
                    }));
                    if (defaults.credit) {
                        $element.append($('<p />', {
                            'text': ShortenMe(set.user.username),
                            'class': 'username'
                        }));
                    };
                    $elements.append($element);
                });
                $this.append($elements.children());
                if (results.pagination.next_url) {
                    next_url = results.pagination.next_url;
                    hasNext = true;
                }
                ng.trigger(events.complete, {
                    size: size,
                    hasNext: hasNext
                });
            }
            ng.Get = function (url) {
                ng.trigger(events.start);
                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: url,
                    success: ParseResults,
                    failure: GetFailed,
                    data: params
                });
            };
            ng.GetNext = function () {
                ng.Get(next_url);
            }
            if (!PageParameters.isPos) {
                ng.Get("https://api.instagram.com/v1/" + methods[defaults.method]);
            }
            return ng;
        }
    })
})(jQuery);