"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.multipleFollowTouch = exports.singleFollowTouch = exports.singleTouch = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	@todo
	单点触摸 无跟随, singleTouch: 只支持单元素,只支持左右
	单点触摸 跟随, singleFollowTouch: 只支持单元素
	多点手势 跟随 multipleFollowTouch: 只支持单元素, 根据两指进行计算:两指直线距离

*/

/*
	事件对象:
	touches:  屏幕上手指列表
	targetTouches:	当前元素上手指列表
	changedTouches:	当前事件手指列表

*/

/*
	@逻辑参数:
		singleTouch:
			sFlag: 手指划动方向
			oDirective: 根据sFlag转换1/-1
			bEnd: 是否可以触发划动
		
	@extends:
		cancel_bubble:
			阻止默认的触摸事件
			目前 需要传递函数调用阻止

*/

var FN_NULL = function FN_NULL() {};
var DEFAULT_ARGUMENTS = {
	touchmove: FN_NULL,
	touchstart: FN_NULL,
	touchend: FN_NULL
};

var singleTouch = function singleTouch() {
	var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ARGUMENTS,
	    _ref$touchmove = _ref.touchmove,
	    touchmove = _ref$touchmove === undefined ? FN_NULL : _ref$touchmove,
	    _ref$touchstart = _ref.touchstart,
	    touchstart = _ref$touchstart === undefined ? FN_NULL : _ref$touchstart,
	    _ref$touchend = _ref.touchend,
	    touchend = _ref$touchend === undefined ? FN_NULL : _ref$touchend;

	var oDom = document.querySelector(dom),
	    oDirective = {
		"ltor": -1,
		"rtol": 1
	},
	    bEnd = false,
	    x = void 0,
	    sFlag = void 0;

	oDom.ontouchstart = function (e) {
		var oEvent = e || event;
		x = oEvent.changedTouches[0].clientX;
		touchstart(oEvent);
	};
	oDom.ontouchmove = function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
			var oEvent, cX;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							oEvent = e || event;

							if (!bEnd) {
								_context.next = 4;
								break;
							}

							x = oEvent.changedTouches[0].clientX;
							return _context.abrupt("return");

						case 4:
							bEnd = true;

							cX = oEvent.changedTouches[0].clientX;

							if (x - cX > 0) {
								sFlag = 'ltor';
							} else {
								sFlag = 'rtol';
							}
							x = cX;
							_context.next = 10;
							return new _promise2.default(function (resolve, reject) {
								touchmove(oDirective[sFlag], resolve, reject, oEvent);
							}).catch(function (err) {
								console.log(err);
							});

						case 10:

							bEnd = false;

						case 11:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function (_x3) {
			return _ref2.apply(this, arguments);
		};
	}();
	oDom.ontouchend = function (e) {
		var oEvent = e || event;
		x = null, sFlag = null;
		touchend(oEvent);
	};
};

var SINGLE_FOLLOW_TOUCH = function SINGLE_FOLLOW_TOUCH() {
	var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

	var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ARGUMENTS,
	    _ref3$touchmove = _ref3.touchmove,
	    touchmove = _ref3$touchmove === undefined ? FN_NULL : _ref3$touchmove,
	    _ref3$touchstart = _ref3.touchstart,
	    touchstart = _ref3$touchstart === undefined ? FN_NULL : _ref3$touchstart,
	    _ref3$touchend = _ref3.touchend,
	    touchend = _ref3$touchend === undefined ? FN_NULL : _ref3$touchend;

	var oDom = void 0,
	    x = void 0,
	    y = void 0;
	if (typeof dom === 'string') {
		oDom = document.querySelector(dom);
	} else {
		oDom = dom;
	}

	oDom.ontouchstart = function (e) {
		var oEvent = e || event;
		x = oEvent.changedTouches[0].clientX, y = oEvent.changedTouches[0].clientY;
		touchstart(oEvent);
	};
	oDom.ontouchmove = function (e) {
		var oEvent = e || event,
		    cX = oEvent.changedTouches[0].clientX,
		    cY = oEvent.changedTouches[0].clientY,
		    nX = void 0,
		    nY = void 0;
		nX = x - cX;
		nY = y - cY;
		touchmove({ x: nX, y: nY }, oEvent);

		x = cX, y = cY;
	};
	oDom.ontouchend = function (e) {
		var oEvent = e || event;
		x = null, y = null;
		touchend(oEvent);
	};
};

// 计算两点距离
var EdgeNumiceTow = function EdgeNumiceTow(arr) {
	return arr.reduce(function (n1, n2) {
		return Math.sqrt(Math.pow(Math.abs(n1.clientX - n2.clientX), 2) + Math.pow(Math.abs(n1.clientY - n2.clientY), 2));
	});
};

var MULTIPLE_FOLLOW_TOUCH = function MULTIPLE_FOLLOW_TOUCH() {
	var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

	var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ARGUMENTS,
	    _ref4$touchmove = _ref4.touchmove,
	    touchmove = _ref4$touchmove === undefined ? FN_NULL : _ref4$touchmove,
	    _ref4$touchstart = _ref4.touchstart,
	    touchstart = _ref4$touchstart === undefined ? FN_NULL : _ref4$touchstart,
	    _ref4$touchend = _ref4.touchend,
	    touchend = _ref4$touchend === undefined ? FN_NULL : _ref4$touchend;

	var oDom = document.querySelector(dom),
	    iOldDiff = void 0,
	    iPoint = void 0,
	    fnOperation = void 0;

	var STATIC_INITIAL = function STATIC_INITIAL(v, e) {
		if (fnOperation) {
			fnOperation(v, e);
			return '';
		}
		fnOperation = function () {
			iPoint = v;
			return function (v, e) {
				var diff = -(iPoint - v);
				if (diff === iOldDiff) {
					return;
				}
				iOldDiff = diff;
				touchmove({ diff: diff }, e);
			};
		}();
	};

	oDom.ontouchstart = function (e) {
		var oEvent = e || event;
		touchstart(oEvent);
	};
	oDom.ontouchmove = function (e) {
		var oEvent = e || event,
		    aTouchList = oEvent.changedTouches,
		    aNewTouchList = [];

		for (var i in aTouchList) {
			if (aTouchList[i] instanceof Object && typeof aTouchList[i] !== "function") {
				aNewTouchList.push(aTouchList[i]);
			}
		}
		switch (aNewTouchList.length) {
			case 0:
			case 1:
				break;
			default:
				STATIC_INITIAL(EdgeNumiceTow(aNewTouchList.slice(0, 2)), oEvent);
		}
	};
	oDom.ontouchend = function (e) {
		var oEvent = e || event;
		iPoint = null, iOldDiff = null, fnOperation = null;
		touchend(oEvent);
	};
};

exports.singleTouch = singleTouch;
exports.singleFollowTouch = singleFollowTouch;
exports.multipleFollowTouch = multipleFollowTouch;
