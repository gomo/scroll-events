/**
 * jQuery scroll-events
 * https://github.com/gomo/scroll-events
 *
 * Copyright (c) 2015 Masamoto Miyata
 * Licensed under the MIT.
 */

;(function($){
    "use strict";

    $.fn.extend({
        observeScrollEvents: function(options){
            //オプションデフォルト値
            options = $.extend({
                stopObserveInterval: 60,   //ストップイベント監視用タイマーのインターバル（ms）
                warpAllowance: 10,         //縦方向のスタートイベントの遊び
                weftAllowance: 10          //横方向のスタートイベントの遊び
            }, options);

            //監視用変数初期化
            this.each(function(){
                $(this).data('scrollEvents', {});
            });

            this.scroll(function(e){
                var elem = $(this);
                var data = elem.data('scrollEvents');
                clearTimeout(data.timer);

                var currentTop = elem.scrollTop();
                var currentLeft = elem.scrollLeft();

                //縦方向のスタート位置を記憶
                if(data.topPos === undefined){
                    data.topPos = currentTop;
                }

                //横方向のスタート位置を記憶
                if(data.leftPos === undefined){
                    data.leftPos = currentLeft;
                }

                //縦方向のスタートイベント発火
                if(Math.abs(data.topPos - currentTop) > options.warpAllowance && !data.warpStarted){
                    data.warpStarted = true;
                    elem.trigger('warp-scroll-start', {top: currentTop, left: currentLeft});
                }

                //横方向のスタートイベント発火
                if(Math.abs(data.leftPos - currentLeft) > options.weftAllowance && !data.weftStarted){
                    data.weftStarted = true;
                    elem.trigger('weft-scroll-start', {top: currentTop, left: currentLeft});
                }

                //ストップイベント監視タイマー
                data.timer = setTimeout(function() {
                    if(data.warpStarted || data.weftStarted){
                        elem.trigger('scroll-stop', {top: currentTop, left: currentLeft});
                    }

                    //監視用変数クリア
                    elem.data('scrollEvents', {});
                }, options.stopObserveInterval)
            });
        }
    });
})(jQuery);