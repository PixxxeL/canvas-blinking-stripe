#Canvas Blinking Stripe

Blinking Stripe on image with alpha using canvas

## Preview

http://www.pixel-tyumen.ru/works/canvas-blinking-stripe/

## Usage

For usage of this javascript module must define some HTML in content block:
```html
<a id="header-logo-container" href="/" title="Íà ãëàâíóþ">
    <img src="path-to-your-image-with-alpha-possible.png" alt="">
</a>
```
and add:
```html
<script src="path-to-module/canvas-blinking-stripe.js"></script>
<script>
$( function () {
    BlinkingStripe({$container : $('#header-logo-container')}).run();
});
</script>
```
This module required jQuery lib.

## Available

In browsers that canvas supported (IE > 8, FF, Chrome, Opera, Safari etc)
