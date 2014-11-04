input-data-formatter
---

Format as you type.

* phone number ```(XXX) XXX-XXXX, XXXXX-XXXXX```
* credit card number ```XXXX XXXX XXXX XXXX, XXXX XXXXXX XXXXX```
* date ```DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD```

Usage:

```html
<input type="tel" id="mobile-number" value="1234567890" data-format="(XXX) XXX-XXXX">
<script src="path/to/input-data-formatter.js"></script>
<script>
var mobileNumber = document.getElementById('mobile-number');
inputFormatter.enableFormatting(mobileNumber);
</script>
```

Compatible browsers:

* Chrome latest (desktop, iOS and Android)
* Safari latest (desktop and iOS)
* FireFox (desktop)
* IE 9+ (desktop)
* Opera (desktop)

API:

* enableFormatting
```js
// target = document.getElementById('mobile-number');
window.inputFormatter.enableFormatting (target);
```

* getFormattedValue
```js
// value = '1234567890';
// format = '(XXX) XXX-XXXX';
window.inputFormatter.getFormattedValue (value, format)
```
