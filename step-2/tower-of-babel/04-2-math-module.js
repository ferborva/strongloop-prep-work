/*

Module to translate to ES6
--------------------------

    exports.PI = 3.141592;
    
    var _sqrt = function(s, x, last){
      return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
    };
    exports.sqrt = function(s){
      return _sqrt(s, s/2.0, 0.0);
    };
    exports.square = function(x) {
      return x * x;
    };

 */

'use strict';

const PI = 3.141592;

const sqrt = (s) => {
	return Math.sqrt(s, s/2, 0.0);
};

const square = (x) => { return x * x };

export const publicAPI = {
	PI,
	sqrt,
	square
};