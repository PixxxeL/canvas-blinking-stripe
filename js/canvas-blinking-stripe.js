/**
 * Blinking Stripe on image with alpha using canvas
 * 
 * Released under the GPL license
 * 
 * @author   piksel@mail.ru
 * @date     2013-03-09
 * @updated  2014-04-24
 * @required jQuery
 * @usage    BlinkingStripe({$container : $('#some-container-with-image')}).run();
 * @param    options
 *         $container    container with image inside
 *         minDelay    in ms
 *         maxDelay    in ms
 * @return    that
 * @version 1.1
 * 
 * jslint bitwise: true, white: true, browser: true
 */
var BlinkingStripe = function (options) {

    'use strict';

    var that = {},
        $container = options.$container,
        isCanvasSupported = !!window.HTMLCanvasElement,
        $canvas = null,
        ctx = null,
        canvasWidth = $container.width(),
        canvasHeight = $container.height(),
        $logoImg = $container.find('img'),
        logoWidth = $logoImg.width(),
        logoHeight = $logoImg.height(),
        stripe = null,
        toRad = Math.PI / 180,
        angle = -45 * toRad,
        dx = -90, // -90, 60
        delay = 30,
        minDelay = options.minDelay || 3000,
        maxDelay = options.maxDelay || 3000,
        delayRand = function () {
            return (Math.random() * maxDelay + minDelay) >> 0;
        },
        draw = function () {
            dx += 5;
            delay = 30;
            if (dx > 60) {
                dx = -90;
                delay = delayRand();
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();
            ctx.save();
            ctx.rotate(angle);
            ctx.scale(2, 2);
            ctx.translate(dx, 0);
            ctx.fillStyle = stripe;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.restore();
            ctx.globalCompositeOperation = 'destination-atop';
            ctx.drawImage(
                $logoImg[0], 
                (canvasWidth - logoWidth) * 0.5, 
                (canvasHeight - logoHeight) * 0.5
            );
            ctx.restore();
            setTimeout(draw, delay);
        },
        awaitingLoading = function () {
            logoWidth = $logoImg.width();
            logoHeight = $logoImg.height();
            if (logoWidth && logoHeight) {
                draw();
            } else {
            	setTimeout(awaitingLoading, 100);
            }
        };
    that.run = function () {
        if (!isCanvasSupported) {
            return;
        }
        $canvas = $('<canvas\/>').attr({'width': canvasWidth, 'height': canvasHeight});
        ctx = $canvas[0].getContext("2d");
        $logoImg.hide();
        $container.append($canvas);
        stripe = ctx.createLinearGradient(0, 0, 50, 0);
        stripe.addColorStop(  0, 'rgba(255,255,255,0)');
        stripe.addColorStop(0.5, 'rgba(255,255,255,1)');
        stripe.addColorStop(  1, 'rgba(255,255,255,0)');
        awaitingLoading();
    };
    return that;
};
