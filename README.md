# RUDN__PoorVisionModule

## JS
You need to connect `jQuery` and `jquery.vmPVD.js` to the footer.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="jquery.vmPVD.js"></script>
```
## Css
For styling the special version you should use the spec.css file, that will be automatically generated.

## Call the plugin
```javascript
$( document ).ready( function(){
   $( '.activate-pvm-module-button' ).vmPVD();
 });
```

## Settings
The module receive object with 2 callback function: activated and deactivated. You can initialized and destroyed other plugins in this callbacks.
```javascript
$( document ).ready( function(){
   $( '.activate-pvm-module' ).vmPVD(
      activated: function () {
        otherPlugin1('reinit');
        otherPlugin2('destroy');
      },
      deactivated: function () {
        otherPlugin1('reinit');
        otherPlugin2('init');
      }
   );
 });
```

## Preloader
To hide the user from drawing page elements while the module is running, you can add a preloader.

To install the preloader at the top of the page, just after the `<body>` tag, you need to add the following code:
```html
<script src="pvm/pvdPreloader.js"></script> 
```

## Compatibility
+ Chrome
+ Firefox
+ Opera
+ IE9 / 10/11 / eage
