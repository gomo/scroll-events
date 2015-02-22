## scroll-events

縦方向のスクロールスタート、横方向のスクロールスタート、スクロールの停止を知らせるイベントです。


```js
$(function(){
    $('.contents').observeScrollEvents({
        stopObserveInterval: 100,  //ストップイベント監視用タイマーのインターバル（ms）
        warpAllowance: 10,         //縦方向のスタートイベントの遊び
        weftAllowance: 10          //横方向のスタートイベントの遊び
    });

    //縦方向のスクロールスタートイベント
    $('.contents').on('warp-scroll-start', function(e, params){
        console.log('warp-scroll-start', e, params);
    });

    //横方向のスクロールスタートイベント
    $('.contents').on('weft-scroll-start', function(e, params){
        console.log('weft-scroll-start', e, params);
    });

    //スクロールストップ
    $('.contents').on('scroll-stop', function(e, params){
        console.log('scroll-stop', e, params);
    });
});
```