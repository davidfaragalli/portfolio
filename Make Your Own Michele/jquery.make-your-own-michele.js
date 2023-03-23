$(document).ready(function () {
    var
    styles = {
        '373992': "'Deco Diamond' Diamond Dial Case, <b>$1,695</b>",
        '373992_1': "'Deco Diamond' Diamond Dial Gold Case, <b>$1,945</b>",
        '373998': "'Deco Diamond' Diamond Dial Two-Tone Case, <b>$1,845</b>",
        '275731': "'Deco' Diamond Dial Case, <b>$695</b>",
        '275731_2': "'Deco' Diamond Dial Gold Case, <b>$945</b>",
        '543328': "'Deco' Diamond Dial Two-Tone Case, <b>$845</b>",
        '177624': "'Deco' 18mm Stainless Steel Bracelet Band, <b>$300</b>",
        '177624_1': "'Deco' 18mm Two-Tone Bracelet Band, <b>$500</b>",
        '9463': "'Deco' 18mm Gold-Plated Bracelet Band, <b>$700</b>",
        '210619': "'Deco 3 Diamond' 18mm Bracelet Band, <b>$900</b>",
        '63423_12': "18mm White Alligator Strap, <b>$200</b>",
        '63423_13': "18mm Black Alligator Strap, <b>$200</b>",
        '63423_14': "18mm Garnet Alligator Strap, <b>$200</b>",
        '63423_15': "18mm Navy Alligator Strap, <b>$200</b>",
        '11867_8': "18mm Black Patent Leather Strap, <b>$100</b>",
        '11867_9': "18mm White Patent Leather Strap, <b>$100</b>",
        '11867_10': "18mm Scarlet Patent Leather Strap, <b>$100</b>",
        '11867_11': "18mm Espresso Patent Leather Strap, <b>$100</b>",
        '11867_12': "18mm Navy Patent Leather Strap, <b>$100</b>",
        '253529_1': "18mm Whisper White Quilted Leather Strap, <b>$120</b>",
        '253529_2': "18mm Black Quilted Leather Strap, <b>$120</b>",
        '504082': "18mm Saddle Leather Strap, <b>$100</b>"
    }, dictionary = {
            '373992': {
                '177624': '3658078',
                '210619': '3658102',
                '63423_12': '3658107',
                '63423_13': '3658113',
                '63423_14': '3658126',
                '63423_15': '3658136',
                '11867_8': '3658149',
                '11867_9': '3658159',
                '11867_10': '3658171',
                '11867_12': '3658194',
                '253529_1': '3658211',
                '253529_2': '3658224'
            },
            '373992_1': {
                '9463': '3658082',
                '63423_12': '3658109',
                '63423_13': '3658114',
                '63423_14': '3658129',
                '63423_15': '3658141',
                '11867_8': '3658152',
                '11867_9': '3658161',
                '11867_10': '3658172',
                '253529_1': '3658212',
                '253529_2': '3658225'
            },
            '373998': {
                '177624_1': '3658079',
                '210619': '3658105',
                '63423_12': '3658112',
                '63423_13': '3658117',
                '63423_14': '3658133',
                '63423_15': '3658145',
                '11867_8': '3658155',
                '11867_9': '3658162',
                '11867_10': '3658173',
                '11867_12': '3658195',
                '253529_1': '3658214',
                '253529_2': '3658227'
            },
            '275731': {
                '177624': '3658080',
                '63423_13': '3658118',
                '11867_8': '3658156',
                '11867_9': '3658164',
                '11867_10': '3658175',
                '11867_11': '3658185',
                '11867_12': '3658207',
                '253529_1': '3658216',
                '253529_2': '3658228',
                '504082': '3658232'
            },
            '275731_2': {
                '9463': '3658098',
                '63423_13': '3658124',
                '11867_8': '3658157',
                '11867_9': '3658165',
                '11867_10': '3658176',
                '11867_11': '3658189',
                '11867_12': '3658209',
                '253529_1': '3658219',
                '253529_2': '3658229',
                '504082': '3658233'
            },
            '543328': {
                '177624': '3658252',
                '177624_1': '3658081',
                '63423_13': '3658125',
                '11867_8': '3658158',
                '11867_9': '3658166',
                '11867_10': '3658178',
                '11867_11': '3658192',
                '11867_12': '3658210',
                '253529_1': '3658221',
                '253529_2': '3658231',
                '504082': '3658234'
            }
        }, selected_body, selected_strap, selected_style, watch_link, $largeimage = $('.selection a'),
        $watchbody = $('.watch-body .link'),
        $watchstrap = $('.watch-strap .link'),
        $buybutton = $('.buy-button .link'),
        $casedesc = $('.choose-case .description'),
        $strapdesc = $('.choose-strap .description'),
        $popover = $('<div id="pop-over"><img class="cloud" src="' + PageParameters.imageUrl + 'default/shop/image/misc/make-your-own-michele/2013/1209/pop-over-sprite.png" alt="" /><div class="layer"><p>Please note that, while these items aren\'t sold as a combination, you can purchase the case and band separately. <a href="' + PageParameters.storeUrl + 'c/michele-watches?cm_sp=merch-_-acc_1209michelecustom-_-experiencepopover_shopall" title="Shop all MICHELE">Shop all MICHELE</a>.</p></div><a class="close-button"><img src="' + PageParameters.imageUrl + 'default/shop/image/misc/make-your-own-michele/2013/1209/pop-over-sprite.png" alt="" /></a></div>'),
        $closebutton = $popover.find('.close-button');
    var CloseClicked = function () {
        $popover.hide();
    };
    var BodyClicked = function () {
        selected_body = $(this).data('item-id');
        UpdateView();
    };
    var StrapClicked = function () {
        var $this = $(this);
        if ($this.attr('class').indexOf('unavailable') >= 0) {
            $this.parent().append($popover.show());
        } else {
            selected_strap = $this.data('item-id');
            UpdateView();
        }
    };
    var UpdateView = function () {
        $popover.hide();
        $watchstrap.removeClass('selected').addClass('unavailable');
        $watchbody.removeClass('selected').filter('[data-item-id="' + selected_body + '"]').addClass('selected');
        $casedesc.html(styles[selected_body]);
        $.each(dictionary[selected_body], function (i, v) {
            $watchstrap.filter('[data-item-id="' + i + '"]').removeClass('unavailable');
        });
        if (!dictionary[selected_body].hasOwnProperty(selected_strap)) {
            $.each($watchstrap, function (i, v) {
                var strapid = $(v).data('item-id');
                if (dictionary[selected_body].hasOwnProperty(strapid)) {
                    selected_strap = strapid;
                    return false;
                }
            });
        }
        $watchstrap.filter('[data-item-id="' + selected_strap + '"]').addClass('selected');
        $strapdesc.html(styles[selected_strap]);
        selected_style = dictionary[selected_body][selected_strap];
        watch_link = PageParameters.storeUrl + 's/' + selected_style;
        $buybutton.attr('href', watch_link);
        $largeimage.attr('href', watch_link).find('img').attr('src', PageParameters.imageUrl + 'default/shop/image/misc/make-your-own-michele/2013/1209/s' + selected_style + '.jpg');
    };
    $watchbody.on('click', BodyClicked);
    $watchstrap.on('click', StrapClicked);
    $closebutton.on('click', CloseClicked);
    $('.watch-body .link[data-item-id=373992]').trigger('click');
});