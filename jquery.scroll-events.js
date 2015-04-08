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
            return this.each(function(){
                var timer, topPos, leftPos, warpStarted, weftStarted;
                $(this).on('scroll', function(e){
                    var elem = $(this);
                    clearTimeout(timer);

                    var currentTop = elem.scrollTop();
                    var currentLeft = elem.scrollLeft();

                    //縦方向のスタート位置を記憶
                    if(topPos === undefined){
                        topPos = currentTop;
                    }

                    //横方向のスタート位置を記憶
                    if(leftPos === undefined){
                        leftPos = currentLeft;
                    }

                    //縦方向のスタートイベント発火
                    if(Math.abs(topPos - currentTop) > options.warpAllowance && !warpStarted){
                        warpStarted = true;
                        elem.trigger('warp-scroll-start', {top: currentTop, left: currentLeft});
                    }

                    //横方向のスタートイベント発火
                    if(Math.abs(leftPos - currentLeft) > options.weftAllowance && !weftStarted){
                        weftStarted = true;
                        elem.trigger('weft-scroll-start', {top: currentTop, left: currentLeft});
                    }

                    //ストップイベント監視タイマー
                    timer = setTimeout(function() {
                        if(warpStarted || weftStarted){
                            elem.trigger('scroll-stop', {top: currentTop, left: currentLeft});
                        }

                        //監視用変数クリア
                        timer = undefined;
                        topPos = undefined;
                        leftPos = undefined;
                        warpStarted = undefined;
                        weftStarted = undefined;
                    }, options.stopObserveInterval)
                });
            });


        }
    });
})(jQuery);