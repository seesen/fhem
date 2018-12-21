

function getClock() {
	

	
    var d = new Date();
    nhour = d.getHours();
    nmin = d.getMinutes();
	nmonth = d.getMonth()+1;
	nday = d.getDate();
    
	var weekday = new Array(7);
    weekday[0] = "So";
    weekday[1] = "Mo";
    weekday[2] = "Di";
    weekday[3] = "Mi";
    weekday[4] = "Do";
    weekday[5] = "Fr";
    weekday[6] = "Sa";

    var n = weekday[d.getDay()];
	
    if (nhour <= 9) {
        nhour = '0' + nhour;
    }

    if (nmin <= 9) {
        nmin = '0' + nmin;
    }
	
	nday = nday > 9 ? nday : "0" + nday;
	nmonth = nmonth > 9 ? nmonth : "0" + nmonth;

	document.getElementById('clock').innerHTML = nhour + ':' + nmin + '<br>'+ n + ' ' + nday + '.' + nmonth;


    setTimeout(getClock, 1000);
}

   

jQuery(document).ready(function ($) {
	
	
	
    var themeVersion = '1.0';

    // Check für JS-Installation entfernen
    $('#hdr').addClass('js-installed');

    // Add version to logo
    $('#logo').append(
        $('<span class="theme-version">' + themeVersion + '</span>')
    ).append(
        $('<span id="clock"></span>')
    );

	$('').append(
        $('<span class="theme-version">' + themeVersion + '</span>')
    );
	
    // Add clock
    window.addEventListener('load', getClock, false);

	// Clear spaces
    $('#content .devType, #menu .room a').each(function() {
    	$(this).html($(this).html().replace(/&nbsp;/g, ''));
    });

    $('#content > br').remove();
    $('.makeSelect').parent().find('br').remove();

    // Add missing classes for elements
    $('.SVGplot').prevAll('a').addClass('plot-nav');

    // Icon selection
    $('button.dist').wrapAll('<div class="icons"/>');
    $('button.dist').css({width: '50px', height: '50px', margin: '5px', padding: '0'});
    $('button.dist > *').css({maxWidth: '40px', maxHeight: '40px', display: 'block', margin: '0px auto'});

    $('input[type=text][name=icon-filter]').keyup(function() {
        var val = $(this).val().toLowerCase();
        if (val.length === 0) {
            jQuery('button.dist').show();
        } else {
            jQuery('button.dist').hide().filter(function() {
                return $(this).attr('title').toLowerCase().indexOf(val) > -1;
            }).show();
        }
    });

    // Links in der Navigation hinzufügen
    var $navElement = jQuery('#menu .room').last().find('tbody');

    $navElement.append(
        $('<tr><td><div><a class="custom-menu-entry" href="https://github.com/Vaddi-fhem/fhemholostyle/issues">Theme-Fehler melden (v' + themeVersion + ')</a></div></td></tr>')
    );

    // Automatische Breite für HDR Input
    $('#hdr input.maininput').css({width: $('#content').width() + 'px'});
    $(window).resize(function() {
        $('#hdr input.maininput').css({width: $('#content').width() + 'px'});
    });

    // Klick auf Error-Message blendet diese aus
    $('body').on('click', '#errmsg', function() {
        $(this).hide();
    });

    $('.roomoverview .col1, .makeTable .col1').each(function(index) {
        $(this).parent().addClass('first-table-column');
    });

    // hide elements by name
    if (document.URL.indexOf("showall") != -1) {
        //don't hide anything
    } else {
        $("div.devType:contains('-hidden')").parent('td').hide();
    }

    (function($, window, document, undefined) {
        'use strict';

        var elSelector = '#hdr, #logo',
            elClassHidden = 'header--hidden',
            throttleTimeout = 50,
            $element = $(elSelector);

        if (!$element.length) return true;

        var $window = $(window),
            wHeight = 0,
            wScrollCurrent = 0,
            wScrollBefore = 0,
            wScrollDiff = 0,
            $document = $(document),
            dHeight = 0,
            throttle = function(delay, fn) {
                var last, deferTimer;
                return function() {
                    var context = this, args = arguments, now = +new Date;
                    if(last && now < last + delay) {
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(
                            function() {
                                last = now;
                                fn.apply(context, args);
                            },
                            delay
                        );
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            };

        $window.on('scroll', throttle(throttleTimeout, function() {
            dHeight = $document.height();
            wHeight	= $window.height();
            wScrollCurrent = $window.scrollTop();
            wScrollDiff = wScrollBefore - wScrollCurrent;

            if (wScrollCurrent <= 50) {
                $element.removeClass(elClassHidden);
            } else if (wScrollDiff > 0 && $element.hasClass(elClassHidden)) {
                $element.removeClass(elClassHidden);
            } else if (wScrollDiff < 0) {
                if (wScrollCurrent + wHeight >= dHeight && $element.hasClass(elClassHidden)) {
                    $element.removeClass(elClassHidden);
                } else {
                    $element.addClass(elClassHidden);
                }
            }

            wScrollBefore = wScrollCurrent;
        }));

    })(jQuery, window, document);
});

