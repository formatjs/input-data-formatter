/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

(function( s ) {

  var _isAutoFormatEnabled, _isModifierKey,
    _format,
    _formatHandler,
    _getSepatarorIndex, _getSepatarorPattern,
    _enableFormatting,
    _getFormattedValue;

  _isAutoFormatEnabled = function(e) {
    var keyCode = e.keyCode;
    //debugger;
    if(!keyCode) {
      return true;
    } else if(keyCode >= 48 && keyCode <= 90 || keyCode >= 96 && keyCode <= 105) {
      return true;
    }
    return false;
  };

  _isModifierKey = function(e) {
    var keyCode = e.keyCode;
    if(keyCode >= 8 && keyCode <= 46) {
      return true;
    }
    return false;
  };

  _format = function(value, separator, separatorIndex, separatorPattern, caretIndex, lastCharTypedIsSeparator) {
    var valueLength = value.length,
      unFormattedValue = value.replace(separatorPattern, ''),
      expectedValueArray = unFormattedValue.split('');

    if(lastCharTypedIsSeparator) {
      caretIndex -= 1;
    }
    for( var i = 0, l = separatorIndex.length; i < l; i+=1 ) {
      if(expectedValueArray.length >= separatorIndex[i]) {
        expectedValueArray.splice(separatorIndex[i], 0, separator[i]);
        if(lastCharTypedIsSeparator) {
          continue;
        }
        if(caretIndex >= valueLength) {
          caretIndex += 1;
        }
        if(caretIndex === separatorIndex[i] + 1) {
          caretIndex += 1;
        }
      }
    }
    return {
      value : expectedValueArray.join(''),
      caretIndex : caretIndex
    };
  };

  _formatHandler = function(separator, separatorIndex, separatorPattern, formatLength, e){
    var caretIndex = this.selectionStart,
      value = this.value,
      lastCharTyped = value.charAt(caretIndex -1),
      lastCharTypedIsSeparator = separator.indexOf(lastCharTyped) !== -1 ? 1:0;

    if( (lastCharTypedIsSeparator && !_isModifierKey(e) ) || _isAutoFormatEnabled(e) ) {

      var result = _format(value, separator, separatorIndex, separatorPattern, caretIndex, lastCharTypedIsSeparator);
      this.value = result.value.substr(0, formatLength);

      if(e.type) {
        this.selectionStart = result.caretIndex;
        this.selectionEnd = result.caretIndex;
      }
    }
  };

  _getSepatarorIndex = function(separator, format) {
    var separatorIndex = [],
      currentSeparatorIndex = -1;

    for(var i = 0, l = separator.length; i < l; i+=1) {
      currentSeparatorIndex = format.indexOf(separator[i], currentSeparatorIndex+1);
      separatorIndex.push(currentSeparatorIndex);
    }
    return separatorIndex;
  };

  _getSepatarorPattern = function(separator) {
    var separatorPattern = '(';

    for ( var index = 0, length = separator.length; index < length; index += 1 ) {
      if(index > 0) {
        separatorPattern = separatorPattern + '|';
      }
      separatorPattern = separatorPattern + '\\' + separator[index];
    }

    separatorPattern = separatorPattern + ')';
    return new RegExp(separatorPattern, 'g');
  };

  _enableFormatting = function(target) {
    var value = target.value,
      format = target.getAttribute('data-format'),
      formatLength = format.length,
      separator = format.match(/[^X]/g) || [],
      separatorIndex,
      separatorPattern;

    target.removeEventListener('keyup', _formatHandler);

    if(formatLength) {
      target.setAttribute('maxLength', formatLength);

      separatorIndex = _getSepatarorIndex(separator, format);

      separatorPattern = _getSepatarorPattern(separator);
      target.addEventListener('keyup', _formatHandler.bind(target, separator, separatorIndex, separatorPattern, formatLength));

      if(value !== '') {
        _formatHandler.call(target, separator, separatorIndex, separatorPattern, formatLength, {});
      }
    }
  };

  _getFormattedValue = function(value, format) {
    var formatLength =  format ? format.length : 0,
      separator = format ? format.match(/[^X]/g) : [],
      separatorIndex,
      separatorPattern;

    if(formatLength && value !== '') {
      separatorIndex = _getSepatarorIndex(separator, format);

      separatorPattern = _getSepatarorPattern(separator);

      return _format(value, separator, separatorIndex, separatorPattern).value;
    }
    return value;
  };

  s.inputFormatter = {
    enableFormatting : _enableFormatting,
    getFormattedValue : _getFormattedValue
  };

}(window));

/* global window */
//window.inputFormatter.enableFormatting(document.querySelector('#mobile-number'));
