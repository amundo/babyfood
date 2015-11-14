/*! https://mths.be/array-from v0.2.0 by @mathias */
if (!Array.from) {
	(function() {
		'use strict';
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements.
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result || function put(object, key, descriptor) {
				object[key] = descriptor.value;
			};
		}());
		var toStr = Object.prototype.toString;
		var isCallable = function(fn) {
			// In a perfect world, the `typeof` check would be sufficient. However,
			// in Chrome 1–12, `typeof /x/ == 'object'`, and in IE 6–8
			// `typeof alert == 'object'` and similar for other host objects.
			return typeof fn == 'function' || toStr.call(fn) == '[object Function]';
		};
		var toInteger = function(value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number == 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function(value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};
		var from = function(arrayLike) {
			var C = this;
			if (arrayLike == null) {
				throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
			}
			var items = Object(arrayLike);
			var mapping = arguments.length > 1;

			var mapFn, T;
			if (arguments.length > 1) {
				mapFn = arguments[1];
				if (!isCallable(mapFn)) {
					throw new TypeError('When provided, the second argument to `Array.from` must be a function');
				}
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			var len = toLength(items.length);
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);
			var k = 0;
			var kValue, mappedValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					mappedValue = typeof T == 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					mappedValue = kValue;
				}
				defineProperty(A, k, {
					'value': mappedValue,
					'configurable': true,
					'enumerable': true,
					'writable': true
				});
				++k;
			}
			A.length = len;
			return A;
		};
		defineProperty(Array, 'from', {
			'value': from,
			'configurable': true,
			'writable': true
		});
	}());
}


window.app = {
  "data": [
    {
      "name": "fruit",
      "times": "2",
      "src": "fruit.jpg"
    },
    {
      "name": "citrus",
      "times": "1",
      "src": "citrus.png"
    },
    {
      "name": "lean protein",
      "times": "4",
      "src": "protein.png"
    },
    {
      "name": "8oz water",
      "times": "8",
      "src": "water.png"
    },
    {
      "name": "connect with partner",
      "times": "1",
      "src": "holdinghands.png"
    },
    {
      "name": "sleep and rest",
      "times": "1",
      "src": "catnap.png"
    },
    {
      "name": "connect with baby",
      "times": "1",
      "src": "baby.png"
    },
    {
      "name": "calcium-rich food",
      "times": "4",
      "src": "calcium.png"
    },
    {
      "name": "dark green veggies",
      "times": "3",
      "src": "greens.png"
    },
    {
      "name": "100% whole grains",
      "times": "4",
      "src": "grains.png"
    },
    {
      "name": "bright red or yellow veggies",
      "times": "2",
      "src": "redyellow.png"
    },
    {
      "name": "omega supplement",
      "times": "1",
      "src": "omega3.jpg"
    },
    {
      "name": "prenatal vitamin",
      "times": "1",
      "src": "vitamins.jpg"
    },
    {
      "name": "exercise and sunshine",
      "times": "1",
      "src": "x"
    },
    {
      "name": "hugs and kisses",
      "times": "1",
      "src": "x"
    },
    {
      "name": "kegels and squats",
      "times": "1",
      "src": "squat.jpg"
    },
    {
      "name": "2 tbsp healthy oil",
      "times": "1",
      "src": "oil.png"
    },
    {
      "name": "2 tbsp liquid chlorophyll",
      "times": "1",
      "src": "chlorophyll.jpg"
    },
    {
      "name": "visualize birth",
      "times": "1",
      "src": "eyes.png"
    },
    {
      "name": "red raspberry or pregnancy tea",
      "times": "1",
      "src": "raspberry.jpg"
    }
  ]
}



var renderFood = function(food){
 var checkboxes = `<input value="${food.times}" type="checkbox">\n`.repeat(food.times);
return `
<div data-background="${food.src}">
  <h2>${food.name}</h2>
  ${checkboxes}
</div>

`
}

var renderImages = () => {
  var divs = Array.from(document.body.querySelectorAll('div'));

  divs.forEach(d => {
    var src =  d.dataset.background;
    d.style.backgroundImage = `url(img/${src})`;
  })
}

var render = foods => {
  document.body.insertAdjacentHTML('beforeend', foods.map(renderFood).join('\n'));
  renderImages();
}

document.addEventListener('DOMContentLoaded', function(){
  render(app.data)
})

