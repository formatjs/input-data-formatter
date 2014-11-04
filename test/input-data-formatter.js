/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

describe('input data formatter', function() {
  var inputFormatter = window.inputFormatter;
  var input = document.createElement('input');
  document.body.appendChild(input);

  it('should have getFormattedValue function defined', function() {
    expect(inputFormatter.getFormattedValue).toBeDefined();
  });

  it('should have enableFormatting function defined', function() {
    expect(inputFormatter.enableFormatting).toBeDefined();
  });

  it('should format the 1234567890 in (XXX) XXX-XXXX format', function() {
    expect(inputFormatter.getFormattedValue('1234567890', '(XXX) XXX-XXXX')).toEqual('(123) 456-7890');
  });

  it('should format the input value (1234567890) in (XXX) XXX-XXXX format', function() {
    input.value = '1234567890';
    input.setAttribute('data-format', '(XXX) XXX-XXXX');
    inputFormatter.enableFormatting(input);
    expect(input.value).toEqual('(123) 456-7890');
  });

  it('should format the 1234567812345678 in XXXX XXXX XXXX XXXX format', function() {
    expect(inputFormatter.getFormattedValue('1234567812345678', 'XXXX XXXX XXXX XXXX')).toEqual('1234 5678 1234 5678');
  });

  it('should format the input value (1234567812345678) in XXXX XXXX XXXX XXXX format', function() {
    input.value = '1234567812345678';
    input.setAttribute('data-format', 'XXXX XXXX XXXX XXXX');
    inputFormatter.enableFormatting(input);
    expect(input.value).toEqual('1234 5678 1234 5678');
  });

  it('should format the 1234567890 in XXXXX-XXXXX format', function() {
    expect(inputFormatter.getFormattedValue('1234567890', 'XXXXX-XXXXX')).toEqual('12345-67890');
  });

  it('should format the input value (1234567890) in XXXXX-XXXXX format', function() {
    input.value = '1234567890';
    input.setAttribute('data-format', 'XXXXX-XXXXX');
    inputFormatter.enableFormatting(input);
    expect(input.value).toEqual('12345-67890');
  });

  it('should not format 1234567890 if not format is passed', function() {
    expect(inputFormatter.getFormattedValue('1234567890')).toEqual('1234567890');
  });

  it('should maxlength of the input to length of the string XXXXX-XXXXX', function() {
    input.setAttribute('data-format', 'XXXXX-XXXXX');
    inputFormatter.enableFormatting(input);
    expect(input.getAttribute('maxLength')).toEqual('11');
  });

  it('should partially format input value (12345) in (XXX) XXX-XXXX format', function() {
    input.setAttribute('data-format', '(XXX) XXX-XXXX');
    inputFormatter.enableFormatting(input);
    input.value = '(123) 456-';
    var e = new KeyboardEvent('keyup', {shiftKey : true, keyCode: 91});
    e.keyCode = 91;
    input.dispatchEvent(e);
    expect(input.value).toEqual('(123) 456-');
  });

});
